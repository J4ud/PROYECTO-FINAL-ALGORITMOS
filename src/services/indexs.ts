const firebase = require('firebase/app');
import 'firebase/firestore';
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { collection, addDoc, getDocs } = require('firebase/firestore');
import { AddCards } from '../types/index';


const firebaseConfig = {
	apiKey: "AIzaSyDOLwlnnr-5FJcfBI85tahDCxTwP66g5Tw",
	authDomain: "entrega-a56e9.firebaseapp.com",
	projectId: "entrega-a56e9",
	storageBucket: "entrega-a56e9.appspot.com",
	messagingSenderId: "139507438454",
	appId: "1:139507438454:web:e04f0887d199bdd61ae057",
	measurementId: "G-KZ4T480FR9"
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