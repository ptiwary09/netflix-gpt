import React from 'react';
import Signin from './Signin';
import Browse from './Browse';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase"
import { addUser,removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Body = () => {
const dispatch = useDispatch();


  const appRouter =createBrowserRouter([
    {
      path:"/",
      element:<Signin />,
    },
    {
      path: "/browse",
      element: <Browse />,
    
    },

  ]);

 useEffect(() =>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      
      const {uid,email,displayName,photoURL} = user;
      dispatch(addUser({uid :uid,email:email,displayName: displayName,photoURL:photoURL}))
      

    } else {
      // User is signed out
      dispatch(removeUser());
      
    }
  });

 },[]);


  return (
    <div>
     <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
