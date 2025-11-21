'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Sparkles, Cloud, Lock, Zap, Users } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, loginWithGoogle, loginAsGuest, isLoading } = useAuthStore();

  // Don't auto-redirect if user is already logged in
  // Allow them to see the login page (they can manually navigate here)
  useEffect(() => {
    // Only redirect if coming from a protected route, not if manually visiting /login
    // This allows users to access login page even when logged in
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    router.push('/notes');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Branding */}
          <div className="hidden md:block animate-slideUp">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-gray-700">Welcome to CollabNotes</span>
              </div>
              
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Your thoughts,
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  beautifully organized
                </span>
              </h1>
              
              <p className="text-xl text-gray-600">
                Create, collaborate, and sync your notes across all devices. Start for free, no credit card required.
              </p>

              {/* Features */}
              <div className="space-y-4 pt-4">
                {[
                  { icon: Cloud, text: 'Cloud sync across devices', color: 'text-blue-600' },
                  { icon: Users, text: 'Real-time collaboration', color: 'text-purple-600' },
                  { icon: Lock, text: 'Secure & private', color: 'text-green-600' },
                  { icon: Zap, text: 'Lightning fast', color: 'text-yellow-600' },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 animate-slideUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
                      <feature.icon className={`w-5 h-5 ${feature.color}`} />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="animate-slideUp animation-delay-200">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
              {/* Mobile Title */}
              <div className="md:hidden text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">CollabNotes</h2>
                <p className="text-gray-600">
                  {user ? (user.isGuest ? 'Upgrade your account' : 'Already signed in') : 'Sign in to continue'}
                </p>
              </div>

              {/* Current User Status */}
              {user && (
                <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-indigo-900">
                        {user.isGuest ? '👋 Guest Mode Active' : `✓ Signed in as ${user.displayName}`}
                      </p>
                      <p className="text-xs text-indigo-700 mt-1">
                        {user.isGuest ? 'Sign in to sync your notes' : 'Your notes are synced'}
                      </p>
                    </div>
                    <button
                      onClick={() => router.push('/notes')}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Go to Notes →
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {/* Google Sign In */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                  className="group relative w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-indigo-300 text-gray-700 px-6 py-4 rounded-xl font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-500 font-medium">Or continue as guest</span>
                  </div>
                </div>

                {/* Guest Mode */}
                <button
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                  className="group relative w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                  <Sparkles className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Start Without Sign In</span>
                </button>

                {/* Guest Mode Info */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <p className="text-sm text-indigo-900 font-medium mb-2">Guest Mode Features:</p>
                  <ul className="text-xs text-indigo-700 space-y-1">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                      <span>Create unlimited notes locally</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                      <span>No sign-up required</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                      <span>Upgrade to sync anytime</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <button
                  onClick={() => router.push('/')}
                  className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blob Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
