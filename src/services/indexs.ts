// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const { collection, addDoc, getDocs } = require('firebase/firestore');
import { AddCards } from '../types/index';
const { getFirestore } = require('firebase/firestore');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh92aZrtNHcinugRA5FxHjQ7SVAvtHL1k",
  authDomain: "jaud-is-dead.firebaseapp.com",
  projectId: "jaud-is-dead",
  storageBucket: "jaud-is-dead.appspot.com",
  messagingSenderId: "489824330433",
  appId: "1:489824330433:web:ae7ef945e16a845fe8ea40",
  measurementId: "G-Y3DYENY557"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

  export const addmensajes = async (FormData: Omit<AddCards, 'id'>) => {
	  console.log('form', FormData);
	  try {
		  const docRef = await addDoc(collection(db, 'mensajes'), FormData);
		  console.log('Document written with ID: ', docRef.id);
	  } catch (e) {
		  console.error('Error adding document: ', e);
	  }
  };
  
  export const getmensajes = async () => {
	  const querySnapshot = await getDocs(collection(db, 'mensajes'));
	  const Arraymensajes: Array<AddCards> = [];
  
	  querySnapshot.forEach((doc: any) => {
		  const data = doc.data() as any;
		  Arraymensajes.push({ id: doc.id, ...data });
	  });
	  console.log('get', Arraymensajes);
	  return Arraymensajes;
  };