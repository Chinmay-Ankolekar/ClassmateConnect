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
        if (error) throw error
        alert('User Created')
        navigate('/')
        createUser()
        
    }catch (error) {
      alert( error.message)
    }
   
  }

  async function createUser(){
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(
          { 
            fullname: formdata.fullname,
            email: formdata.email,
          }
        ).single()
      if (error) throw error
    }catch (error) {
      console.log('Error:', error)
    }
  }

  console.log(formdata)

  return (
    <>

<div class="flex w-screen flex-wrap text-slate-800">
        <form  class="flex w-full flex-col md:w-1/2">
          <div class="flex justify-center pt-12 md:justify-start md:pl-12">
            <a href="#" class="text-2xl font-bold text-blue-600">
              {" "}
              ClassmateConnect .{" "}
            </a>
          </div>
          <div class="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <p class="text-center text-3xl font-bold md:leading-tight md:text-left md:text-5xl">
              Welcome to <span class="text-blue-600">ClassmateConnect</span>
            </p>
            <p class="mt-6 text-center font-medium md:text-left">
              Sign up below.
            </p>

            <form class="flex flex-col items-stretch pt-3 md:pt-8">
              <div class="flex flex-col pt-4">
                <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="text"
                    name="fullname" 
                    onChange={handlechange}
                    class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Fullname"
                  />
                </div>
                </div>
                <div class="flex flex-col pt-4">
                <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="email"
                    name="email" 
                    onChange={handlechange}
                    class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div class="mb-4 flex flex-col pt-4">
                <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    name="password" 
                    onChange={handlechange}
                    class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                  />
                </div>
              </div>
              
              <button
                onClick={handlesubmit}
                type="submit"
                class="rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
              >
                Signup
              </button>
            </form>
            <div class="py-12 text-center">
              <p class="text-gray-600">
                Already have an account?
                <Link
                  to='/'
                  class="whitespace-nowrap font-semibold text-gray-900 underline underline-offset-4"
                >
                  Sign up.
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div class="relative hidden h-screen select-none bg-blue-600 bg-gradient-to-br md:block md:w-1/2">
          <div class="py-16 px-8 text-white xl:w-[40rem]">
            <span class="rounded-full bg-white px-3 py-1 font-medium text-blue-600">
              Feature's
            </span>
            <p class="my-6 text-3xl font-semibold leading-10">
             Collaborative Project Management for  
               Student Teams.
            </p>
            <p class="mb-2">
            ClassmateConnect is a dedicated platform designed to foster collaboration and streamline project management among student teams in college. Built with the unique needs of student projects in mind, ClassmateConnect offers a range of features to enhance teamwork, communication, and productivity.
            </p>
          </div>
          <img
            class="ml-20 w-11/12 max-w-lg rounded-lg object-cover"
            src="src\images\login-image.png"
          />
        </div>
      </div>



    {/* <form onSubmit={handlesubmit}>
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
      <p>Already have an account  <Link to="/">login</Link></p> */}
    </>
  )
}

export default signup