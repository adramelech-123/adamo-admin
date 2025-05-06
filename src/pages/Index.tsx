
import { useState, useEffect } from 'react';
import { UserData } from '@/types/user';
import DataTable from '@/components/DataTable';
import { fetchUsers } from '@/services/firebaseService';
import { Button } from '@/components/ui/button';
import Logo from "/logo.svg"


const AdminDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-50 to-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <img src={Logo} alt='AdamoID Logo'/>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <Button onClick={loadUsers} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Data'}
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">User IDs Data</h2>
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <DataTable users={users} onDataChange={loadUsers} />
          )}
          
          <div className="mt-4 text-sm text-gray-400">
            <p>* Finalized data is locked and cannot be modified.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
