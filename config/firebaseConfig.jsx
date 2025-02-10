// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDWPcw4AfSkq0N_9nOBwcKAFDiHQnwewU",
  authDomain: "projects-2025-8b5b1.firebaseapp.com",
  projectId: "projects-2025-8b5b1",
  storageBucket: "projects-2025-8b5b1.appspot.com",
  messagingSenderId: "630526354255",
  appId: "1:630526354255:web:097ea603ae5b2693a51b3a",
  measurementId: "G-G38YL0G2JH",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth with AsyncStorage (Ensuring No Errors)
export const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    return getAuth(app);
  }
})();

// Initialize Analytics (Only if Supported)
isSupported()
  .then((supported) => {
    if (supported) {
      getAnalytics(app);
      console.log("Firebase Analytics initialized successfully!");
    } else {
      console.warn("Firebase Analytics is not supported in this environment.");
    }
  })
  .catch((error) => console.warn("Analytics check failed:", error));

// Export Firebase App
export default app;
