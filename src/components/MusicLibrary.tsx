import { useEffect, useState } from 'react';
import { Search, Play, Plus, Music } from 'lucide-react';
import { container } from '../di/container';
import { TYPES } from '../di/types';
import { MusicService } from '../services/MusicService';
import type { Track } from '../types';

const MusicLibrary = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const musicService = container.get<MusicService>(TYPES.MusicService);

  useEffect(() => {
    const loadTracks = async () => {
      try {
        const tracksData = await musicService.getTracks();
        setTracks(tracksData);
        setFilteredTracks(tracksData);
      } catch (error) {
        console.error('Failed to load tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTracks();
  }, [musicService]);

  useEffect(() => {
    let filtered = tracks;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(track =>
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.genre?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(track => track.genre === selectedGenre);
    }

    setFilteredTracks(filtered);
  }, [searchQuery, selectedGenre, tracks]);

  const genres = ['all', ...Array.from(new Set(tracks.map(track => track.genre).filter(Boolean)))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Music Library</h1>
        <p className="mt-1 text-sm text-gray-500">
          Discover and manage your music collection
        </p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tracks, artists, or genres..."
                className="pl-10 input-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="input-field"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {filteredTracks.length} of {tracks.length} tracks
        </p>
        <button className="btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Track</span>
        </button>
      </div>

      {/* Tracks Grid */}
      {filteredTracks.length === 0 ? (
        <div className="text-center py-12">
          <Music className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tracks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTracks.map((track) => (
            <div key={track.id} className="card group hover:shadow-md transition-shadow">
              <div className="aspect-square relative mb-4">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={track.coverUrl}
                  alt={track.title}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white rounded-full p-3 shadow-lg hover:scale-110 transform transition-transform">
                    <Play className="h-6 w-6 text-primary-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 truncate" title={track.title}>
                  {track.title}
                </h3>
                <p className="text-sm text-gray-500 truncate" title={track.artist}>
                  {track.artist}
                </p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {track.genre}
                  </span>
                  <span className="text-xs text-gray-500">
                    {musicService.formatDuration(track.duration)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MusicLibrary; 