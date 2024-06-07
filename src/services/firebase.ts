
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore"; 
import { SignUpForm } from "../components";
import { Post } from "../types/post";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged
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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const auth = getAuth(app);

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
export const login = (formData:any) => {
signInWithEmailAndPassword(auth, formData.email, formData.password)
  .then( async (userCredential) => {   

    //Obtener Id
    const user = userCredential.user;
    console.log(user.uid);
    
    




    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode,errorMessage)
    // ..
  });
}

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
// Obtener datos
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.data());
// });




