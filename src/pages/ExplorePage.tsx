import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { Canvas } from '../types';
import CanvasCard from '../components/Home/CanvasCard';

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [canvases, setCanvases] = useState<Canvas[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch public canvases
    const fetchPublicCanvases = async () => {
      setIsLoading(true);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock canvas data
        const mockCanvases: Canvas[] = [
          {
            id: '101',
            title: 'Urban Landscape',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdBy: '5',
            collaborators: ['6', '7'],
            thumbnail: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            id: '102',
            title: 'Abstract Patterns',
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            createdBy: '8',
            collaborators: ['9'],
            thumbnail: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            id: '103',
            title: 'Digital Dreamscape',
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            createdBy: '10',
            collaborators: [],
            thumbnail: 'https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            id: '104',
            title: 'Neon City',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            createdBy: '11',
            collaborators: ['12', '13'],
            thumbnail: 'https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            id: '105',
            title: 'Watercolor Experiment',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            createdBy: '14',
            collaborators: ['15'],
            thumbnail: 'https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
          {
            id: '106',
            title: 'Geometric Composition',
            createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdBy: '16',
            collaborators: [],
            thumbnail: 'https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          },
        ];
        
        setCanvases(mockCanvases);
      } catch (error) {
        console.error('Failed to fetch public canvases:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPublicCanvases();
  }, []);
  
  const filteredCanvases = canvases.filter(canvas => 
    canvas.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Explore Artworks</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search artworks..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
            />
          </div>
          
          <button className="btn btn-outline flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="h-5 w-5 text-indigo-500 mr-2" />
          <h2 className="text-xl font-semibold">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Skeleton loaders
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 animate-pulse">
                <div className="h-48 bg-gray-300" />
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : filteredCanvases.length > 0 ? (
            filteredCanvases.map((canvas) => (
              <motion.div
                key={canvas.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CanvasCard canvas={canvas} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No artworks found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;