import React from 'react'
import { NavLinks } from './NavLinks'
import PersonIcon from '@mui/icons-material/Person';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';


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

function Header() {
    let {logout} = useAuth();
    let navigate = useNavigate();

    async function Logout(){
        try{
        let log = await logout();
        console.log(log);
        if(log.logout === true || log.logout){
            toast.success(log.msg, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                
            navigate("/login");
        }
        else{
            toast.error(log.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            navigate("/login");
        }
        }
        catch(e){
            console.log("Logging out Error", e);
            // alert("There is an Error while logging out your account, Please login again.");
            toast.error("There is an Error while logging out your account, Please login again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            navigate("/login")
        }
    }
  return (
        <>
            <div> {/*Main Header Container Open*/}
                <div className='grid grid-cols-12 shadow-xl'>
                    <div className='col-span-9 flex gap-5 p-[10px]'>
                    <div><NavLinks/> </div>
                    <div>
                        <NavLink to="/">
                        <p className='md:text-[1.5rem] text-[1.3rem] font-bold text-blue-500'>DASHBOARD</p>
                        </NavLink>
                    </div>
                    </div>

                    <div className='col-span-3 p-[10px] flex justify-end'>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" className='mr-[100px]' onClick={Logout}><PersonIcon />Logout </Button>
                    </Stack>
                    </div>
                </div>
            </div> {/*Main Header Container Open*/}
        </>
  )
}

export {Header}