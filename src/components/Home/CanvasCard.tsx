import React from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '../../types';
import { Users, Calendar } from 'lucide-react';

interface CanvasCardProps {
  canvas: Canvas;
}

const CanvasCard: React.FC<CanvasCardProps> = ({ canvas }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  return (
    <Link
      to={`/canvas/${canvas.id}`}
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-200"
    >
      <div className="relative h-48">
        <img
          src={canvas.thumbnail}
          alt={canvas.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg">
          {canvas.title}
        </h3>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(canvas.updatedAt)}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{canvas.collaborators.length + 1} collaborators</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CanvasCard;