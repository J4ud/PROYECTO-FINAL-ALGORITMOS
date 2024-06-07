
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore"; 
import { SignUpForm } from "../components";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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

const auth = getAuth(app);

// FUNCIONES PARA LOGEARME Y REGISTRARME
export const CreateUser = (formData:any) => {
createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then( async (userCredential) => {   

    //Obtener Id
    const user = userCredential.user;
    console.log(user);
    
    //Agregar documento bajo ese ID
    try {
      const where = doc(db, 'users', user.uid);
      const data = {
        age: formData.age,
        name: formData.name,
        lastName: formData.lastName,
        userName: formData.userName
      }
      await setDoc(where,data);
      alert ('Se creo el usuario')
    } catch (error) {
      
    }




    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode,errorMessage)
    // ..
  });
}




// Obtener datos
// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.data());
// });
