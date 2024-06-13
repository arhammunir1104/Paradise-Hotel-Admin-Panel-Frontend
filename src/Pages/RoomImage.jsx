import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import loader from "../essentials/loader.gif";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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


const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'transparent',
    p: 4,
  };

function RoomImage() {
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => setOpen3(true);
    const handleClose3 = () => setOpen3(false);
    let params = useParams();
    let navigate = useNavigate();

    async function handleSubmit(e){
        try{
            handleOpen3();
            let room_id = params.id;
            e.preventDefault();
            const formData = new FormData();
            formData.append("room_id", room_id);
            formData.append("img1", e.target.img1.files[0]);
            formData.append("img2", e.target.img2.files[0]);
            formData.append("img3", e.target.img3.files[0]);
            formData.append("img4", e.target.img4.files[0]);
            formData.append("img5", e.target.img5.files[0]);
            formData.append("img6", e.target.img6.files[0]);

            let data = await fetch("http://localhost:3000/uploadroomimage", {
                method: "POST",
                body: formData,
              })
              const res = await data.json();
              console.log("Success:", res);
              if(res.status === true || res.status){
                handleClose3();
                // alert("Room Images has been Saved");
                toast.success("Room Images has been Saved", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate(`/f/room/${room_id}`);
              }
              else{
                handleClose3();
                // alert("Error Encountered while saving Room Images");
                toast.error("Error Encountered while saving Room Images", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                console.log(res.msg)
                navigate("/find/rooms");
              }
        }
        catch(e){
            console.log("Error while adding room images", e)
        }
    };
    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [])
  return (
        <>
            <div>
                <div className='min-h-[90vh] md:px-[20%] px-[10%] py-[5%]'>
                    <div className='p-[10px] shadow-black shadow-md'>
                        <form onSubmit={handleSubmit}>
                        {/* style={{border: "2px solid gray"}} */}
                            <div>
                                <div className=''>
                                    <p className='text-blue-500 md:text-[2rem] text-[2rem] font-bold text-center'>Add Room Images</p>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="img1"><p className="my-[10px]">Upload Image 1 (Main Image)</p>
                                        <input type="file" name="img1" id='img1' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] py-[10px]' autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="img2"><p className="my-[10px]">Upload Image 2</p>
                                        <input type="file" name="img2" id='img2' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] py-[10px]' autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="img3"><p className="my-[10px]">Upload Image 3</p>
                                        <input type="file" name="img3" id='img3' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] py-[10px]' autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="img4"><p className="my-[10px]">Upload Image 4</p>
                                        <input type="file" name="img4" id='img4' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] py-[10px]' autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="img5"><p className="my-[10px]">Upload Image 5</p>
                                        <input type="file" name="img5" id='img5' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] py-[10px]' autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>
                                <div className='my-[15px]'>
                                    <label htmlFor="img6"><p className="my-[10px]">Upload Image 6</p>
                                        <input type="file" name="img6" id='img6' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] py-[10px]' autoComplete='off' style={{border: "2px solid gray"}} required />
                                     </label>
                                </div>

                                <div>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained" type="submit" className="text-blue-500 w-[100%] my-[2%] bg-blue-500" style={{margin: "4%", backgroundColor : "#3B82F6"}} ><AddIcon style={{marginRight: "5px"}} /> Add All Images</Button>
                                    </Stack>
                                </div>
                            </div>
                        </form>
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

export {RoomImage}