
import { useContext, useState } from "react";
import {Navigate} from "react-router-dom"
import { userContext } from "../UserContext";
function LoginPage() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(userContext);
  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert('wrong credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <form className="max-w-[400px] my-0 mx-auto" onSubmit={login}>
      <h1 className="text-[35px] flex justify-center items-center">Login Here</h1>
      <input
        className="block mb-[5px] w-[100%] py-[5px] px-[7px]   bg-[#fff] border-solid border-b-2 border-b-sky-500 outline-none rounded-[5px]"
        type="text"
        placeholder="username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
      />
      <input
        className="block mb-[5px] w-[100%] p-[5px]  bg-[#fff]  border-solid border-b-2 border-b-sky-500 outline-none rounded-[5px]"
        type="password"
        placeholder="password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />
      <button className="w-[100%]  mt-[10px] block bg-[#555] text-[#FFF] rounded-[5px] py-[7px] ">
        Login
      </button>
    </form>
  );
}

export default LoginPage;
