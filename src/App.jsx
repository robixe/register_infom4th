import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Terms from './pages/Terms';
import Form from './pages/user/Form';
import ForgotPasswordComponent from './pages/user/ForgotPasswordComponent';
import Dashboard from './pages/user/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/terms" element={<Terms />} />
        <Route path='/form' element={<Form/>} />
        <Route path='/password' element={<ForgotPasswordComponent/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>
  )
}

export default App
