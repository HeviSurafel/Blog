
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { userContext } from "./UserContext";
import { Navigate } from "react-router-dom";
function Header() {
  const {setUserInfo,userInfo} = useContext(userContext);
  const[redirect,setRedirect]=useState(false)
  useEffect(() => {
    fetch('http://localhost:5000/api/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
   
    fetch('http://localhost:5000/api/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
    setRedirect(true)
  }
 
    //   if (redirect) {
    //     return <Navigate to={'/'} />
    // }

  const username = userInfo?.username;
  return (

    <header className="flex justify-between mb-[50px] items-center mt-5">
      <Link
        to="/"
        className="text-inherit no-underline font-bold text-[1.4rem]"
        href="#"
      >
        My Blog
      </Link>
      <nav className="flex gap-[15px]">
        {
          username && (
           <>
           <Link to="/create">Creat new post</Link>
          <span  onClick={logout}>Logout</span>
           </>
          )
        }
        {
          !username && (
            <>
              <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
            </>
          )
        }
      
      </nav>
    </header>
  );
}

export default Header;
