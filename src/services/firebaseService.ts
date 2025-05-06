
import { UserData } from '@/types/user';
import { initializeApp } from "firebase/app";
import {doc, getFirestore, QueryDocumentSnapshot, updateDoc} from 'firebase/firestore'
import { collection, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)




// Fetch Data
export const fetchUsers = async () => {
  const rejectedUsers: Array<UserData & {id: string}> = []

  try {
    const rejectedCollectionRef = collection(db, "processed_docs");
    const querySnapshot = await getDocs(rejectedCollectionRef);

    querySnapshot.forEach((doc: QueryDocumentSnapshot<UserData>) => {
      // doc.data() gives us the object with fields like img, name, etc.
      const itemData = doc.data();

      // Combine the document ID with the document data
      const itemWithId = {
        id: doc.id, // Add the document ID
        ...itemData // Spread all the fields from doc.data() into this new object
      };

      rejectedUsers.push(itemWithId); // Add the combined object to our array
    });

    console.log("Successfully fetched documents from 'rejected':", rejectedUsers);
    return rejectedUsers


  } catch (error) {
    console.error("Error fetching documents from 'rejected': ", error);
    throw error;
  }
};

// Update User Data in DB
export const updateUser = async (id: string, userData: Partial<UserData>) => {
  
  try {
    const userDocRef = doc(db, "processed_docs", id);

    await updateDoc(userDocRef, userData);
    console.log(`Successfully updated document with ID: ${id} in 'rejected' collection.`);

  } catch (error) {
    console.error(`Error updating document with ID: ${id} in 'rejected': `, error);
    throw error;
  }
  
};


// Set finalize to true / complete validation
export const finalizeUser = async (id: string) => {
  updateUser(id, { finalized: true });
};
