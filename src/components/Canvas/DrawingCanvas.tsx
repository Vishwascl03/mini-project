import React, { useRef, useEffect, useState } from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { DrawingPoint, DrawingStroke } from '../../types';
import CanvasToolbar from './CanvasToolbar';
import { useAuthStore } from '../../store/authStore';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    strokes,
    isDrawing,
    currentColor,
    currentWidth,
    setIsDrawing,
    addStroke,
    updateStroke,
  } = useCanvasStore();
  const { user } = useAuthStore();
  const [currentStroke, setCurrentStroke] = useState<DrawingStroke | null>(null);
  
  // Initialize canvas and draw existing strokes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        // Redraw all strokes when canvas is resized
        drawStrokes(ctx, strokes);
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // Redraw canvas when strokes change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawStrokes(ctx, strokes);
  }, [strokes]);
  
  const drawStrokes = (ctx: CanvasRenderingContext2D, strokes: DrawingStroke[]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    strokes.forEach(stroke => {
      if (stroke.points.length < 2) return;
      
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      for (let i = 1; i < stroke.points.length; i++) {
        const p0 = stroke.points[i - 1];
        const p1 = stroke.points[i];
        
        // Use quadratic curves for smoother lines
        const cp = {
          x: (p0.x + p1.x) / 2,
          y: (p0.y + p1.y) / 2
        };
        
        if (i === 1) {
          ctx.quadraticCurveTo(p0.x, p0.y, cp.x, cp.y);
        } else {
          const cp0 = {
            x: (stroke.points[i - 2].x + p0.x) / 2,
            y: (stroke.points[i - 2].y + p0.y) / 2
          };
          ctx.bezierCurveTo(cp0.x, cp0.y, p0.x, p0.y, cp.x, cp.y);
        }
      }
      
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    });
  };
  
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!user) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newStroke: DrawingStroke = {
      id: Date.now().toString(),
      points: [{ x, y, pressure: e.pressure }],
      color: currentColor,
      width: currentWidth * (e.pressure || 1), // Adjust width based on pressure
      userId: user.id,
      timestamp: Date.now(),
    };
    
    setCurrentStroke(newStroke);
    setIsDrawing(true);
    
    // Capture pointer to receive events even when pointer leaves canvas
    canvas.setPointerCapture(e.pointerId);
  };
  
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke || !user) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const updatedStroke = {
      ...currentStroke,
      points: [...currentStroke.points, { x, y, pressure: e.pressure }],
      width: currentWidth * (e.pressure || 1), // Adjust width based on pressure
    };
    
    setCurrentStroke(updatedStroke);
    
    // Draw the current stroke
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      
      if (updatedStroke.points.length > 1) {
        const p0 = updatedStroke.points[updatedStroke.points.length - 2];
        const p1 = { x, y };
        
        const cp = {
          x: (p0.x + p1.x) / 2,
          y: (p0.y + p1.y) / 2
        };
        
        if (updatedStroke.points.length === 2) {
          ctx.quadraticCurveTo(p0.x, p0.y, cp.x, cp.y);
        } else {
          const cp0 = {
            x: (updatedStroke.points[updatedStroke.points.length - 3].x + p0.x) / 2,
            y: (updatedStroke.points[updatedStroke.points.length - 3].y + p0.y) / 2
          };
          ctx.bezierCurveTo(cp0.x, cp0.y, p0.x, p0.y, cp.x, cp.y);
        }
      }
      
      ctx.strokeStyle = updatedStroke.color;
      ctx.lineWidth = updatedStroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };
  
  const handlePointerUp = () => {
    if (!isDrawing || !currentStroke || !user) return;
    
    // Add the completed stroke to the store
    addStroke(currentStroke);
    setCurrentStroke(null);
    setIsDrawing(false);
  };
  
  return (
    <div className="flex flex-col h-full">
      <CanvasToolbar />
      <div className="flex-1 relative overflow-hidden bg-white border border-gray-200 rounded-md shadow-inner">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full canvas-container touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;