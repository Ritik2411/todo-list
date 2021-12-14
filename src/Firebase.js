import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBE2w3Wtv9JYEzgUxlAWFGJFoACJ4i53n8",
    authDomain: "todo-list-41c76.firebaseapp.com",
    projectId: "todo-list-41c76",
    storageBucket: "todo-list-41c76.appspot.com",
    messagingSenderId: "505998651741",
    appId: "1:505998651741:web:5b74e1cf9bdb65d8bfb8b4"
  };

const app = initializeApp(firebaseConfig)  
const auth = getAuth()
const db = getFirestore()
const provider = new GoogleAuthProvider()

export {auth,provider}
export default db