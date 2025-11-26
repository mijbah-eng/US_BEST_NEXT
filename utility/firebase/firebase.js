import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAiYaePJrRnfEApXLqUPL2gNW5zGIOgHto",
    authDomain: "safa-halal-resturant.firebaseapp.com",
    projectId: "safa-halal-resturant",
    storageBucket: "safa-halal-resturant.firebasestorage.app",
    messagingSenderId: "397331949238",
    appId: "1:397331949238:web:1bce555c3d2e41b3f2e817",
    measurementId: "G-HV2DCEEZZR"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };