import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7cR_zGpkc-tfciV1yRl4UUIj-HgrBF_k",
  authDomain: "usbest-chicken.firebaseapp.com",
  projectId: "usbest-chicken",
  storageBucket: "usbest-chicken.firebasestorage.app",
  messagingSenderId: "877045058492",
  appId: "1:877045058492:web:e227c4789eb1d5c0c0b9b9",
  measurementId: "G-M6DEHJBFHK"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };