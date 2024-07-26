import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="815839571008-l9m7i48v5fn5v8qsvlbvha948rdd6gim.apps.googleusercontent.com"></GoogleOAuthProvider> */}

    <App />
  </React.StrictMode>,
)
