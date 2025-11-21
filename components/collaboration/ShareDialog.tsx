'use client';

import { useState } from 'react';
import { X, Mail, UserPlus } from 'lucide-react';
import { addCollaborator, removeCollaborator } from '@/services/collaborationService';

interface ShareDialogProps {
  noteId: string;
  collaborators: string[];
  onClose: () => void;
}

export function ShareDialog({ noteId, collaborators, onClose }: ShareDialogProps) {
  const [email, setEmail] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  const handleAddCollaborator = async () => {
    if (!email.trim()) return;
    
    setIsAdding(true);
    setError('');
    
    try {
      await addCollaborator(noteId, email.trim());
      setEmail('');
      // Optionally refresh collaborators list
    } catch (err: any) {
      setError(err.message || 'Failed to add collaborator');
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveCollaborator = async (emailToRemove: string) => {
    try {
      await removeCollaborator(noteId, emailToRemove);
      // Optionally refresh collaborators list
    } catch (err: any) {
      setError(err.message || 'Failed to remove collaborator');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Share Note</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Collaborator */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add people
          </label>
          <div className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCollaborator()}
              placeholder="Enter email address"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <button
              onClick={handleAddCollaborator}
              disabled={isAdding || !email.trim()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 hover:shadow-md transform hover:scale-105 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Collaborators List */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            People with access
          </h3>
          {collaborators.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              No collaborators yet
            </p>
          ) : (
            <div className="space-y-2">
              {collaborators.map(collaboratorEmail => (
                <div
                  key={collaboratorEmail}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="text-sm text-gray-900">{collaboratorEmail}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveCollaborator(collaboratorEmail)}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share Link (Future Feature) */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Collaborators can view and edit this note in real-time
          </p>
        </div>
      </div>
    </div>
  );
}
