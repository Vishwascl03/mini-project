import { create } from 'zustand';
import { ArtSuggestion } from '../types';

interface SuggestionsState {
  suggestions: ArtSuggestion[];
  isLoading: boolean;
  fetchSuggestions: () => Promise<void>;
  generateSuggestion: (prompt: string) => Promise<void>;
}

// This is a mock implementation. In a real app, you would connect to your backend.
export const useSuggestionsStore = create<SuggestionsState>((set) => ({
  suggestions: [],
  isLoading: false,
  
  fetchSuggestions: async () => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock suggestions
      const mockSuggestions: ArtSuggestion[] = [
        {
          id: '1',
          title: 'Sunset Mountains',
          description: 'A vibrant sunset over mountain ranges with warm colors',
          imageUrl: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
          id: '2',
          title: 'Ocean Waves',
          description: 'Peaceful ocean waves with a cool blue palette',
          imageUrl: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
        {
          id: '3',
          title: 'Urban Sketch',
          description: 'A minimalist sketch of a city street corner',
          imageUrl: 'https://images.pexels.com/photos/2119706/pexels-photo-2119706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
      ];
      
      set({ suggestions: mockSuggestions, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch suggestions:', error);
    }
  },
  
  generateSuggestion: async (prompt) => {
    set({ isLoading: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock new suggestion based on prompt
      const newSuggestion: ArtSuggestion = {
        id: Date.now().toString(),
        title: `AI Generated: ${prompt.slice(0, 20)}${prompt.length > 20 ? '...' : ''}`,
        description: prompt,
        imageUrl: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      };
      
      set((state) => ({ 
        suggestions: [newSuggestion, ...state.suggestions], 
        isLoading: false 
      }));
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to generate suggestion:', error);
    }
  },
}));