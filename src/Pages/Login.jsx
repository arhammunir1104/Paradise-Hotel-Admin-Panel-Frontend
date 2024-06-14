import React, {useState, useEffect} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAuth } from '../store/auth';
import { NavLink, useNavigate } from 'react-router-dom';
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


function Login() {
    let [visibility, setVisibility] = useState(true);
    let [userInput, setUserInput] = useState({
        email: "",
        password : ""
    });
    let {set_token, get_token, admin_verify} = useAuth();
    let navigate = useNavigate();

    function handleInput(e){
        let name = e.target.name;
        let value = e.target.value;
        setUserInput({
            ...userInput,
            [name] : value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        // console.log(userInput);
        try{
            async function admin_login(){
                try{
                    let data = await fetch("https://paradise-hotel-admin-panel-backend.vercel.app/admin_login", {
                        method : "POST",
                        headers: {
                           "Content-Type": "application/json",
                        },
                        body : JSON.stringify(userInput)
                }); 
                // console.log(data);
                let res = await data.json();
                // console.log(res);
                if(res.verified === true || res.verified){
                    // alert(res.msg);
                    set_token(res.token);
                    toast.success(res.msg, {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    navigate("/");
                }
                else{
                    // alert(res.msg);
                    toast.error(res.msg, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                }
                }
                catch(e){
                    console.log("Admin Account Verification Error",e);
                }
            };
            admin_login();
        }
        catch(e){
            console.log("Account Login Error");
        }
    };
    useEffect(()=>{
        async function check(){
            try{
                let token = get_token();
                if(!token || token === null){
                    // alert("You are not Logged in , Please Login first");
                    // toast.error("You are not Logged in , Please Login first", {
                    //     position: "top-right",
                    //     autoClose: 3000,
                    //     hideProgressBar: true,
                    //     closeOnClick: true,
                    //     pauseOnHover: false,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "light",
                    //     });
                    navigate("/login")
                }
                else{
                    
                    // console.log(token);
                    let verify = await admin_verify(token);
                    // console.log(verify);
                    if(verify.verified === true || verify.verified){
                        navigate("/");
                    }
                }
            }
            catch(e){
                console.log("Error, while authenticating user", e);
            }
        };
        check();
    }, []);
  return (
        <>
            <div>
                <div className='min-h-[90vh]'>
                    <div className='grid md:grid-cols-2 grid-cols-1 min-h-[90vh]'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className=''>
                                <p className='text-blue-500 md:text-[3rem] text-[2rem] font-bold'>Admin Panel</p>
                            </div>
                            <div className=''>
                                <p className='text-gray-500 md:text-[1.2rem] text-[.9rem] font-bold'>Login to account first</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>

                            <div className='w-[80%] md:my-[0]' >
                                <form onSubmit={handleSubmit}>
                                    <div className='gap-3 p-[10px] shadow-md shadow-black rounded-[10px] md:min-h-[70vh] min-h-[50vh]'>
                                    <p className="md:text-[1.5rem] text-[1.2rem] md:text-left text-center mt-[5%] text-blue-500"> <PersonIcon />Login to your Account</p>
                                    <div className='my-[15px]'>
                                        <input type="email" name="email" placeholder='Email' id='email' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{border: "2px solid gray"}} value={userInput.email} onChange={handleInput}/>
                                    </div>
                                    <div className='my-[15px] relative'>
                                    <input type={`${(!visibility) ?"text" :"password"}`} name="password" placeholder='Password' id='password' className='relative md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{border: "2px solid gray"}} value={userInput.password} onChange={handleInput} />
                                    {(!visibility) ? <p className='absolute top-2 right-0 mx-[5%] cursor-pointer'  onClick={(e)=>{setVisibility(true)}}><VisibilityOffIcon   /></p> : <p className='absolute top-2 right-0 mx-[5%] cursor-pointer' onClick={(e)=>{setVisibility(false);}}><VisibilityIcon /></p>}
                                    </div>
                                    
                                    <div>
                                        <p>Create Your<NavLink to={"/add/hotel"}> <span className='text-blue-600 underline cursor-pointer'> Hotel account</span> </NavLink></p>
                                    </div>

                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained" type="submit" className="text-blue-500 w-[100%] my-[2%] bg-blue-500" style={{margin: "4%", backgroundColor : "#3B82F6"}} >Login</Button>
                                    </Stack>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
  )
}

export {Login}