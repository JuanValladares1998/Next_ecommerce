import { initializeApp } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCg5fqHe1p_sm9GF8UUHeLXk9wiUqsIvYI",
  authDomain: "next-ecommerce-84d11.firebaseapp.com",
  projectId: "next-ecommerce-84d11",
  storageBucket: "next-ecommerce-84d11.appspot.com",
  messagingSenderId: "741629362330",
  appId: "1:741629362330:web:1ab229c68f346f0dd9df23",
  measurementId: "G-1YVRGV2C7S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
  if (!file) return;
  if (
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg"
  ) {
    const storageRef = ref(storage, uuidv4());
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }
}

export async function deleteFile(direction) {
  const name = direction.slice(79, 115);
  const storageRef = ref(storage, name);
  try {
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    return false;
  }
}
