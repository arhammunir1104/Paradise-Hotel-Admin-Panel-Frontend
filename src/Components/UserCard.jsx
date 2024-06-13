import React, {useState, useEffect} from 'react';
import img from "../Img/1.jpg"
import hotel_logo from "../Img/hotel_logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAuth } from '../store/auth';
import Switch from '@mui/material/Switch';
import loader from "../essentials/loader.gif";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
    border :"0px"
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


function UserCard({data}) {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);
    let [hStatus , setHStatus] = useState("");
    
    let navigate = useNavigate();

    let {updateUserAccess} = useAuth();
    const [isChecked, setIsChecked] = useState((hStatus === "restricted" || hStatus === "pending") ? false : true); // Initial value
    async function changeAccess(admin_access, user_id){
        try{
            console.log(admin_access, user_id);
            handleOpen();
            let res = await updateUserAccess(admin_access, user_id);
            console.log(res);
            if(res.status === true){
                    setHStatus(res.current_access);
                    handleClose();
                    // alert(`The status of User with id ${user_id} has been changed to ${res.current_access}`)
                    toast.success(`The status of User with id ${user_id} has been changed to ${res.current_access}`, {
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
                // alert("Error While Changing the User Access");
                toast.error("Error While Changing the User Access", {
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
            <div>
                <div className='grid md:grid-cols-6 grid-cols-1 shadow-lg pl-[5%]'>
                    <div  className='col-span-1 flex justify-center items-center'>
                        <p className=''><AccountCircleIcon style={{fontSize : "5rem"}} /></p>
                    </div>
                    <div  className='grid grid-cols-2 p-[10px] col-span-3'>

                        <div>
                            <p className='text-[.80rem] py-[3px] font-bold'>Id: <span className='font-normal capitalize text-[.75rem]'>{data._id}</span></p>
                        </div>
                        <div>
                            <p className='text-[.80rem] py-[3px] font-bold'>Name: <span className='font-normal capitalize text-[.75rem]'>{data.name}</span></p>
                        </div>
                        <div>
                            <p className='text-[.80rem] py-[3px] font-bold'>City: <span className='font-normal capitalize text-[.75rem]'>{data.city}</span></p>
                        </div>
                        <div>
                            <p className='text-[.80rem] py-[3px] font-bold'>Phone: <span className='font-normal capitalize text-[.75rem]'>{data.phone}</span></p>
                        </div>
                        <div>
                            <p className='text-[.80rem] py-[3px] font-bold'>Email: <span className='font-normal capitalize text-[.75rem]'>{data.email}</span></p>
                        </div>
                        <div>
                            <p className='text-[.80rem] py-[3px] font-bold'>Cnic No: <span className='font-normal capitalize text-[.75rem]'>{data.cnic}</span></p>
                        </div>
                        <div>
                            <p className='text-[.80rem] py-[3px] font-bold'>Account Type: <span className='font-normal capitalize text-[.65rem]'>{data.type}</span></p>
                        </div>
                        <div>
                            <p className='text-[.80rem] py-[3px] font-bold'>Total Reservation History: <span className='font-normal capitalize text-[.65rem]'>{data.reservationHistory.length}</span></p>
                        </div>
                        {/* <div>
                            <p className='text-[.85rem] py-[3px] font-bold'>Account Status: <span className={`capitalize ${((hStatus === "restricted" || hStatus === "pending") ? "text-[red]" : "text-[green]")}`}>{hStatus}</span></p>
                        </div> */}
                    </div>
                    <div className='col-span-2 flex items-center p-[10px] justify-between gap-4'>
                        <div  className='flex-[.33] '>
                            <div>
                            <p className='text-[.80rem]  font-bold'>Account Status: <span className={`capitalize text-[.65rem] ${((hStatus === "restricted" || hStatus === "pending") ? "text-[red]" : "text-[green]")}`}>{hStatus}</span></p>
                            </div>
                            {/* <Button variant='outlined' onClick={handleOpen} style={{borderColor: "gray", color: "gray", width: "100%"}}>Restrict</Button> */}
                        </div>
                        <div  className='flex-[.33]'>
                        <span className='text-[.9rem]'>Restriction</span> <Switch {...label}  checked={isChecked} onChange={()=>{changeAccess(hStatus, data._id)}} />
                        </div>
                    </div>
                </div>
            </div>
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
            <p className='text-[1.2rem] font-bold'>Are you sure you want to Delet?</p>
          </div>
            <div className='my-[20px] flex justify-end'>
                <Button variant="outlined" style={{margin: "0px 10px", borderColor: "gray", color: "gray"}} onClick={handleClose2}>No</Button>
                <Button variant="contained" style={{backgroundColor : "red"}} onClick={handleClose2}>Yes</Button>
            </div>
        </Box>
      </Modal> */}
        </>
  )
}

export {UserCard}