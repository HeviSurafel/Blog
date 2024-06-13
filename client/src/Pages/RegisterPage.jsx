import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2"
function RegisterPage() {

    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
   async function register(e){
        e.preventDefault();
   
      const response=await axios.post('http://localhost:5000/api/register',{username,password})
      console.log(response.data)
      if(response.status===200)
        {
          alert("Registered successfully completed")
        }
        else
        {
          alert("Registaration failed")
        }
    }
  return (
    <form className="max-w-[400px] my-0 mx-auto" onSubmit={register}>
      <h1 className="text-[35px] flex justify-center items-center">Register Here</h1>
      <input
        className="block mb-[10px] w-[100%] py-[5px] px-[7px]   bg-[#fff] border-solid border-b-2 border-b-sky-500 outline-none rounded-[5px]"
        type="text"
        placeholder="username"
        value={username} 
        onChange={e=>setUsername(e.target.value)}
      />
      <input
        className="block mb-[10px] w-[100%] p-[5px]  bg-[#fff]  border-solid border-b-2 border-b-sky-500 outline-none rounded-[5px]"
        type="password"
        placeholder="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />
      <button className="w-[100%] mt-[10px] block bg-[#555] text-[#FFF] rounded-[5px] py-[7px] ">
        Register
      </button>
    </form>
  );
}

export default RegisterPage;
