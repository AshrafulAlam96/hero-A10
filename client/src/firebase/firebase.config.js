import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTAGfmu_roPyA30vN7bpx39fJ6Abr1EgY",
  authDomain: "hero-a10.firebaseapp.com",
  projectId: "hero-a10",
  storageBucket: "hero-a10.firebasestorage.app",
  messagingSenderId: "1093043129071",
  appId: "1:1093043129071:web:2b922865035a4e493de91a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
