import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbOWhSQ1YSPvOKS8ndN00QZJTq-MZghr0",
  authDomain: "blog-2bafa.firebaseapp.com",
  projectId: "blog-2bafa",
  storageBucket: "blog-2bafa.appspot.com",
  messagingSenderId: "959284494921",
  appId: "1:959284494921:web:2e6f237755630e08067598"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// export default app
export { db,app }