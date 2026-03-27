import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDB2Wcknizol8n_2AXxZFm89tFC38oQQCs",
  authDomain: "mvp-project-c9a44.firebaseapp.com",
  projectId: "mvp-project-c9a44",
  storageBucket: "mvp-project-c9a44.firebasestorage.app",
  messagingSenderId: "560913406024",
  appId: "1:560913406024:web:8d6ec11fe2f09b2e4ca07d",
  measurementId: "G-W05NN749GC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
