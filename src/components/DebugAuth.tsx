import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DebugAuth: React.FC = () => {
  const { user, userProfile, session, loading } = useAuth();

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-md z-50">
      <h3 className="font-bold mb-2">Auth Debug Info:</h3>
      <div className="space-y-1">
        <div>Loading: {loading ? 'true' : 'false'}</div>
        <div>User: {user ? `${user.email} (${user.id})` : 'null'}</div>
        <div>Session: {session ? 'exists' : 'null'}</div>
        <div>Profile: {userProfile ? `${userProfile.full_name} (${userProfile.role})` : 'null'}</div>
        {userProfile && (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <pre>{JSON.stringify(userProfile, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DebugAuth;