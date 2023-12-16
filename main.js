//import
import { authenticationHandle } from "./source/js/authentication.js";
import { productsHandle } from "./source/js/products.js";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyBQqrlQng59DqIu-vB8E6sBu_Kevo_QTpA",

  authDomain: "ecommerce-fire-aff83.firebaseapp.com",

  projectId: "ecommerce-fire-aff83",

  storageBucket: "ecommerce-fire-aff83.appspot.com",

  messagingSenderId: "482274549435",

  appId: "1:482274549435:web:2bec59093d33639c93139e"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);




//methods caller
authenticationHandle(app); //handle authentication

productsHandle(getFirestore()); //hande firestore




