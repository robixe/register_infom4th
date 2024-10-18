import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Terms from './pages/Terms';
import Form from './pages/user/Form';
import ForgotPasswordComponent from './pages/user/ForgotPasswordComponent';
import Dashboard from './pages/user/Dashboard';
import AdminLogin from './pages/root/AdminLogin';
import Verifier from './pages/root/Verifier';
import RouteDashboard from './pages/root/RouteDashboard';

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
        <Route path='/root/' element={<AdminLogin/>} />
        <Route path='/root/verification' element={<Verifier/>} />
        <Route path='/root/dashboard' element={<RouteDashboard/>} />
      </Routes>
    </Router>
  )
}

export default App