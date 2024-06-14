import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useParams } from 'react-router-dom';
import loader from "../essentials/loader.gif";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Header } from '../Components/Header';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import { Loader } from '../Components/Loader';

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
    bgcolor: 'transparent',
    borderRadius : "10px",
    p: 4,
  };
 

function UpdateHotel() {
    let {set_token, get_token, getHotelDataUpdate} = useAuth();
    let [show, setShow] = useState(false);
    let [userInput, setUserInput] = useState({
        hotel_id :"",
        hotel_name: "",
        hotel_contact_no: "",
        hotel_add: "",
        hotel_des :"",

    });
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    let navigate = useNavigate();
    let params = useParams();
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
            // console.log(userInput);
            const formData = new FormData();
            formData.append("hotel_contact_no", userInput.hotel_contact_no);
            formData.append("hotel_name", userInput.hotel_name);
            formData.append("hotel_id", userInput.hotel_id);
            formData.append("hotel_add", userInput.hotel_add);
            formData.append("hotel_des", userInput.hotel_des);


            let data = await fetch("https://paradise-hotel-admin-panel-backend.vercel.app/updateHotelData", {
                method: "POST",
                body: formData,
              })
              const res = await data.json();
            //   console.log("Success:", res);
              if(res.status === true || res.status){
                handleClose3();
                // alert(res.msg);
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
                navigate("/login");
              }
        }
        catch(e){
            console.log("Error, while adding hotel data",e);
        }
    };

    useEffect(()=>{
        async function getData(){
            try{
                setShow(false);
                let data = await getHotelDataUpdate();
                // console.log(data.data);
                // console.log(data.data.hotel_add,  data.data.hotel_contact_no, data.data.hotel_name, data.data.hotel_des);
                setUserInput({
                    ...userInput,
                    hotel_id: data.data._id,
                    hotel_add: data.data.hotel_add,
                    hotel_contact_no: data.data.hotel_contact_no,
                    hotel_name: data.data.hotel_name,
                    hotel_des: data.data.hotel_des
                });
                setShow(true);
                
            }
            catch(e){
                console.log("Error while fetching hotel data");
            }
        };
        getData();
    }, [])
  return (
        <>
        {
            (show)
            ?
            <div>
                <div className='min-h-[70vh]  px-[10%] py-[2%]'>
                    <p className='text-blue-500 md:text-[2.5rem] text-[2rem] font-bold text-center '>Complete Profile.</p>
                    <p className='text-gray-500 text-center md:text-[1.1rem] text-[.9rem] py-[1%] font-bold break-words text-wrap'>Your profile is incomplete right now, complete your profile by adding additional required details.</p>

                    <div className='p-[10px] shadow-black shadow-md col-span-2 md:mx-[10%]'>
                        <form onSubmit={handleSubmit}>
                        {/* style={{border: "2px solid gray"}} */}
                            <div>
                                <div className='my-[15px]'>
                                    <label htmlFor="hotel_name">Enter Hotel Name:
                                        <input type="text" name="hotel_name" id='hotel_name' placeholder='Hotel Name' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]'  onChange={handleInput} value={userInput.hotel_name}  autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="hotel_contact_no">Enter Hotel Contact No:
                                        <input type="number" name="hotel_contact_no" id='hotel_contact_no' placeholder='Hotel Contact No' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]'  onChange={handleInput} value={userInput.hotel_contact_no}  autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="hotel_add">Enter Hotel Address:
                                        <input type="text" name="hotel_add" id='hotel_add' placeholder='Hotel Address' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]'  onChange={handleInput} value={userInput.hotel_add}  autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="hotel_des">Enter Hotel Description:
                                        <textarea type="text" name="hotel_des" id='hotel_des' placeholder='Hotel Description' className='md:h-[150px] p-[10px] resize-none h-[100px]  px-[10px] outline-none text-custom_black w-[100%]' onChange={handleInput} value={userInput.hotel_des} autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>

                                <div>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained" type="submit" className="text-blue-500 w-[100%] my-[2%] bg-blue-500" style={{margin: "4%", backgroundColor : "#3B82F6"}} ><CheckCircleIcon style={{marginRight: "5px"}} />Update Profile</Button>
                                    </Stack>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                        <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2}>
                <img src={loader} alt="" />
                </Box>
            </Modal>
            </div>
            :
            <Loader />
        }
            
        </>
  )
}

export {UpdateHotel}