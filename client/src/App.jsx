import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { CityProvider } from './context/CityContext'
import './App.css'

function App() {
  return (
    <CityProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </CityProvider>
  )
}

export default App
