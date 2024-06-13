import React from 'react';
import img from "../Img/1.jpg"
import hotel_logo from "../Img/hotel_logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { NavLink } from 'react-router-dom';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

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


function CloseReservationCard({data}) {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
  return (
        <>
            <div>
                <div className='grid md:grid-cols-7 grid-cols-1 shadow-lg pl-[1%]'>
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
                        <div className='flex md:mt-[20%] mt-[5%] items-center p-[10px] justify-center gap-2'>
                            <div  className='flex-[1]'>
                            <Button variant="contained" disabled style={{backgroundColor : "gray",  width: "100%", color :"white", cursor : "not-allowed"}} className=''  ><DoDisturbIcon style={{marginRight: "5px"}} /> Closed Reservation</Button>
                            </div>
                        </div>
                    <div>
                    </div>
                    </div>
                </div>
            </div>
      

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <p className='text-[1.2rem] font-bold'>Close Reservation?</p>
          </div>
            <div className='my-[20px] flex justify-end'>
                <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={handleClose2}>No</Button>
                <Button variant="contained" style={{backgroundColor : "green"}} onClick={handleClose2}>Yes</Button>
            </div>
        </Box>
      </Modal>
        </>
  )
}

export {CloseReservationCard}