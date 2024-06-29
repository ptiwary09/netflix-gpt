import React from 'react'
import {  signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom" ;
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react";
import { addUser,removeUser } from "../utils/userSlice";
import { LOG } from "../utils/live";

  const Header = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const user =useSelector((store) => store.user);
  const handelSignOut =() => {
    signOut(auth)
    .then(() => {} )
    .catch((error) => {
      navigate("/error");
    });
    
  };
  

  useEffect(() =>{
   const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const {uid,email,displayName,photoURL} = user;
        
        dispatch(addUser({uid :uid,email:email,displayName: displayName,photoURL:photoURL})
      );
        
      navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")
        
      }
    });
    return () => unsubscribe();
   },[]);
  
  
  return (
    <div className="  absolute w-screen  px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className='w-44' src= {LOG}
    alt="logo" />
    
   
    { user && (
      <div className="flex p-2 ">
      <img className="w-12 h-12"
      alt="user-icon"
      src={user?.photoURL} />
     <button onClick={handelSignOut} className= "bg-red-500 hover:bg-red-800 text white font-bold py-3 px-4 rounded opacity-90 hover:opacity-100 transition duration-300">Sign Out</button>
    </div>
)}
    </div>
  );
};



export default Header;
