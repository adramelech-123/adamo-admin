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
  
  const cellClass = `p-3 border-b text-center ${user.finalized ? 'text-gray-500' : ''}`;
  const userFields = [user.id, user.firstname, user.surname, user.doc_type, user.doc_num, user.country, user.authenticity_score, user.cursor_check];

  return (
    <tr className={user.finalized && user.authenticity_score===10 && user.cursor_check===0 ? 'bg-gray-100' : 'bg-white'}>
      {userFields.map((field, index) => (
        <td key={index} className={cellClass}>
          <span>{field}</span>
        </td>
      ))}
      <td className="p-3 border-b">
        <div className="flex space-x-2 justify-end">
          {!user.finalized || user.authenticity_score===0 || user.cursor_check===1 ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              <Button variant="default" size="sm" onClick={() => onFinalize(user.id)}>
                Finalize
              </Button>
            </>
          ) : (
            <span className="text-sm text-gray-500 italic">Finalized</span>
          )}
        </div>
      </td>
      
      <UserEditModal 
        user={user} 
        isOpen={isEditing} 
        onClose={() => setIsEditing(false)} 
        onSave={onSave} 
      />
    </tr>
  );
};

export default EditableRow;