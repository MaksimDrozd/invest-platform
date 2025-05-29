import { useState } from 'react';
import { Users, Plus, Play, Volume2, Clock, Crown } from 'lucide-react';
import type { JamSession } from '../types';

const JamSessions = () => {
  const [jamSessions] = useState<JamSession[]>([
    {
      id: '1',
      name: 'Rock Night',
      host: {
        id: '1',
        username: 'demo_user',
        email: 'demo@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        isOnline: true,
      },
      participants: [
        {
          id: '2',
          username: 'music_lover',
          email: 'music@example.com',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
        },
        {
          id: '3',
          username: 'dj_master',
          email: 'dj@example.com',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
        },
      ],
      currentTrack: {
        id: '1',
        title: 'Bohemian Rhapsody',
        artist: 'Queen',
        duration: 355,
        url: 'https://example.com/track1.mp3',
        coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
        genre: 'Rock',
      },
      playlist: {
        id: '1',
        name: 'Rock Classics',
        description: 'The best rock songs of all time',
        tracks: [],
        owner: {
          id: '1',
          username: 'demo_user',
          email: 'demo@example.com',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          isOnline: true,
        },
        isPublic: true,
        createdAt: new Date('2024-01-15'),
      },
      isActive: true,
      createdAt: new Date('2024-01-20'),
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newSessionName, setNewSessionName] = useState('');

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would create a new jam session
    console.log('Creating session:', newSessionName);
    setNewSessionName('');
    setShowCreateModal(false);
  };

  const handleJoinSession = (sessionId: string) => {
    console.log('Joining session:', sessionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jam Sessions</h1>
          <p className="mt-1 text-sm text-gray-500">
            Listen to music together with friends in real-time
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Session</span>
        </button>
      </div>

      {/* Active Sessions */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-900">Active Sessions</h2>
        
        {jamSessions.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No active sessions</h3>
            <p className="mt-1 text-sm text-gray-500">
              Create a session to start listening with friends.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 btn-primary"
            >
              Create Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jamSessions.map((session) => (
              <div key={session.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{session.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-500">Hosted by {session.host.username}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{session.participants.length + 1}</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${session.isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
                  </div>
                </div>

                {/* Current Track */}
                {session.currentTrack && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={session.currentTrack.coverUrl}
                        alt={session.currentTrack.title}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {session.currentTrack.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {session.currentTrack.artist}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                        <Volume2 className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Participants */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Participants</h4>
                  <div className="flex items-center space-x-2">
                    {/* Host */}
                    <div className="relative">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={session.host.avatar}
                        alt={session.host.username}
                      />
                      <Crown className="absolute -top-1 -right-1 h-3 w-3 text-yellow-500" />
                    </div>
                    
                    {/* Participants */}
                    {session.participants.slice(0, 4).map((participant) => (
                      <div key={participant.id} className="relative">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={participant.avatar}
                          alt={participant.username}
                        />
                        <div className="absolute -bottom-0 -right-0 h-3 w-3 bg-green-400 border-2 border-white rounded-full" />
                      </div>
                    ))}
                    
                    {session.participants.length > 4 && (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          +{session.participants.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Session Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Started {new Date(session.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <span className="text-primary-600 font-medium">
                    {session.playlist.name}
                  </span>
                </div>

                {/* Join Button */}
                <button
                  onClick={() => handleJoinSession(session.id)}
                  className="w-full btn-primary"
                >
                  Join Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowCreateModal(false)} />
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleCreateSession}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 sm:mx-0 sm:h-10 sm:w-10">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Create Jam Session
                      </h3>
                      <div className="mt-4">
                        <label htmlFor="session-name" className="block text-sm font-medium text-gray-700">
                          Session Name
                        </label>
                        <input
                          type="text"
                          id="session-name"
                          required
                          className="mt-1 input-field"
                          value={newSessionName}
                          onChange={(e) => setNewSessionName(e.target.value)}
                          placeholder="Enter session name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center btn-primary sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create Session
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

export default JamSessions; 