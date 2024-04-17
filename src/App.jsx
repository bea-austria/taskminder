import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />}/>
        <Route path='/dashboard/*' element={<Dashboard />}/>
      </Routes>
    </Router>
  )
}

export default App
