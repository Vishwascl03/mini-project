import React, { useRef, useEffect, useState } from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { DrawingPoint, DrawingStroke } from '../../types';
import CanvasToolbar from './CanvasToolbar';
import { useAuthStore } from '../../store/authStore';

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      drawStrokes(ctx, strokes);
    };
    
    resizeCanvas();
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    
    return () => {
      resizeObserver.disconnect();
    };
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
  
  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };
  
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!user) return;
    
    const point = getCanvasPoint(e);
    
    const newStroke: DrawingStroke = {
      id: Date.now().toString(),
      points: [{ ...point, pressure: e.pressure }],
      color: currentColor,
      width: currentWidth * (e.pressure || 1),
      userId: user.id,
      timestamp: Date.now(),
    };
    
    setCurrentStroke(newStroke);
    setIsDrawing(true);
    
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke || !user) return;
    
    const point = getCanvasPoint(e);
    
    const updatedStroke = {
      ...currentStroke,
      points: [...currentStroke.points, { ...point, pressure: e.pressure }],
      width: currentWidth * (e.pressure || 1),
    };
    
    setCurrentStroke(updatedStroke);
    
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      
      if (updatedStroke.points.length > 1) {
        const p0 = updatedStroke.points[updatedStroke.points.length - 2];
        const p1 = point;
        
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
    
    addStroke(currentStroke);
    setCurrentStroke(null);
    setIsDrawing(false);
  };
  
  return (
    <div className="flex flex-col flex-1">
      <CanvasToolbar />
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden bg-white border border-gray-200 rounded-md shadow-inner min-h-[60vh]"
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full touch-none"
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