import { Presence } from '@/models/Presence';

interface PresenceAvatarsProps {
  activeUsers: Presence[];
  maxVisible?: number;
}

export function PresenceAvatars({ activeUsers, maxVisible = 3 }: PresenceAvatarsProps) {
  const visibleUsers = activeUsers.slice(0, maxVisible);
  const remainingCount = activeUsers.length - maxVisible;

  return (
    <div className="flex items-center -space-x-2">
      {visibleUsers.map(user => (
        <div
          key={user.userId}
          className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
          style={{ borderColor: user.color }}
          title={user.userName}
        >
          {user.userPhotoUrl ? (
            <img
              src={user.userPhotoUrl}
              alt={user.userName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-semibold text-gray-700">
              {user.userName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      ))}

      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center">
          <span className="text-xs font-semibold text-gray-700">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}
