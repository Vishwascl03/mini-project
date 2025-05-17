import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Comment } from '../../types';
import { useAuthStore } from '../../store/authStore';

const CommentsPanel: React.FC = () => {
  const { user } = useAuthStore();
  const [commentText, setCommentText] = useState('');
  
  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userId: '2',
      userName: 'Alex Johnson',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      text: 'I love the use of color in this piece!',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      userId: '3',
      userName: 'Maria Garcia',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      text: 'Maybe we could add some more contrast in the background?',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
  ]);
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim() || !user) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      text: commentText,
      timestamp: new Date().toISOString(),
    };
    
    setComments([...comments, newComment]);
    setCommentText('');
  };
  
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-md flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 flex items-center">
        <MessageSquare className="h-5 w-5 text-indigo-500 mr-2" />
        <h3 className="text-lg font-medium">Comments</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <img
              src={comment.userAvatar}
              alt={comment.userName}
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1">
              <div className="flex items-baseline">
                <span className="font-medium text-sm">{comment.userName}</span>
                <span className="ml-2 text-xs text-gray-500">
                  {formatTimestamp(comment.timestamp)}
                </span>
              </div>
              <p className="text-sm mt-1">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <form onSubmit={handleAddComment} className="flex space-x-2">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={!user}
          />
          <button
            type="submit"
            className="px-3 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!commentText.trim() || !user}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        {!user && (
          <p className="text-xs text-gray-500 mt-2">
            Please log in to add comments.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentsPanel;