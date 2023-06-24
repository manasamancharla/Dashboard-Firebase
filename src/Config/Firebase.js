import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPgCFy2HtGsveL-Dv2jWf4rTJszyxBpmU",

  authDomain: "avadoha-frontend.firebaseapp.com",

  projectId: "avadoha-frontend",

  storageBucket: "avadoha-frontend.appspot.com",

  messagingSenderId: "695925417082",

  appId: "1:695925417082:web:77a5fd7c8b479e14bbc7c3",

  measurementId: "G-7XHEXQXNK8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
