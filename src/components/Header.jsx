
import { auth } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";



function Header() {
  const [user, loading,] = useAuthState(auth);
  const navigate=useNavigate();
 
useEffect(()=>{
  if(user){
    navigate("/dashboard")
  }
},[user, loading, navigate])

  function logoutFuc()
  {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Successfully Logged Out");
      navigate("/")
    }).catch((error) => {
      // An error happened.
      toast.error(error.message);
    });
  }
  return (
    <div className=" w-full sticky p-3 text-xl bg-blue-600 text-black flex justify-between">
      Financely.
      {user && <p onClick={logoutFuc} className="cursor-pointer text-sm">LogOut</p>}
      
    </div>
  )
}

export default Header
