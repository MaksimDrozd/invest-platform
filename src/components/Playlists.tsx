import { useEffect, useState } from 'react';
import { Plus, ListMusic, Lock, Globe, Calendar, Music } from 'lucide-react';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { PlaylistService } from '../services/PlaylistService';
import { AuthService } from '../services/AuthService';
import type { Playlist } from '../types';

const Playlists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = useState('');

  const playlistService = container.get<PlaylistService>(TYPES.PlaylistService);
  const authService = container.get<AuthService>(TYPES.AuthService);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        const playlistsData = await playlistService.getPlaylists();
        setPlaylists(playlistsData);
      } catch (error) {
        console.error('Failed to load playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, [playlistService]);

  const handleCreatePlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return;

    try {
      const newPlaylist = await playlistService.createPlaylist(
        newPlaylistName,
        newPlaylistDescription,
        currentUser
      );
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setNewPlaylistDescription('');
      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create playlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Playlists</h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize your music into custom playlists
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Playlist</span>
        </button>
      </div>

      {/* Playlists Grid */}
      {playlists.length === 0 ? (
        <div className="text-center py-12">
          <ListMusic className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No playlists yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create your first playlist to get started.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 btn-primary"
          >
            Create Playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="card group hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-square relative mb-4 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                {playlist.tracks.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1 w-full h-full p-2">
                    {playlist.tracks.slice(0, 4).map((track, index) => (
                      <img
                        key={index}
                        className="w-full h-full object-cover rounded"
                        src={track.coverUrl}
                        alt={track.title}
                      />
                    ))}
                  </div>
                ) : (
                  <Music className="h-16 w-16 text-primary-400" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900 truncate" title={playlist.name}>
                    {playlist.name}
                  </h3>
                  {playlist.description && (
                    <p className="text-sm text-gray-500 truncate" title={playlist.description}>
                      {playlist.description}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{playlist.tracks.length} tracks</span>
                  <div className="flex items-center space-x-2">
                    {playlist.isPublic ? (
                      <Globe className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                    <span>{playlist.isPublic ? 'Public' : 'Private'}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <img
                    className="h-6 w-6 rounded-full"
                    src={playlist.owner.avatar}
                    alt={playlist.owner.username}
                  />
                  <span className="text-sm text-gray-500">{playlist.owner.username}</span>
                  <div className="flex items-center text-xs text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(playlist.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Playlist Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCreateModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleCreatePlaylist}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ListMusic className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Create New Playlist
                      </h3>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label htmlFor="playlist-name" className="block text-sm font-medium text-gray-700">
                            Playlist Name
                          </label>
                          <input
                            type="text"
                            id="playlist-name"
                            required
                            className="mt-1 input-field"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            placeholder="Enter playlist name"
                          />
                        </div>
                        <div>
                          <label htmlFor="playlist-description" className="block text-sm font-medium text-gray-700">
                            Description (optional)
                          </label>
                          <textarea
                            id="playlist-description"
                            rows={3}
                            className="mt-1 input-field"
                            value={newPlaylistDescription}
                            onChange={(e) => setNewPlaylistDescription(e.target.value)}
                            placeholder="Describe your playlist"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center btn-primary sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create Playlist
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center btn-secondary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Playlists; 