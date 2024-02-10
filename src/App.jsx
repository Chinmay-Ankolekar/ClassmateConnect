import { useEffect, useState } from 'react'
import supabase from './supabase/Supabase'
import {  Route,  Routes, Link } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreateProduct from './pages/CreateProject'
import Page_404 from './pages/Page_404'

function App() {
  const [token, setToken] = useState(false)

  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token'))
   {
      console.log(JSON.parse(sessionStorage.getItem('token')));
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
      console.log(data)
      console.log(token)
    }
  },[] )

  return (
    <>
 
      <Routes >
        <Route path={'/'} element={<Login setToken={setToken}/>} />
        <Route path={'/signup'} element={<Signup/>} />
        {
          token ? <Route path={'/dashboard'} element={<Dashboard token={token}/>} /> : <Route path={'/404page'} element={<Page_404/>} />
        }
        {
          token ? <Route path={'/createproduct'} element={<CreateProduct token={token}/>} /> : <Route path={'/404page'} element={<Page_404/>} />
        }
      </Routes>
    </>
  )
}

export default App
