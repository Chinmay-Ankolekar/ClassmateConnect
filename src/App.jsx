import { useEffect, useState } from 'react'
import supabase from './supabase/Supabase'
import {  Route,  Routes, Link, Navigate  } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CreateProduct from './pages/CreateProject'
import Page_404 from './pages/Page_404'
import ProductDetails from './pages/ProjectDetails'
import Profile from './pages/Profile'

function App() {
  const [token, setToken] = useState(false)


  if(token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token'))
   {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  },[] )

  return (
    <>
 
      <Routes >
        <Route path={'/'} element={<Login setToken={setToken}/>} />
        <Route path={'/signup'} element={<Signup/>} />
        {token ? (
        <>
          <Route path={'/dashboard'} element={<Dashboard token={token}/>} />
          <Route path={'/createproduct'} element={<CreateProduct token={token}/>} />
          <Route path={'/projectdetails/:projectId'} element={<ProductDetails token={token}/>} />
          <Route path={'/profile'} element={<Profile token={token}/>} />
          {/* <Route path={'/404page'} element={<Navigate to="/404page" />} /> */}
        </>
      ) : (
         <>
          {/* <Route path={'/dashboard'} element={<Navigate to="/404page" />} />
          <Route path={'/createproduct'} element={<Navigate to="/404page" />} />
          <Route path={'/productdetails/:projectId'} element={<Navigate to="/404page" />} />
          <Route path={'/profile'} element={<Navigate to="/404page" />} />
          <Route path={'/404page'} element={<Page_404 />} /> */}
        </> 
      )} 
      </Routes>
    </>
  )
}

export default App





