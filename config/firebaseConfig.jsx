// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAkJ70W0LjsYfL-eenTkUecBv4kScj7EM",
  authDomain: "aicademy-731ec.firebaseapp.com",
  projectId: "aicademy-731ec",
  storageBucket: "aicademy-731ec.firebasestorage.app",
  messagingSenderId: "381884559361",
  appId: "1:381884559361:web:8833361213f93648165000",
  measurementId: "G-G8TRBWV57X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
const analytics = getAnalytics(app);
