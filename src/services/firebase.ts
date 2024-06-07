
import { initializeApp } from "firebase/app";
import { getFirestore, query } from "firebase/firestore";
import { collection, addDoc, getDocs, setDoc, doc, where } from "firebase/firestore"; 
import { SignUpForm } from "../components";
import { Post } from "../types/post";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { AddCards } from '../types/index';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { get } from "firebase/database";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDh92aZrtNHcinugRA5FxHjQ7SVAvtHL1k",
  authDomain: "jaud-is-dead.firebaseapp.com",
  projectId: "jaud-is-dead",
  storageBucket: "jaud-is-dead.appspot.com",
  messagingSenderId: "489824330433",
  appId: "1:489824330433:web:ae7ef945e16a845fe8ea40",
  measurementId: "G-Y3DYENY557"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
const storage = getStorage()

// FUNCIONES PARA LOGEARME Y REGISTRARME
export const createUser = (formData:any) => {
createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then( async (userCredential) => {   

    //Obtener Id
    const user = userCredential.user;
    console.log(user.uid);
    
    //Agregar documento bajo ese ID
    try {
      const where = doc(db, 'usuarios', user.uid);
      const data = {
        doB: formData.doB,
        name: formData.name,
        lastName: formData.lastName,
        userName: formData.userName || 'default'
      }
      await setDoc(where, data);
      alert ('Se creo el usuario')
    } catch (error) {
      console.log(error)
    }




    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode,errorMessage)
    // ..
  });
}
export const login = (formData: any) => {
  return signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user.uid);
      console.log('Sesión iniciada');
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      throw error;
    });
};



export const addPost = async (formData: Omit<Post,'id'>) =>{

  // Agregar datos
      try {
      const docRef = await addDoc(collection(db, "posts"), formData);
       console.log("Document written with ID: ", docRef.id);
      } catch (e) {
      console.error("Error adding document: ", e);
      }
  }

export const getPosts = async () =>{
  const querySnapshot = await getDocs(collection(db, "posts"));
  const arrayProducts: Array<Post> = [];

  querySnapshot.forEach((doc) => {
     const data = doc.data() as any;
     arrayProducts.push({ id: doc.id, ...data});
  });

  return arrayProducts
  }


export const getPostsProfile = async (idUser: string) => {
    const q = query(collection(db, 'posts'), where('idUser', '==', idUser));
    const querySnapshot = await getDocs(q);
    const arrayProducts: Array<Post> = [];
  
    querySnapshot.forEach((doc) => {
      const data = doc.data() as any;
      arrayProducts.push({ id: doc.id, ...data });
    });
  
    return arrayProducts;
  };


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

  export const uploadFile = async (file:File) => {
    const storageRef = ref(storage, 'imgsProfile/' + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }
// Obtener datos
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.data());
// });




