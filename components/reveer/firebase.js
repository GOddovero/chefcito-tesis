import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD9AikH55edE0Vp7lBiau-q1XQgxLSZg2s",
  authDomain: "chefcito-af900.firebaseapp.com",
  projectId: "chefcito-af900",
  storageBucket: "chefcito-af900.appspot.com",
};

const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
export {db, appFirebase};
