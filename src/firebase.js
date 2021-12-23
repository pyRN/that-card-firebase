import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as firebaseKeys from "./config/default.json";

const firebaseApp = initializeApp({
  apiKey: firebaseKeys.apiKey,
  authDomain: firebaseKeys.authDomain,
  projectId: firebaseKeys.projectId,
  storageBucket: firebaseKeys.storageBucket,
  messagingSenderId: firebaseKeys.messagingSenderId,
  appId: firebaseKeys.appId,
});

export const auth = getAuth(firebaseApp);

export default firebaseApp;
