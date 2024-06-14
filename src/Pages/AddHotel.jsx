import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, useNavigate } from 'react-router-dom';
import loader from "../essentials/loader.gif";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Header } from '../Components/Header';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';

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
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'transparent',
    border: "0px",
    p: 4,
  };


function AddHotel() {
    let [userInput, setUserInput] = useState({
        hotel_name : "",
        hotel_password : "",

    });
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    let navigate = useNavigate();
    let {set_token} = useAuth();

    function handleInput(e){
        let name = e.target.name;
        let value = e.target.value;
        setUserInput({
            ...userInput,
            [name] : value
        })
    }

    async function handleSubmit(e){
        try{
            e.preventDefault();
            handleOpen3();
            console.log(userInput);
            // const formData = new FormData();
            
            // formData.append("hotel_name", userInput.hotel_name);
            // formData.append("hotel_email", userInput.hotel_email);
            // formData.append("hotel_password", userInput.hotel_password);

            let data = await fetch("https://paradise-hotel-admin-panel-backend.vercel.app/createhotel", {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hotel_name : userInput.hotel_name,
                    hotel_email:  userInput.hotel_email,
                    hotel_password :userInput.hotel_password
                }),
              })
              const res = await data.json();
            //   console.log("Success:", res);
              if(res.status === true || res.status){
                handleClose3();
                set_token(res.token);
                // alert(res.msg);
                navigate(`/complete/${res.id}`);
                // toast.success(res.msg, {
                //     position: "top-right",
                //     autoClose: 1500,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "light",
                //     });
              }
              else{
                handleClose3();
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
                navigate("/add/hotel");
              }
        }
        catch(e){
            console.log("Error, while adding hotel data",e);
        }
    }
  return (
        <>
            <div>
                <div className='min-h-[70vh]  px-[10%] py-[4%]' >
                    <div className='grid md:grid-cols-2 grid-cols-1 w-[80vw] min-h-[70vh]'>
                        <div className='flex flex-col justify-center items-center'>
                            <div className=''>
                                <p className='text-blue-500 md:text-[2.5rem] text-[2rem] font-bold'>Create Account.</p>
                            </div>
                            <div className=''>
                                <p className='text-gray-500 text-center md:text-[1.1rem] text-[.9rem] font-bold break-words text-wrap'>Create your Hotel Account and access over 2 Million+ visitors.</p>
                            </div>
                        </div>
                        
                        <div className='p-[10px] grid-cols-1 w-[100%] shadow-black shadow-md'>
                        <form onSubmit={handleSubmit}>
                        {/* style={{border: "2px solid gray"}} */}
                            <div>
                                <div className=''>
                                    <p className='text-blue-500 md:text-[2rem] text-[2rem] font-bold text-center'>Add New Hotel</p>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="hotel_name">Enter Hotel Name:
                                        <input type="text" name="hotel_name" id='hotel_name' placeholder='Hotel Name' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]'  onChange={handleInput} value={userInput.hotel_name}  autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="hotel_email">Enter Hotel Email:
                                        <input type="email" name="hotel_email" id='hotel_email' placeholder='Hotel Account Email' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]'  onChange={handleInput} value={userInput.hotel_email}  autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="hotel_password">Enter Hotel Password:
                                        <input type="text" name="hotel_password" id='hotel_password' placeholder='Hotel Account Password' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]'  onChange={handleInput} value={userInput.hotel_password}  autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                
                                <div>
                                <p><NavLink to={"/login"}> <span className='text-blue-600 underline cursor-pointer'> Log in</span> to your account!</NavLink></p>
                                </div>

                                <div>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained" type="submit" className="text-blue-500 w-[100%] my-[2%] bg-blue-500" style={{margin: "4%", backgroundColor : "#3B82F6"}} ><AddIcon style={{marginRight: "5px"}} /> Add New Hotel</Button>
                                    </Stack>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>
                    
                </div>
                        <Modal
                open={open3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                <img src={loader} alt="" />
                </Box>
            </Modal>
            </div>
        </>
  )
}

export {AddHotel}