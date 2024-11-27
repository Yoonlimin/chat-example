import {initializeApp} from 'firebase/app';

import { getFirestore, doc, setDoc } from 'firebase/firestore'; 
import {getAuth} from 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
 apiKey: "AIzaSyAnY-TVEP4ndwFDOEuwL_TXkHtqou_Z9Fo",
 authDomain: "chatexample-fbff2.firebaseapp.com",
 projectId: "chatexample-fbff2",
 storageBucket: "chatexample-fbff2.firebasestorage.app",
 messagingSenderId: "565488667262",
 appId: "1:565488667262:android:7590b01a0a23b7b14b662f",
};

initializeApp(firebaseConfig);
export const auth= getAuth();
export const database= getFirestore();