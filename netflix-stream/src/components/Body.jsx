import React from 'react';
import Signin from './Signin';
import Browse from './Browse';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";





const Body = () => {

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

 


  return (
    <div>
     <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
