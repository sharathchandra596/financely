
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import SignUpSignIn from './pages/SignUpSignIn'
import Dashboard from './pages/Dashboard'
import { ToastContainer  } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  

  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path='/' element={<SignUpSignIn/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
