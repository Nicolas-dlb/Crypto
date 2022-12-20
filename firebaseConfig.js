// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyArtKI9no-Zs5Y2SYZBaE_VoRr66oTvO7s",
	authDomain: "crypto-6f5b4.firebaseapp.com",
	projectId: "crypto-6f5b4",
	storageBucket: "crypto-6f5b4.appspot.com",
	messagingSenderId: "259122445756",
	appId: "1:259122445756:web:fe661cf600a97a8eceffb9",
	measurementId: "G-GBS9V4TSNY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
