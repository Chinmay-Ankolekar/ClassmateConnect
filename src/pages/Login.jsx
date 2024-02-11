import { useState } from "react";
import supabase from "../supabase/Supabase";
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handlechange = (e) => {
    setFormdata((prevdata) => {
      return {
        ...prevdata,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formdata.email,
        password: formdata.password,
      });
      console.log(data);
      if (error) throw error;
    
      setToken(data);
      navigate("/dashboard");
      
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //   console.log(formdata)

  return (
    <>
      <form onSubmit={handlesubmit}>
        <label>Enter the Email</label>
        <input type="text" name="email" onChange={handlechange} />
        <br />
        <br />
        <label>Enter the Password</label>
        <input type="text" name="password" onChange={handlechange} />
        <br />
        <br />
        <button>Login</button>
      </form>
      <p>
        Dont have an account <Link to="/signup">Signup</Link>
      </p>
    </>
  );
}

export default Login;
