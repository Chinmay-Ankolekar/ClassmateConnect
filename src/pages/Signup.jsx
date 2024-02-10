import { useState } from 'react'
import supabase from '../supabase/Supabase'
import { Link, useNavigate } from 'react-router-dom'

function signup() {
    let navigate = useNavigate()
  const [formdata, setFormdata] = useState({
    fullname: '',
    email: '',
    password: ''
  })

  const handlechange = (e) => {
    setFormdata((prevdata)=>{
      return {
      ...prevdata,
      [e.target.name]: e.target.value,
      }
    })
  }

  const handlesubmit = async (e) => {
    try {
      e.preventDefault()
      
        const { data, error } = await supabase.auth.signUp({
          email: formdata.email,
          password: formdata.password,
          options: {
            data: {
              fullName: formdata.fullname,
            },
          },
        })
        alert('User Created, check email for verification link.')
        navigate('/')
        console.log(data)
        if (error) throw error
    }catch (error) {
      console.log('Error:', error)
    }
  }

  console.log(formdata)

  return (
    <>
    <form onSubmit={handlesubmit}>
      <label>Enter the Name</label>
      <input type="text" name='fullname' onChange={handlechange}/>
      <br />
      <br />
      <label>Enter the Email</label>
      <input type="text" name='email' onChange={handlechange}/>
      <br />
      <br />
      <label>Enter the Password</label>
      <input type="text" name='password' onChange={handlechange}/>
      <br />
      <br />
      <button>Signup</button>
      </form>
      <p>Already have an account  <Link to="/">login</Link></p>
    </>
  )
}

export default signup