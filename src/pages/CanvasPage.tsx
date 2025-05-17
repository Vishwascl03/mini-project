import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DrawingCanvas from '../components/Canvas/DrawingCanvas';
import CollaboratorsPanel from '../components/Canvas/CollaboratorsPanel';
import SuggestionsPanel from '../components/Canvas/SuggestionsPanel';
import CommentsPanel from '../components/Canvas/CommentsPanel';
import { useCanvasStore } from '../store/canvasStore';

const CanvasPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { canvases, setCurrentCanvas, fetchCanvases } = useCanvasStore();
  
  useEffect(() => {
    if (canvases.length === 0) {
      fetchCanvases();
    }
    
    if (id && id !== 'new') {
      const canvas = canvases.find(c => c.id === id);
      if (canvas) {
        setCurrentCanvas(canvas);
      }
    } else {
      setCurrentCanvas({
        id: 'new',
        title: 'Untitled Canvas',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: '1',
        collaborators: [],
        thumbnail: '',
      });
    }
  }, [id, canvases, fetchCanvases, setCurrentCanvas]);
  
  return (
    <div className="min-h-screen pt-16 pb-0 px-2 sm:px-6 lg:px-8 flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden">
        <div className="lg:w-3/4 flex flex-col h-[calc(100vh-5rem)]">
          <DrawingCanvas />
          <div className="mt-4 overflow-y-auto">
            <SuggestionsPanel />
          </div>
        </div>
        
        <div className="lg:w-1/4 flex-shrink-0 h-[calc(100vh-5rem)] overflow-y-auto">
          <CommentsPanel />
        </div>
      </div>
      
      <CollaboratorsPanel />
    </div>
  );
};

export default CanvasPage;