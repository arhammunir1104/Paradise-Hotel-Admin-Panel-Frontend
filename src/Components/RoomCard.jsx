import React, {useState, useEffect} from 'react';
import img from "../Img/1.jpg"
import hotel_logo from "../Img/hotel_logo.png"
import { NavLink } from 'react-router-dom'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import PaymentsIcon from '@mui/icons-material/Payments';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { useAuth } from '../store/auth';
import Switch from '@mui/material/Switch';
import loader from "../essentials/loader.gif";
import { toast } from 'react-toastify';
import KingBedIcon from '@mui/icons-material/KingBed';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

function RoomCard({data}) {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    let [hStatus , setHStatus] = useState("");
    const [isChecked, setIsChecked] = useState((hStatus === "restricted" || hStatus === "pending") ? false : true); // Initial value

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    let {updateRoomAccess} = useAuth();

    async function changeAccess(admin_access, hotel_id){
        try{
            // console.log(admin_access, hotel_id);
            handleOpen();
            let res = await updateRoomAccess(admin_access, hotel_id);
            // console.log(res);
            if(res.status === true){
                    setHStatus(res.current_access);
                    handleClose();
                    // alert(`The status of Room with id ${hotel_id} has been changed to ${res.current_access}`)
                    toast.success(`Visibility of Room has been changed to ${res.current_access}`, {
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
                // alert("Error While Changing the Room Access");
                toast.error("Error While Changing the Room Visibility.", {
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
        setHStatus(data.room_status);
        // console.log(data);
    }, []);
    useEffect(() => {
        // Set initial state based on hStatus only when component mounts
        setIsChecked((hStatus === "restricted" || hStatus === "pending") ? false : true);
      }, [hStatus]); // Only run once when hStatus changes
  return (
        <>
                    <div className='relative  shadow-xl hover:shadow-black cursor-pointer hover:shadow-md  duration-[.4s] ease-in-ou'> {/*hotel listing open*/}
                        <div className='relative mb-[10%]'>
                            <div className='h-[200px] w-[100]'>
                                <img src={data.room_main_img} alt="" className=' w-[100%] h-[200px] object-cover' />
                            </div>
                            {/* <div>
                                <img src={hotel_logo} alt="" style={{border: ".1px solid #333333"}} className=' absolute w-[100px] rounded-[100%] sm:left-[33%] md:top-[10vh] sm:top-[15vh] left-[35%] top-[15vh]'  />
                            </div> */}
                        </div>
                        <div className='px-[10px]'>
                            <div>
                                <p className='text-[.85rem] py-[3px] font-bold'>Id: <span className='font-normal'>{data._id}</span></p>
                            </div>
                            <div>
                                <p className='text-[.85rem] py-[3px] font-bold capitalize'>Title: <span className='font-normal'>{data.room_title}</span></p>
                            </div>
                            <div>
                                <p className='text-[.85rem] py-[3px] font-bold capitalize'>Hotel Name: <span className='font-normal'>{data.hotel_data[0].hotel_name}</span></p>
                            </div>
                            <div>
                                <p className='text-[.85rem] py-[3px] font-bold capitalize'>Address: <span className='font-normal'>{data.room_add.slice(0, 40)}...</span></p>
                            </div>
                        </div>
                        <hr className='border-[.5px] w-[80%] mx-[10%] my-[5px]' />
                        <div >
                            <div className='grid grid-cols-2 px-[2px] my-[10px]'>   
                                <div  className='mx-[5px]'>
                                    <p className='text-[.8rem] capitalize'><LocationOnIcon style={{color: "#3B82F6"}} />City : <span>{data.room_city}</span></p>
                                </div>
                                <div className='text-right mx-[5px]'>
                                    <p className='text-[.8rem]'><PaymentsIcon  style={{color: "#3B82F6"}}/> Rs : <span>{data.room_price} <sub className='line-through text-[#7b7b7b] font-normal'>{data.room_dis_price}</sub> per/day </span></p>
                                </div>
                            </div>
                            <hr className='border-[.5px] my-[5px]' />

                            <div className='flex justify-between'>
                                <div className='mx-[10px]'>
                                    <p className='md:text-[.9rem] text-[.7rem] capitalize'><KingBedIcon style={{ color: "#3B82F6"}} /> <br /> {data.room_bed}</p>
                                </div>
                                
                                <div  className='mx-[10px]'>
                                    <p className='md:text-[.9rem] text-[.7rem] capitalize text-center'><HomeIcon style={{ color: "#3B82F6"}} />  {(data.room_type !== "standard" ? <sup><AddIcon style={{ color: "#3B82F6",  fontSize: ".6rem"}} /></sup> : "")} <br /> {data.room_type}</p>
                                </div>
                            </div>

                            <hr className='border-[.5px] my-[5px]' />
                            <div className='p-[10px]'> 
                                <div>
                                    <p className='text-[.8rem]'><PaidIcon  style={{color: "#3B82F6"}}/> Revenue (PKR): <span>{data.room_total_revenue} </span></p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between p-[10px]'>
                            <div>
                              <p className='text-[.7rem]'>Admin Access : <span className={`capitalize ${((data.admin_access === "restricted") ? "text-[red]" : "text-[green]")}`}>{data.admin_access}</span></p>  
                            </div>
                            <div>
                              <p className='text-[.7rem]'>Room Visibility : <span className={`capitalize ${((hStatus === "restricted" || hStatus === "pending") ? "text-[red]" : "text-[green]")}`}>{hStatus}</span></p>  
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
                                <NavLink to={`/f/room/${data._id}`}>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" style={{width: "100%", borderRadius: "0px", backgroundColor: "#3B82F6"}}>View Room</Button>
                                </Stack>
                                </NavLink>
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

export {RoomCard}