import React, { useState } from 'react'
import { createContext } from 'react'
export const alertcontext=createContext();
function AlertContext({children}) {
    const [alert,setalert]=useState(null);
   const showAlert=({type,message})=>{
    setalert({type,message})
    setTimeout(()=>{
        setalert(null)
    },1500);
    
   }
  return (
    <alertcontext.Provider value={{alert,showAlert}}>{children}</alertcontext.Provider>
    
  )
}

export default AlertContext