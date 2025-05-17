import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSuggestionsStore } from '../../store/suggestionsStore';
import { Lightbulb, Loader } from 'lucide-react';

const SuggestionsPanel: React.FC = () => {
  const { suggestions, isLoading, fetchSuggestions } = useSuggestionsStore();
  
  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);
  
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
          <h3 className="text-lg font-medium">AI Suggestions</h3>
        </div>
        {isLoading && (
          <Loader className="h-5 w-5 text-indigo-500 animate-spin" />
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 rounded-md overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
          >
            <img
              src={suggestion.imageUrl}
              alt={suggestion.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3">
              <h4 className="font-medium text-sm">{suggestion.title}</h4>
              <p className="text-xs text-gray-600 mt-1">{suggestion.description}</p>
              <button className="mt-2 text-xs bg-indigo-500 text-white px-2 py-1 rounded-md hover:bg-indigo-600 transition-colors">
                Apply to Canvas
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionsPanel;