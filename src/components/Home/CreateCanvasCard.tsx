import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const CreateCanvasCard: React.FC = () => {
  return (
    <Link
      to="/canvas/new"
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200 border-dashed h-full"
    >
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <PlusCircle className="h-12 w-12 text-indigo-500 mb-3" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Create New Canvas</h3>
        <p className="text-sm text-gray-600">
          Start a new collaborative artwork
        </p>
      </div>
    </Link>
  );
};

export default CreateCanvasCard;