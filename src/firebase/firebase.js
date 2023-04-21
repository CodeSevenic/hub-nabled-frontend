﻿// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyC-PJULEiHyN_Yp5oDXDh7mZ_8jifkPUno',
  authDomain: 'hub-nabled.firebaseapp.com',
  projectId: 'hub-nabled',
  storageBucket: 'hub-nabled.appspot.com',
  messagingSenderId: '820374872726',
  appId: '1:820374872726:web:421dd64cf3c603323bd8b7',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
