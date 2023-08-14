import React from 'react'
import Login from './components/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/signup'
import Home from './components/home'
import Collections from './components/collections'
import Likes from './components/likes'
import Create from './components/create'
const App = () => {
  return (
    <>
   <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/collections' element={<Collections/>}/>
    <Route path='/likes' element={<Likes/>}/>
    <Route path='/create' element={<Create/>}/>
    <Route path='/*' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App