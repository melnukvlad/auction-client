import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLyP_dPZDwvzqKYiWLV7TyevKef6cVfww",
  authDomain: "gms-auction-f9190.firebaseapp.com",
  projectId: "gms-auction-f9190",
  storageBucket: "gms-auction-f9190.firebasestorage.app",
  messagingSenderId: "744757880094",
  appId: "1:744757880094:web:d2cdacc226eed87f29950f",
  measurementId: "G-TQMDJP75WX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);