import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { initializeApp } from 'firebase/app'

// NOTE: This is the Firebase configuration for the project. It is not sensitive information.
const firebaseConfig = {
  apiKey: "AIzaSyBm5EHvIEdAUPZTg4wzbjIVbczs_6_9x8Q",
  authDomain: "winter-berm-413619.firebaseapp.com",
  projectId: "winter-berm-413619",
  storageBucket: "winter-berm-413619.appspot.com",
  messagingSenderId: "430630989801",
  appId: "1:430630989801:web:deae0a0628009a98452578",
  measurementId: "G-1C4G026N3X"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
