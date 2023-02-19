import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import RegisterPage from './RegisterPage'
import NotFound from './NotFound'
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
