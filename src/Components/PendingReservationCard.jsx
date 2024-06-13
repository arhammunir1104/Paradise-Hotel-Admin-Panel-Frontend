import React from 'react';
import img from "../Img/1.jpg"
import hotel_logo from "../Img/hotel_logo.png"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useAuth } from '../store/auth';
import loader from "../essentials/loader.gif";
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius : "10px",
  p: 4,
};
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


function PendingReservationCard({data}) {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    let {confirmReservation, cancelReservation} = useAuth();

    async function confirmreservation(room_id, reservation_id){
        handleClose2();
        handleOpen3();
        try{    
            console.log(room_id, reservation_id);
            
            let data = await confirmReservation(room_id, reservation_id);
            if(data.status === true || data){
                // alert(`Reservation with ID ${reservation_id} has been Confirmed.`);
                toast.success(`Reservation with ID ${reservation_id} has been Confirmed.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    setTimeout(()=>{
                        window.location.reload();
                    }, "2000");
            }
            else{
                // alert(`Confirming Reservation with ID ${reservation_id} has been Failed.`)
                toast.error(`Confirming Reservation with ID ${reservation_id} has been Failed.`, {
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
            console.log(data);
            console.log(data);
            handleClose3();
        }
        catch(e){
            console.log("Error while confirming reservation", e);
        }
    };

    async function cancelreservation(room_id, reservation_id, current_status){
        handleClose();
        handleOpen3();
        try{    
            console.log(room_id, reservation_id, current_status, current_status);
            
            let data = await cancelReservation(room_id, reservation_id, current_status);
            if(data.status === true || data){
                // alert(`Reservation with ID ${reservation_id} has been cancelled.`);
                // window.location.reload();
                toast.success(`Reservation with ID ${reservation_id} has been cancelled.`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    setTimeout(()=>{
                        window.location.reload();
                    }, "2000");
            }
            else{
                // alert(`Cancelling Reservation with ID ${reservation_id} has been Failed.`);
                toast.error(`Cancelling Reservation with ID ${reservation_id} has been Failed.`, {
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
            console.log(data);
            console.log(data);
            handleClose3();
        }
        catch(e){
            console.log("Error while confirming reservation", e);
        }
    };

  return (
        <>
            <div>
                <div className='grid md:grid-cols-7 grid-cols-1 shadow-lg pl-[1%] w-[100%]'>
                    <div  className='relative col-span-2 flex justify-center items-center md:min-h-[none] min-h-[200px]'>
                        <img src={data.room_main_img} alt="" className='absolute z-[-1] w-[100%] h-[100%]' />
                        {/* <img src={hotel_logo} alt="" className='rounded-[50%] md:w-[70px] h-[80px]' /> */}
                    </div>
                    <div  className='grid md:grid-cols-2 grid-cols-1 p-[10px] col-span-3'>

                        <div className='col-span-2 my-[3%]'>
                            <p className=' md:text-[.85rem] text-[.65rem] py-[3px] font-bold capitalize'>Room Title: <span className='font-normal'>{data.room_title.slice(0,60)}</span></p>
                        </div>

                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>Reservation Id: <span className='font-normal'>{data._id}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>Room Id: <span className='font-normal'>{data.room_id}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>User Id: <span className='font-normal'>{data.user_id}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>User Name: <span className='font-normal capitalize'>{data.user_name}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>User Phone: <span className='font-normal'>{data.user_phone}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>User Email: <span className='font-normal'>{data.user_email}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>User CNIC No: <span className='font-normal'>{data.user_cnic}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>Reservation Status: <span className='font-normal capitalize text-green-600'>{data.reservation_status}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>Total Price: <span className='font-normal'>{data.total_price}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>Total Days: <span className='font-normal'>{data.total_days}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>Starting Date: <span className='font-normal'>{data.starting}</span></p>
                        </div>
                        <div>
                            <p className='md:text-[.85rem] text-[.65rem] py-[3px] font-bold'>Ending Date Status: <span className='font-normal'>{data.ending}</span></p>
                        </div>
                    </div>
                    <div className='col-span-2 flex justify-center flex-col'>
                        <div className='flex  md:mt-[20%] mt-[5%] items-center p-[10px] justify-center gap-2'>
                            <div  className='flex-[1] '>
                                <Button variant='outlined' onClick={handleOpen} style={{borderColor: "red", color: "red", width: "100%"}}>Cancel Reservation</Button>
                            </div>
                            <div  className='flex-[1]'>
                            <Button variant="contained" style={{backgroundColor : "green",  width: "100%"}} onClick={handleOpen2} >Confirm Reservation</Button>
                            </div>
                        </div>
                    <div>
                        {/* <div className='w-[100%] md:px-[5%]  md:mt-[10%] my-[1%]'>
                            <NavLink><Button variant="contained" style={{width: "100%"}} >View Details</Button></NavLink>
                        </div> */}
                    </div>
                    </div>
                </div>
            </div>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p className='text-[1.2rem] font-bold'> Cancel Reservation?</p>
          </div>
            <div className='my-[20px] flex justify-end'>
                <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={handleClose}>No</Button>
                <Button variant="contained" style={{backgroundColor : "red"}}  onClick={()=>{cancelreservation(data.room_id, data._id, "pending" )}} >Yes</Button>
            </div>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p className='text-[1.2rem] font-bold'>Confirm Reservation?</p>
          </div>
            <div className='my-[20px] flex justify-end'>
                <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={handleClose2}>No</Button>
                <Button variant="contained" style={{backgroundColor : "green"}} onClick={()=>{confirmreservation(data.room_id, data._id, )}}>Yes</Button>
            </div>
        </Box>
      </Modal>

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
        </>
  )
}

export {PendingReservationCard}