import React from 'react'
import { useState,useRef } from "react"
import Header from './Header';
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/live"
 const Signin = () => {
  const [isSignInForm,setIsSignInForm] =useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  
  const dispatch =useDispatch();

  const name=useRef(null);
  const email=useRef(null);
  const password=useRef(null);

 
  const handleButtonClick =() =>{
    
    const message=checkValidData(email.current.value,password.current.value)
    setErrorMessage(message);
    if(message) return;
    
   if(!isSignInForm){
     
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
      
        const user = userCredential.user;
        
        updateProfile(user, {
          displayName: name.current.value ,
          photoURL:USER_AVATAR,
         
        })
        .then(() => {
          
          const {uid,email,displayName,photoURL} = auth.currentUser;
          dispatch(addUser({uid :uid,
            email:email,
            displayName: displayName,
            photoURL:photoURL,

          })
        ); 
          
         
        })
        .catch((error) => {
          
          setErrorMessage(error.message);
        });
  
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage)
      });
    
     }
     else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
     .then((userCredential) => {
    
    const user = userCredential.user;
    
    })
    
    
    
   .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage)
  });

  }
      
 
   };
 
  const toggleSignInForm=() =>{
     setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
     <Header />
     <div className="absolute"> 
     <img 
     src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/2f8ae902-8efe-49bb-9a91-51b6fcc8bf46/IN-en-20240617-popsignuptwoweeks-perspective_alpha_website_large.jpg"
     alt="background_logo" />
     </div>
     <form onSubmit ={(e) => e.preventDefault()}className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
     <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
     
     {!isSignInForm && (
        <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full rounded-lg bg-gray-900"/>

      )}
    <input  ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full rounded-lg bg-gray-900"/>
      
      
      <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full rounded-lg bg-gray-900"/>
      <p className="text-red-500  text-lg py-2">{errorMessage}</p>
    <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
      {isSignInForm ? "Sign In" : "Sign Up"}
      </button>
    <p className="py-4 cursor-pointer" onClick={toggleSignInForm}> 
      {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now" }
    </p>
     </form>
</div>
 
  );
};

export default Signin;
