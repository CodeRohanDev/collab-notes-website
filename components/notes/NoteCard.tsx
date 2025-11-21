import { Note } from '@/models/Note';
import { Pin, Star, Cloud, CloudOff, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  viewMode?: 'grid' | 'list';
}

export function NoteCard({ note, onClick, viewMode = 'grid' }: NoteCardProps) {
  const getPlainText = (content: string): string => {
    try {
      const delta = JSON.parse(content);
      return delta.ops?.map((op: any) => op.insert).join('') || '';
    } catch {
      return content;
    }
  };

  const plainText = getPlainText(note.content);
  const preview = plainText.substring(0, viewMode === 'list' ? 200 : 150);

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="group bg-white/80 backdrop-blur-xl rounded-xl border-l-4 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer p-6 transform hover:scale-[1.01] border border-gray-100"
        style={{ borderLeftColor: note.color || '#6366F1' }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Title & Badges */}
            <div className="flex items-center space-x-2 mb-2">
              {note.isPinned && (
                <Pin className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="currentColor" />
              )}
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors duration-200">
                {note.title || 'Untitled'}
              </h3>
              {note.isFavorite && (
                <Star className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="currentColor" />
              )}
            </div>

            {/* Content Preview */}
            {preview && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {preview}{plainText.length > 200 && '...'}
              </p>
            )}

            {/* Tags */}
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {note.tags.slice(0, 5).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium"
                  >
                    #{tag}
                  </span>
                ))}
                {note.tags.length > 5 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    +{note.tags.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right Side Info */}
          <div className="flex flex-col items-end space-y-2 ml-4">
            {/* Sync Status */}
            <div className="flex items-center space-x-2">
              {note.isSyncEnabled ? (
                <div className="flex items-center space-x-1 text-blue-600">
                  <Cloud className="w-4 h-4" />
                  <span className="text-xs font-medium">Synced</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-gray-400">
                  <CloudOff className="w-4 h-4" />
                  <span className="text-xs font-medium">Local</span>
                </div>
              )}
            </div>

            {/* Date */}
            <div className="flex items-center space-x-1 text-gray-500">
              <Calendar className="w-3 h-3" />
              <span className="text-xs">{format(note.updatedAt, 'MMM d, yyyy')}</span>
            </div>

            {/* Sync Status Badge */}
            {note.syncStatus === 'pending' && note.isSyncEnabled && (
              <span className="text-xs text-yellow-600 font-medium">Syncing...</span>
            )}
            {note.syncStatus === 'failed' && note.isSyncEnabled && (
              <span className="text-xs text-red-600 font-medium">Sync failed</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div
      onClick={onClick}
      className="group bg-white/80 backdrop-blur-xl rounded-xl border-l-4 shadow-sm hover:shadow-xl transition-all duration-200 cursor-pointer p-5 transform hover:scale-105 hover:-translate-y-1 border border-gray-100"
      style={{ borderLeftColor: note.color || '#6366F1' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2 flex-1 min-w-0 group-hover:text-indigo-600 transition-colors duration-200">
          {note.isPinned && <Pin className="w-4 h-4 text-yellow-600 flex-shrink-0" fill="currentColor" />}
          <span className="truncate">{note.title || 'Untitled'}</span>
        </h3>
        
        <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
          {note.isFavorite && (
            <Star className="w-4 h-4 text-yellow-600" fill="currentColor" />
          )}
          {note.isSyncEnabled ? (
            <Cloud className="w-4 h-4 text-blue-600" />
          ) : (
            <CloudOff className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </div>

      {/* Content Preview */}
      {preview && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 min-h-[3.75rem]">
          {preview}{plainText.length > 150 && '...'}
        </p>
      )}

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {note.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{note.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1 text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{format(note.updatedAt, 'MMM d, yyyy')}</span>
        </div>
        
        {note.syncStatus === 'pending' && note.isSyncEnabled && (
          <span className="text-yellow-600 font-medium">Syncing...</span>
        )}
        {note.syncStatus === 'failed' && note.isSyncEnabled && (
          <span className="text-red-600 font-medium">Sync failed</span>
        )}
      </div>
    </div>
  );
}
