import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import NotFound from './pages/NotFound'
import './App.css'

const App = () =>{
  return (
    <div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='member/login' element={<LoginPage/>}></Route>
            <Route path='member/join' element={<RegisterPage/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
