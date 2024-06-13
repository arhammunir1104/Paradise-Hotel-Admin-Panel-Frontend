import React, { useEffect, useState } from 'react';
import { Header } from '../Components/Header';
import { NavLink, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


let b1 = {
  border : "5px solid red"
}
let b2 = {
  border : "5px solid blue"
}

let b3 = {
  border : "5px solid green"
}

let b4 = {
  border : "5px solid purple"
}

function Error() {
  let params = useParams();
  let link = params["*"];
  let [reason, setReason] = useState();
  useEffect(()=>{
    console.log(link)
    if(link.includes("error")){
      setReason(link.split("/")[1]);
    }
    else{
      setReason("default");
    }
    // console.log(link.includes("error"));
    // console.log(link.split("/"));
  }, [])

  if(reason === "default"){
    return (
      <>
      <Header />
      <div className='min-h-[90vh]'>
        <div className='min-h-[90vh] flex justify-center items-center flex-col'>
        <p className='text-blue-500 font-bold text-[2rem]'>Error 404 , Page not Found.</p>
        <p className='text-gray-500 pb-[5%]'>You may have entered an invalid URL or the page does not exist.</p>
        
        <Stack spacing={2} direction="row">
        <NavLink to={"/"}><Button variant="outlined">Go to Dashboard</Button></NavLink>
        </Stack>
        </div>
      </div>
      </>
)
  }
  else if(reason === "pending"){
    return (
    <>
      <div className='min-h-[90vh]'>
        <div className='min-h-[90vh] flex justify-center items-center flex-col'>
        <p className='text-blue-500 font-bold text-[2rem]'>Account Pending.</p>
        <p className='text-gray-500 pb-[5%]'>Your Account is in pending, wait a little while till the admin approve your Account.</p>
        <Stack spacing={2} direction="row">
        <NavLink to={"/"}><Button variant="outlined">Go to Dashboard</Button></NavLink>
        </Stack>
      </div>
      </div>
    </>
)

  }
  else if(reason === "restricted"){   return (
    <>
    <Header />
      <div className='min-h-[90vh]'>
        <div className='min-h-[90vh] flex justify-center items-center flex-col'>
        <p className='text-blue-500 font-bold text-[2rem]'>Account Restricted.</p>
        <p className='text-gray-500 pb-[5%]'>You may have violance our guidlines so that your account has been Restricted . <br />Contact +92 03012865 213 to appeal for activating your account.</p>
        <Stack spacing={2} direction="row">
        <NavLink to={"/"}><Button variant="outlined">Go to Dashboard</Button></NavLink>
        </Stack>
      </div>
      </div>
    </>
)

  }
  else{
    return (
    <>
    <Header />
    <div className='min-h-[90vh]'>
      <div className='min-h-[90vh] flex justify-center items-center flex-col'>
      <p className='text-blue-500 font-bold text-[2rem]'>Error Occured..</p>
      <p className='text-gray-500 pb-[5%]'>An invalid error has occured, login to your account again.</p>
      
      <Stack spacing={2} direction="row">
      <NavLink to={"/login"}><Button variant="outlined">Login </Button></NavLink>
      </Stack>
      </div>
    </div>
    </>
)

  }
}

export {Error}