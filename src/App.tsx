import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './LoginPage'
import MainPage from './MainPage'
import RegisterPage from './RegisterPage'
import NotFound from './NotFound'
import AppStyles from './App.css'

const App = () =>{
  return (
    <div className={AppStyles.componentbox}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>}></Route>
          <Route path='member/login' element={<LoginPage/>}></Route>
          <Route path='member/join' element={<RegisterPage/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
