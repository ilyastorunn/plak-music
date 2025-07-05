// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVEE2QmFmN-uKpvCvIysHLXy8jTAypPL4",
  authDomain: "plak-14bae.firebaseapp.com",
  projectId: "plak-14bae",
  storageBucket: "plak-14bae.firebasestorage.app",
  messagingSenderId: "728580672273",
  appId: "1:728580672273:web:cd4b95196a606b1b1adab0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
