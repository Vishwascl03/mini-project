import { create } from 'zustand';
import { Canvas, DrawingStroke } from '../types';

interface CanvasState {
  canvases: Canvas[];
  currentCanvas: Canvas | null;
  strokes: DrawingStroke[];
  isDrawing: boolean;
  currentColor: string;
  currentWidth: number;
  
  setCurrentCanvas: (canvas: Canvas) => void;
  addStroke: (stroke: DrawingStroke) => void;
  updateStroke: (stroke: DrawingStroke) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  setCurrentColor: (color: string) => void;
  setCurrentWidth: (width: number) => void;
  clearCanvas: () => void;
  fetchCanvases: () => Promise<void>;
}

// This is a mock implementation. In a real app, you would connect to your backend.
export const useCanvasStore = create<CanvasState>((set, get) => ({
  canvases: [],
  currentCanvas: null,
  strokes: [],
  isDrawing: false,
  currentColor: '#000000',
  currentWidth: 5,
  
  setCurrentCanvas: (canvas) => set({ currentCanvas: canvas }),
  
  addStroke: (stroke) => set((state) => ({ 
    strokes: [...state.strokes, stroke] 
  })),
  
  updateStroke: (updatedStroke) => set((state) => ({
    strokes: state.strokes.map(stroke => 
      stroke.id === updatedStroke.id ? updatedStroke : stroke
    )
  })),
  
  setIsDrawing: (isDrawing) => set({ isDrawing }),
  
  setCurrentColor: (color) => set({ currentColor: color }),
  
  setCurrentWidth: (width) => set({ currentWidth: width }),
  
  clearCanvas: () => set({ strokes: [] }),
  
  fetchCanvases: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock canvas data
    const mockCanvases: Canvas[] = [
      {
        id: '1',
        title: 'Abstract Landscape',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: '1',
        collaborators: ['2', '3'],
        thumbnail: 'https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '2',
        title: 'City Skyline',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: '1',
        collaborators: ['4'],
        thumbnail: 'https://images.pexels.com/photos/1269968/pexels-photo-1269968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '3',
        title: 'Nature Study',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: '1',
        collaborators: [],
        thumbnail: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ];
    
    set({ canvases: mockCanvases });
  },
}));