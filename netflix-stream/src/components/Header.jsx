import React from 'react'
import {  signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom" ;
import { useSelector,useDispatch } from "react-redux"
import { useEffect } from "react";
import { addUser,removeUser } from "../utils/userSlice";
import { LOG, SUPPORTED_LANGUAGES } from "../utils/live";
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLangauge } from '../utils/configSlice';


  const Header = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const user =useSelector((store) => store.user);
  const showGptSearch= useSelector((store) =>store.gpt.showGptSearch)

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

   const handleGptSearchClick =() =>{
    // toggle GPT Search 
    dispatch(toggleGptSearchView())

   }
   const handelLanguageChange =(e) =>{
    dispatch(changeLangauge(e.target.value));
   }
  
  
  return (
    <div className="  absolute w-screen  px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className='w-44' src= {LOG}
    alt="logo" />
    { user && ( 
      <div className="flex p-2 ">
        { showGptSearch && (
          <select className="p-2 m-2 bg-gray-800 hover:bg-gray-900  text-white rounded-lg" onChange={handelLanguageChange}>
      
          {SUPPORTED_LANGUAGES.map((lang) =>(
             <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
          )
        )}
          
        </select>)}
        <button className="py-2  px-4 mx-4 bg-purple-800 hover:bg-purple-900 text-white rounded-lg" onClick={handleGptSearchClick}>{showGptSearch?"Homepage":"GPT Search"} </button>
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
