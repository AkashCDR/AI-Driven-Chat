import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/user.context'
import { useNavigate } from 'react-router-dom';

const UserAuth = ({children}) => {

   const {user}=useContext(UserContext);
   const token=localStorage.getItem('token');
   const navigate=useNavigate();
   const [loading,setLoading]=useState(true);

   useEffect(()=>{
      if(user || token){
        setLoading(false);
      }

      if(!user && !token) navigate('/login')

   },[])

   if(loading){
    return <div>loading...</div>
   }



  return (
    <>
        {children}
    </>
  )
}

export default UserAuth