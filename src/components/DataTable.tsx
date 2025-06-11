
import { useState } from 'react';
import { UserData } from '@/types/user';
import EditableRow from './EditableRow';
import { useToast } from '@/components/ui/use-toast';
import { updateUser, finalizeUser } from '@/services/firebaseService';

interface DataTableProps {
  users: UserData[];
  onDataChange: () => void;
}

const DataTable = ({ users, onDataChange }: DataTableProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSave = async (id: string, data: Partial<UserData>) => {
    try {
      setLoading(id);
      await updateUser(id, data);
      toast({
        title: "User updated",
        description: "User data has been successfully updated.",
      });
      onDataChange();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user data.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleFinalize = async (id: string) => {
    try {
      setLoading(id);
      await finalizeUser(id);
      toast({
        title: "User finalized",
        description: "User data has been finalized and is no longer editable.",
      });
      onDataChange();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to finalize user data.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="rounded-md border">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="p-3 border-b">ID</th>
              <th className="p-3 border-b">First Name</th>
              <th className="p-3 border-b">Surname</th>
              <th className="p-3 border-b">Document Type</th>
              <th className="p-3 border-b">Document Number</th>
              <th className="p-3 border-b">Country</th>
              <th className="p-3 border-b">AuthScore</th>
              <th className="p-3 border-b">Cursor</th>
              <th className="p-3 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center">No user data available.</td>
              </tr>
            ) : (
              users.map(user => (
                <EditableRow 
                  key={user.id} 
                  user={user}
                  onSave={handleSave}
                  onFinalize={handleFinalize}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
