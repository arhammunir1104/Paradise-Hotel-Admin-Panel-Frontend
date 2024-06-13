import React , {useEffect, useState} from 'react';
import img from "../Img/1.jpg"
import hotel_logo from "../Img/hotel_logo.png"
import { NavLink, useNavigate } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { useAuth } from '../store/auth';
import Switch from '@mui/material/Switch';
import loader from "../essentials/loader.gif";
import { toast } from 'react-toastify';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
    border :"0px"
  };
  


function HotelCard({data}) {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    let [hStatus , setHStatus] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let {updateHotelAccess} = useAuth();
    const [isChecked, setIsChecked] = useState((hStatus === "restricted" || hStatus === "pending") ? false : true); // Initial value
    
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    let navigate = useNavigate();

    async function changeAccess(admin_access, hotel_id){
        try{
            // console.log(admin_access, hotel_id);
            handleOpen();
            let res = await updateHotelAccess(admin_access, hotel_id);
            // console.log(res);
            if(res.status === true){
                    setHStatus(res.current_access);
                    handleClose();
                    // alert(`The status of hotel with id ${hotel_id} has been changed to ${res.current_access}`)
                    toast.success(`The status of hotel with id ${hotel_id} has been changed to ${res.current_access}`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
            }
            else{
                alert("Error While Changing the Hotel Access");
                toast.error("Error While Changing the Hotel Access", {
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
            console.log("Restriction Error", e);
        }
    }
    useEffect(()=>{
        setHStatus(data.admin_access);
    }, []);
    useEffect(() => {
        // Set initial state based on hStatus only when component mounts
        setIsChecked((hStatus === "restricted" || hStatus === "pending") ? false : true);
      }, [hStatus]); // Only run once when hStatus changes
  return (
        <>
                    <div className='shadow-xl cursor-pointer hover:shadow-black hover:shadow-md duration-[.4s] ease-in-ou'> {/*hotel listing open*/}
                        <div className='relative mb-[10%]'>
                            <div>
                                <img src={img} alt="" className='' />
                            </div>
                            <div>
                                <img src={hotel_logo} alt="Hotel Logo" style={{border: ".1px solid #333333"}} className=' absolute w-[100px] rounded-[100%] left-[35%] top-[65%]' />
                            </div>
                        </div>
                        <div className='px-[10px]'>
                            <div>
                                <p className='text-[.85rem] font-bold py-[3px] '>Id: <span className='font-normal'>{data._id}</span></p>
                            </div>
                            <div>
                                <p className='text-[.85rem] font-bold py-[3px]'>Name: <span className='font-normal capitalize'>{data.hotel_name}</span></p>
                            </div>
                            <div>
                                <p className='text-[.85rem] font-bold py-[3px]'>Email: <span className='font-normal'>{data.hotel_email}</span></p>
                            </div>
                            <div>
                                <p className='text-[.85rem] font-bold py-[3px]'>Contact No: <span className='font-normal'>{data.hotel_contact_no}</span></p>
                            </div>
                            <div> 
                                <p className='text-[.85rem] font-bold py-[3px]'>Address: <span className='font-normal capitalize'>{data.hotel_add.slice(0, 60)}...</span></p>
                            </div>
                        </div>
                        <hr className='border-[.5px] w-[80%] mx-[10%] my-[5px]' />
                        <div >
                            <div className='grid grid-cols-2 px-[2px] my-[10px]'>   
                                <div  className='mx-[5px]'>
                                    <p className='text-[.8rem] capitalize'><LocationOnIcon style={{color: "#3B82F6"}} />City : <span>{data.hotel_city}</span></p>
                                </div>
                                <div className='text-right mx-[5px]'>
                                    <p className='text-[.8rem]'><MeetingRoomIcon  style={{color: "#3B82F6"}}/> Rooms: <span>{data.total_hotel_rooms} </span></p>
                                </div>
                            </div>
                            <hr className='border-[.5px] my-[5px]' />
                            <div className='p-[10px]'> 
                                <div>
                                    <p className='text-[.8rem]'><PaidIcon  style={{color: "#3B82F6"}}/> Revenue (PKR): <span>{data.hotel_total_revenue} </span></p>
                                </div>
                            </div>

                            <div className='flex justify-between p-[10px]'>
                            <div>
                              <p className='text-[.7rem]'>Admin Access : <span className={`capitalize ${((hStatus === "restricted" || hStatus === "pending") ? "text-[red]" : "text-[green]")}`}>{hStatus}</span></p>  
                            </div>

                            <div>
                                <Switch {...label}  checked={isChecked} onChange={()=>{changeAccess(hStatus, data._id)}} />
                            </div>
                            </div>
                            

                           
                            {/* <div className='flex justify-center items-center'>
                                <div className='flex-[.5]'>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" style={{width: "100%", borderRadius: "0px", backgroundColor: "green"}} onClick={handleOpen}>Off Visibility</Button>
                                </Stack>
                                </div>
                                <div className='flex-[.5]'>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" style={{width: "100%", borderRadius: "0px", backgroundColor: "red"}} onClick={handleOpen2}>Delete</Button>
                                </Stack>
                                </div>
                            </div> */}
                            <div className='my-[5px]'>
                                <NavLink to={`/f/hotel/${data._id}`}>
                                <Stack spacing={2} direction="row">
                                   <Button variant="contained" style={{width: "100%", borderRadius: "0px", backgroundColor: "#3B82F6"}}>View Hotel</Button>
                                </Stack>
                                </NavLink>
                            </div>
                        </div>
                    </div> {/*hotel listing close*/}


                    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='w-[100%] h-[20vh] flex justify-center items-center'>
            <img src={loader} alt="" className='w-[400px]' />
        </div>
        </Box>
      </Modal>

      {/* <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p className='text-[1.2rem] font-bold'>Delete Hotel ?</p>
          </div>
          <div className='my-[20px] flex justify-end'>
                <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={handleClose}>No</Button>
                <Button variant="contained" style={{backgroundColor : "#3B82F6"}} onClick={handleClose}>Yes</Button>
            </div>
        </Box>
      </Modal> */}
        </>
  )
}

export {HotelCard}