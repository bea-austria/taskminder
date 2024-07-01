import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import isElectron from 'is-electron'
import { HashRouter, BrowserRouter, Routes, Route  } from 'react-router-dom';

const Router = isElectron() ?  HashRouter : BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = '/*' element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
