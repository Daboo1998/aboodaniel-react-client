import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AuthContextProvider} from "./contexts/AuthContext";
import firebase from "firebase/app";

firebase.initializeApp({
    apiKey: "AIzaSyDZjX5mSBoF_ebDTlcLUDJFuRo6Iz_-3WQ",
    authDomain: "aboodaniel-website.firebaseapp.com",
    projectId: "aboodaniel-website",
    storageBucket: "aboodaniel-website.appspot.com",
    messagingSenderId: "366395000913",
    appId: "1:366395000913:web:c846d73944c2db09751070"
});

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
