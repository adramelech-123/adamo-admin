
import { useState } from 'react';
import { UserData } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import UserEditModal from './UserEditModal';

interface EditableRowProps {
  user: UserData;
  onSave: (id: string, data: Partial<UserData>) => void;
  onFinalize: (id: string) => void;
}

const EditableRow = ({ user, onSave, onFinalize }: EditableRowProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleFinalize = () => {
    onFinalize(user.id);
  };

  return (
    <tr className={`${user.finalized ? 'bg-gray-100' : 'bg-white'}`}>
      <td className="p-3 border-b">
        <span className={`${user.finalized ? 'text-gray-500' : ''}`}>{user.id}</span>
      </td>
      <td className="p-3 border-b">
        <span className={`${user.finalized ? 'text-gray-500' : ''}`}>{user.firstname}</span>
      </td>
      <td className="p-3 border-b">
        <span className={`${user.finalized ? 'text-gray-500' : ''}`}>{user.surname}</span>
      </td>
      <td className="p-3 border-b">
        <span className={`${user.finalized ? 'text-gray-500' : ''}`}>{user.doc_type}</span>
      </td>
      <td className="p-3 border-b">
        <span className={`${user.finalized ? 'text-gray-500' : ''}`}>{user.doc_num}</span>
      </td>
      <td className="p-3 border-b">
        <span className={`${user.finalized ? 'text-gray-500' : ''}`}>{user.country}</span>
      </td>
      <td className="p-3 border-b">
        <div className="flex space-x-2 justify-end">
          {!user.finalized && (
            <>
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button variant="default" size="sm" onClick={handleFinalize}>
                Finalize
              </Button>
            </>
          )}
          {user.finalized && (
            <span className="text-sm text-gray-500 italic">Finalized</span>
          )}
        </div>
      </td>
      
      {/* Edit Modal */}
      <UserEditModal 
        user={user} 
        isOpen={isEditing} 
        onClose={handleCloseModal} 
        onSave={onSave} 
      />
    </tr>
  );
};

export default EditableRow;