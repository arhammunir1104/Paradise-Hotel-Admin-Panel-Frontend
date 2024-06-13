import React from 'react';
import loader from "../essentials/loader.gif";


function Loader() {
  return (

    <>
        <div className='w-[100vw] h-[80vh] flex justify-center items-center'>
            <img src={loader} alt="" className='w-[500px]' />
        </div>
        
    </>
  )
}

export {Loader}