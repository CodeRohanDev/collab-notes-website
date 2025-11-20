'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { IconNote, IconDownload, IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';

export default function NotePage() {
  const searchParams = useSearchParams();
  const noteId = searchParams.get('id');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const deepLink = noteId ? `https://collabnotes.hostspica.com/note/${noteId}` : '';
  const appScheme = noteId ? `collabnotes://note/${noteId}` : '';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.hostspica.collabnotes';

  useEffect(() => {
    if (!noteId) {
      setIsLoading(false);
      return;
    }

    // Detect mobile
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);

    // Auto-open app on mobile
    if (mobile) {
      setTimeout(() => {
        window.location.href = deepLink;
      }, 100);

      // Show download option after 2 seconds
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(false);
    }
  }, [deepLink, noteId]);

  const handleOpenApp = () => {
    if (!noteId) return;
    
    setIsLoading(true);
    
    // Try app scheme first
    window.location.href = appScheme;
    
    // Fallback to https deep link
    setTimeout(() => {
      window.location.href = deepLink;
    }, 500);

    // Show download option if app doesn't open
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  // No note ID provided
  if (!noteId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-900 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <IconNote size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Invalid Note Link</h1>
          <p className="text-gray-600 mb-8">This note link is invalid or incomplete.</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl">
        {/* Logo */}
        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-900 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
          <IconNote size={40} className="text-white" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Open in CollabNotes
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-center leading-relaxed">
          You've been invited to collaborate on a note. Open it in the CollabNotes app to start editing together.
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="my-8 text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Opening app...</p>
          </div>
        )}

        {/* Buttons */}
        {!isLoading && (
          <div className="space-y-4">
            <button
              onClick={handleOpenApp}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <IconExternalLink size={24} />
              <span>Open in App</span>
            </button>

            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gray-100 text-gray-800 py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <IconDownload size={24} />
              <span>Download App</span>
            </a>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 p-5 rounded-xl text-sm text-gray-700 border border-purple-100">
          <p className="font-semibold text-gray-800 mb-2">Don't have the app?</p>
          <p>Download CollabNotes to collaborate on notes in real-time with your team.</p>
        </div>

        {/* Store Badge */}
        {!isLoading && (
          <div className="mt-6 text-center">
            <a
              href={playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-14 mx-auto"
              />
            </a>
          </div>
        )}

        {/* Note ID (for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 text-center text-xs text-gray-400">
            Note ID: {noteId}
          </div>
        )}
      </div>
    </div>
  );
}
