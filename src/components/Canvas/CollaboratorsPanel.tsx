import React, { useState } from 'react';
import { Users, UserPlus, X } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
}

const CollaboratorsPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);
  
  const collaborators: Collaborator[] = [
    {
      id: '1',
      name: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      isActive: true,
    },
    {
      id: '2',
      name: 'Alex Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      isActive: true,
    },
    {
      id: '3',
      name: 'Maria Garcia',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      isActive: false,
    },
  ];
  
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
    setShowInviteForm(false);
  };
  
  return (
    <div className={`fixed right-0 top-20 bg-white border-l border-t border-b border-gray-200 rounded-l-md shadow-md transition-all duration-300 z-10 ${
      isExpanded ? 'w-64' : 'w-12'
    } sm:top-24`}>
      <div className="p-2 border-b border-gray-200 flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Users className="h-5 w-5 text-indigo-500" />
        </button>
        {isExpanded && (
          <div className="flex items-center">
            <span className="text-sm font-medium">Collaborators</span>
            <button
              onClick={() => setShowInviteForm(!showInviteForm)}
              className="ml-2 p-1 rounded-full hover:bg-gray-100"
              title="Invite collaborator"
            >
              <UserPlus className="h-4 w-4 text-indigo-500" />
            </button>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div className="p-2">
          {showInviteForm && (
            <form onSubmit={handleInvite} className="mb-3 p-2 bg-gray-50 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium">Invite someone</span>
                <button
                  type="button"
                  onClick={() => setShowInviteForm(false)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Email address"
                className="w-full text-xs p-1.5 border border-gray-300 rounded-md mb-2"
                required
              />
              <button
                type="submit"
                className="w-full text-xs p-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              >
                Send Invite
              </button>
            </form>
          )}
          
          <div className="space-y-2">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex items-center p-1.5 rounded-md hover:bg-gray-100"
              >
                <div className="relative">
                  <img
                    src={collaborator.avatar}
                    alt={collaborator.name}
                    className="h-8 w-8 rounded-full"
                  />
                  {collaborator.isActive && (
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-1 ring-white" />
                  )}
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium text-gray-900">
                    {collaborator.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {collaborator.isActive ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorsPanel;