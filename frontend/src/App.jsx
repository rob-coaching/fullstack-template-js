import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Nav } from './components/Nav'
import { HomePage } from './pages/Home'
import { LoginPage } from './pages/Login'
import { SignupPage } from './pages/Signup'
import { ProfilePage } from './pages/Profile'

function App() {

  return (
    <>
    <h2>Welcome to ya Page</h2>
    <p>Please cusomize meeeee</p>
    <Nav />
    <Routes>
      <Route path='/' element={<HomePage />}  />
      <Route path='/login' element={<LoginPage />}  />
      <Route path='/signup' element={<SignupPage />}  />
      <Route path='/profile' element={<ProfilePage />}  />
    </Routes>
    </>
  )
}

export default App
