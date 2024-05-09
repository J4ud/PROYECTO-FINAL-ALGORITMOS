const firebase = require('firebase/app');
import 'firebase/firestore';
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { collection, addDoc, getDocs } = require('firebase/firestore');
import { AddCards } from '../types/types';

const firebaseConfig = {
	apiKey: "AIzaSyBOTEprwDoYPPhZDc-IQ7O0QhxcnbOqUKI",
	authDomain: "lab6-9ce30.firebaseapp.com",
	projectId: "lab6-9ce30",
	storageBucket: "lab6-9ce30.appspot.com",
	messagingSenderId: "29142944921",
	appId: "1:29142944921:web:497495f9c6abaeee527c08",
	measurementId: "G-QYE2ME6NLW"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const addmusic = async (FormData: Omit<AddCards, 'id'>) => {
	console.log('form', FormData);
	try {
		const docRef = await addDoc(collection(db, 'Music'), FormData);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};

export const getmusic = async () => {
	const querySnapshot = await getDocs(collection(db, 'Music'));
	const Arraysongs: Array<AddCards> = [];

	querySnapshot.forEach((doc: any) => {
		const data = doc.data() as any;
		Arraysongs.push({ id: doc.id, ...data });
	});
	console.log('get', Arraysongs);
	return Arraysongs;
};
