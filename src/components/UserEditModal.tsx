
import { useState } from 'react';
import { UserData } from '@/types/user';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Image } from 'lucide-react';

interface UserEditModalProps {
  user: UserData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: Partial<UserData>) => void;
}

const UserEditModal = ({ user, isOpen, onClose, onSave }: UserEditModalProps) => {
  const [formData, setFormData] = useState<Partial<UserData>>({
    firstname: user.firstname,
    surname: user.surname,
    doc_type: user.doc_type,
    doc_num: user.doc_num,
    country: user.country,
  });

  const handleChange = (field: keyof UserData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    onSave(user.id, formData);
    onClose();
  };

  const docTypes = ['National ID', 'Passport', 'Drivers License'];
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola",
    "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
    "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile",
    "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Democratic Republic of the Congo",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
    "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait",
    "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
    "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
    "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
    "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>ID: {user.id}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-1">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="firstname" className="text-right text-sm font-medium">
              First Name
            </label>
            <Input
              id="firstname"
              value={formData.firstname}
              onChange={(e) => handleChange('firstname', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="surname" className="text-right text-sm font-medium">
              Surname
            </label>
            <Input
              id="surname"
              value={formData.surname}
              onChange={(e) => handleChange('surname', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="docType" className="text-right text-sm font-medium">
              Document Type
            </label>
            <div className="col-span-3">
              <Select 
                value={formData.doc_type} 
                onValueChange={(value) => handleChange('doc_type', value)}
              >
                <SelectTrigger id="docType" className="w-full">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {docTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="docNum" className="text-right text-sm font-medium">
              Document Number
            </label>
            <Input
              id="docNum"
              value={formData.doc_num}
              onChange={(e) => handleChange('doc_num', e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="country" className="text-right text-sm font-medium">
              Country
            </label>
            <div className="col-span-3">
              <Select 
                value={formData.country} 
                onValueChange={(value) => handleChange('country', value)}
              >
                <SelectTrigger id="country" className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.sort().map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* ID Document Image Section */}
          <div className="mt-0 border rounded-md overflow-hidden">
            <div className="bg-gray-50 p-2 border-b">
              <h3 className="text-sm font-medium">ID Document Image</h3>
            </div>
            <div className="p-2">
              {user.img ? (
                <div className="relative aspect-video overflow-hidden rounded-md bg-gray-100">
                  <img 
                    src={user.img} 
                    alt={`${user.doc_type} for ${user.firstname} ${user.surname}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-gray-400 bg-gray-50 rounded-md">
                  <Image className="h-12 w-12 mb-2" />
                  <p className="text-sm">No image available</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;