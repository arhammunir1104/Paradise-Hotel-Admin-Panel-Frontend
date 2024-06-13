import React, {useEffect, useState} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate, useParams } from 'react-router-dom';
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


function UpdateRoom() {
    let [userInput, setUserInput] = useState({
        room_title: "",
        room_price : "",
        room_dis_price : "",
        room_bed : "single",
        room_type : "standard",
        room_policy : "",
        room_add : "",
        room_des : "",
    });
    let [data, setData] = useState();
    let {get_token, admin_verify, getRoomListingDataUpdate} = useAuth();
    let [show, setShow] = useState(false);
    let [token, setToken] = useState("");
    let [roomId, setRoomId] = useState();
    let navigate = useNavigate();
    let params = useParams();
    function handleInput(e){
        let name = e.target.name;
        let value = e.target.value;
        setUserInput({
            ...userInput,
            [name] : value
        });
    }

    async function handleSubmit(e){
        try{
            e.preventDefault();
            console.log(userInput);
            // console.log(token);
            let rp = userInput.room_policy.join("|")
            let d = {
                token: token,
                room_id: roomId,
                room_title: userInput.room_title,
                room_price : userInput.room_price,
                room_dis_price : userInput.room_dis_price,
                room_bed : userInput.room_bed,
                room_type : userInput.room_type,
                room_policy : rp,
                room_add : userInput.room_add,
                room_des : userInput.room_des,
            };
            console.log(d)
            let data = await fetch("http://localhost:3000/updateroom", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body : JSON.stringify(d)
            });
            let res = await data.json();
            // console.log(res);
            if(res.status === true || res.status){
                // alert("Room Created Successfully.");
                toast.success("Room Data has been updated successfully.", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate(`/a/room/${res.room_id}`);
            }
            else{
                // alert("Error, while adding Room data");
                toast.error("Error, while adding Room data", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate("/find/rooms")
            }
        }
        catch(e){
            console.log("Error, while adding a room", e);
        }
        
    }

    useEffect(()=>{
        async function check(){
            try{
                setShow(false);
                window.scrollTo(0, 0);
                let token = get_token();
                // console.log(token)
                setToken(token);
                
                if(!token || token === null){
                    navigate("/login")
                }
                else{
                    let verify = await admin_verify(token);
                    // console.log(verify);
                    if(verify.verified === false || !verify.verified ){
                        navigate("/login");
                    }
                    else{
                        if(verify.hotel_status === "incomplete"){
                            navigate(`/complete/${verify.id}`);
                        }
                        if(verify.admin_access === "pending"){
                            navigate("/error/pending");
                        }
                        else if(verify.admin_access === "restricted"){
                            navigate("/error/restricted");
                        }
                    let room = await getRoomListingDataUpdate(params.id);
                    console.log(room)
                    setUserInput(room.data);
                    setRoomId(room.data._id);
                    setShow(true);
                    }
                }
            }
            catch(e){
                console.log("Error while authenticating user", e)
            }
        };
         check();
    }, [])
  return (
        <>
        {
            (show)
            ?
            <>
        <Header />
        <div>
            <div className='min-h-[90vh] md:px-[20%] px-[10%] py-[5%]'>
                <div className='p-[10px] shadow-black shadow-md'>
                    <form onSubmit={handleSubmit}>
                    {/* style={{border: "2px solid gray"}} */}
                        <div>
                            <div className=''>
                                <p className='text-blue-500 md:text-[2rem] text-[2rem] font-bold text-center'>Update Room Data</p>
                            </div>
                            <div className='my-[15px]'>
                                <label htmlFor="room_title">Enter Room Title:
                                    <input type="text" name="room_title" id='room_title' placeholder='Room Title' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%] capitalize' autoComplete='off' style={{border: "2px solid gray"}} onChange={handleInput} value={userInput.room_title} required />
                                 </label>
                            </div>
                            <div className='my-[15px]'>
                                <label htmlFor="room_price">Enter Room Price / day:
                                    <input type="number" name="room_price" id='room_price' placeholder='Price / day' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{border: "2px solid gray"}} onChange={handleInput}  value={userInput.room_price} required />
                                 </label>
                            </div>
                            <div className='my-[15px]'>
                                <label htmlFor="room_dis_price">Enter Room Discounted Price / day:
                                    <input type="number" name="room_dis_price" id='room_dis_price' placeholder='Price / day' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{border: "2px solid gray"}} onChange={handleInput}  value={userInput.room_dis_price} required  />
                                 </label>
                            </div>
                            <div className='my-[15px]'>
                                <label htmlFor="room_bed">Room Bed:
                                {
                                (userInput.room_bed === "single")
                                ?
                                    
                                <select name="room_bed" autoFocus={true} className='h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}}  onChange={handleInput}  value={userInput.room_bed} required>
                                <option value={`${userInput.room_bed}`} name="room_bed" onChange={handleInput}  defaultValue={true} className='text-custom_black'  >Single Bed</option>
                                <option value="double" name="room_bed" onChange={handleInput} >Double Bed</option>
                                <option value="master" name="room_bed" onChange={handleInput} >Master Bed</option>
                                 </select>

                                :
                                (userInput.room_bed === "double")
                                ?
                                
                                <select name="room_bed" autoFocus={true} className='h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}}  onChange={handleInput}  value={userInput.room_bed} required>
                                <option value={`${userInput.room_bed}`} name="room_bed" onChange={handleInput}  defaultValue={true} className='text-custom_black'  >Double Bed</option>
                                <option value="single" name="room_bed" onChange={handleInput} >Single Bed</option>
                                <option value="master" name="room_bed" onChange={handleInput} >Master Bed</option>
                                 </select>
                                :
                                
                                <select name="room_bed" autoFocus={true} className='h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}}  onChange={handleInput}  value={userInput.room_bed} required>
                                <option value={`${userInput.room_bed}`} name="room_bed" onChange={handleInput}  defaultValue={true} className='text-custom_black'  >Master Bed</option>
                                <option value="single" name="room_bed" onChange={handleInput} >Single Bed</option>
                                <option value="double" name="room_bed" onChange={handleInput} >Duble Bed</option>
                                 </select>

                                
                                }
                                 </label>
                            </div>
                            <div className='my-[15px]'>
                                <label htmlFor="room_type">Room Type:

                                {
                                    (userInput.room_type === "standard")

                                    ?
                                    
                                <select name="room_type" autoFocus={true} className='h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}}   onChange={handleInput}  value={userInput.room_type} required>
                                <option value={userInput.room_type} onChange={handleInput}  name="room_type"  defaultValue={true} className='text-custom_black'  >Standard</option>
                                <option value="luxurious" onChange={handleInput} name="room_type" >Luxurious</option>
                                </select>

                                    :
                                    
                                <select name="room_type" autoFocus={true} className='h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}}   onChange={handleInput}  value={userInput.room_type} required>
                                <option value={userInput.room_type} onChange={handleInput}  name="room_type"  defaultValue={true} className='text-custom_black'  >Luxurious</option>
                                <option value="Standard" onChange={handleInput} name="room_type" >Standard</option>
                                </select>

                                
                                }
                                 </label>
                            </div>

                            <div className='my-[15px]'>
                                <label htmlFor="room_policy">Enter Room Policies:
                                    <textarea type="text" name="room_policy" id='room_policy' placeholder='Room Policies seperated by | ' className='md:h-[150px] h-[100px] pt-[10px] resize-none  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{border: "2px solid gray"}} onChange={handleInput}  value={userInput.room_policy} required />
                                 </label>
                            </div>
                            <div className='my-[15px]'>
                                <label htmlFor="room_add">Enter Room Address:
                                    <textarea type="text" name="room_add" id='room_add' placeholder='Room Address' className='md:h-[150px] pt-[10px] resize-none  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{border: "2px solid gray"}} onChange={handleInput}  value={userInput.room_add} required />
                                 </label>
                            </div>
                            <div className='my-[15px]'>
                                <label htmlFor="room_des">Enter Room Description:
                                    <textarea type="text" name="room_des" id='room_des' placeholder='Room Description ' className='md:h-[150px] h-[100px] pt-[10px] resize-none  px-[10px] outline-none text-custom_black w-[100%]' autoComplete='off' style={{border: "2px solid gray"}} onChange={handleInput}  value={userInput.room_des}  required/>
                                 </label>
                            </div>

                            <div>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" type="submit" className="text-blue-500 w-[100%] my-[2%] bg-blue-500" style={{margin: "4%", backgroundColor : "#3B82F6"}} ><EditIcon style={{marginRight: "5px"}} /> Update Room Data</Button>
                                </Stack>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
            :
            <Loader />
        }
        </>
  )
}

export  {UpdateRoom}