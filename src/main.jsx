import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { ContextApiProvider } from "./context/ContextApi.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextApiProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextApiProvider>

)
