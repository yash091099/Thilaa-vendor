import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppContext } from './context/AppContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <App />
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        progressStyle={{ backgroundColor: "#BCE8B1" }}
        bodyStyle={{ backgroundColor: "#E5F6DF", color: "#121212" }}
        toastStyle={{ backgroundColor: "#E5F6DF", color: "#121212" }}
        progressClassName="progress-bar"
        limit={1}
        
         />
    </AppContext>
  </React.StrictMode>,
)
