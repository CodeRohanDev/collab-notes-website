'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useNotesStore } from '@/store/useNotesStore';
import { NoteCard } from '@/components/notes/NoteCard';
import { SearchBar } from '@/components/notes/SearchBar';
import { Plus, Archive, LogOut, Menu, X, Grid, List, SortAsc, Filter } from 'lucide-react';

export default function NotesPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { notes, loadNotes, searchQuery, setSearchQuery, performSearch } = useNotesStore();
  const [isCreating, setIsCreating] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title'>('updated');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadNotes(user.id);
  }, [user]);

  const handleCreateNote = () => {
    if (!user || isCreating) return;
    router.push(`/notes/new`);
  };

  const handleSearch = async (query: string) => {
    if (!user) return;
    setSearchQuery(query);
    if (query.trim()) {
      await performSearch(query, user.id);
    } else {
      await loadNotes(user.id);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Sort notes
  const sortedNotes = [...notes].sort((a, b) => {
    // Pinned notes always first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    // Then sort by selected criteria
    switch (sortBy) {
      case 'updated':
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      case 'created':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const pinnedCount = notes.filter(n => n.isPinned).length;
  const favoriteCount = notes.filter(n => n.isFavorite).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">CollabNotes</h1>
                  {user && (
                    <p className="text-xs text-gray-500">
                      {user.isGuest ? 'Guest Mode' : user.displayName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => router.push('/notes/archived')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Archived Notes"
              >
                <Archive className="w-4 h-4" />
                <span className="text-sm font-medium">Archive</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-gray-200 animate-slideDown">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    router.push('/notes/archived');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <Archive className="w-4 h-4" />
                  <span className="text-sm font-medium">Archived Notes</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats & Actions Bar */}
        <div className="mb-8 animate-slideUp">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Stats */}
              <div className="flex items-center space-x-6">
                <div>
                  <p className="text-3xl font-bold text-gray-900">{notes.length}</p>
                  <p className="text-sm text-gray-500">Total Notes</p>
                </div>
                {pinnedCount > 0 && (
                  <div className="border-l border-gray-200 pl-6">
                    <p className="text-2xl font-bold text-yellow-600">{pinnedCount}</p>
                    <p className="text-sm text-gray-500">Pinned</p>
                  </div>
                )}
                {favoriteCount > 0 && (
                  <div className="border-l border-gray-200 pl-6">
                    <p className="text-2xl font-bold text-pink-600">{favoriteCount}</p>
                    <p className="text-sm text-gray-500">Favorites</p>
                  </div>
                )}
              </div>

              {/* Create Button */}
              <button
                onClick={handleCreateNote}
                disabled={isCreating}
                className="group relative flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                <Plus className="w-5 h-5 relative z-10" />
                <span className="relative z-10">New Note</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 animate-slideUp animation-delay-100">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Search */}
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search notes by title, content, or tags..."
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  title="Grid View"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <option value="updated">Last Updated</option>
                <option value="created">Date Created</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes Grid/List */}
        {sortedNotes.length === 0 ? (
          <div className="text-center py-16 animate-slideUp">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full mb-6">
              <Plus className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No notes yet</h3>
            <p className="text-gray-500 mb-6">Create your first note to get started!</p>
            <button
              onClick={handleCreateNote}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Create Note</span>
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-4'
            }
          >
            {sortedNotes.map((note, index) => (
              <div
                key={note.id}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <NoteCard
                  note={note}
                  onClick={() => router.push(`/notes/${note.id}`)}
                  viewMode={viewMode}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
