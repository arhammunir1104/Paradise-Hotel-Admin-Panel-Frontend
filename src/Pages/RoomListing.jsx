import React, { useEffect, useState } from 'react'
import { RoomListingImages } from '../Components/RoomListingImages'
import hotel_logo from "../Img/hotel_logo.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import WifiIcon from '@mui/icons-material/Wifi';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import { CameraOutdoor, CheckCircle, CreditCard, Elevator, Restaurant } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import AnalyticsCard from '../Components/AnalyticsCard';
import { ReservationLists } from '../Components/ReservationLists';
import { useAuth } from '../store/auth';
import { Loader } from '../Components/Loader';
import Switch from '@mui/material/Switch';
import { useNavigate, useParams } from 'react-router-dom';
import loader from "../essentials/loader.gif";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Header } from '../Components/Header';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';


function formatDateTime(isoString) {
    const date = new Date(isoString);

    const year = date.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedDateTime = `${year}-${month}-${day} : ${hours}:${strMinutes} ${ampm}`;
    return formattedDateTime;
}

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

function RoomListing() {
    
    let [show, setShow] = useState(false);
    let [data, setData] = useState([]);
    let [roomId, setRoomId] = useState("");
    let {getRoomListingData, get_token, admin_verify, updateRoomAccess} = useAuth();
    let navigate = useNavigate();
    let params = useParams();
    
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    let [hStatus , setHStatus] = useState("");
    const [isChecked, setIsChecked] = useState((hStatus === "restricted" || hStatus === "pending") ? false : true); // Initial value
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(()=>{
        let id = params.id;
        setRoomId(id)
        window.scrollTo(0, 0);
        async function get_room_data(){
            setShow(false);
            try{
                let token = get_token();
                if(!token || token === null){
                    // alert("You are not Logged in , Please Login first");
                    navigate("/login")
                }
                else{
                    // console.log(token);
                    let verify = await admin_verify(token);
                    // console.log(verify);
                    // console.log(params.id);
                    if(verify.verified === true || verify.verified){
                        if(verify.hotel_status === "incomplete"){
                            navigate(`/complete/${verify.id}`);
                        }
                        if(verify.admin_access === "pending"){
                            navigate("/error/pending");
                        }
                        else if(verify.admin_access === "restricted"){
                            navigate("/error/restricted");
                        }
                        let RoomListingData = await getRoomListingData(id);
                        console.log(RoomListingData);
                        if(RoomListingData.status === true || RoomListingData.status){
                            setData(RoomListingData.data);
                            setHStatus(RoomListingData.data.admin_access);
                            // console.log(RoomListingData.data);
                            setShow(true);
                        }
                        else{
                            alert(RoomListingData.msg);
                        }
                        
                    }
                    else{
                        alert("There are some Errors while fetching data, please login again.");
                        navigate("/login")
                    }
                }
            }
            catch(e){
                console.log("Error while fetcing Hotels data", e);
            }
        };
        get_room_data();


    }, []);


    async function changeAccess(admin_access, hotel_id){
        try{
            // console.log(admin_access, hotel_id);
            handleOpen();
            let res = await updateRoomAccess(admin_access, hotel_id);
            // console.log(res);
            if(res.status === true){
                    setHStatus(res.current_access);
                    handleClose();
                    alert(`The status of Room with id ${hotel_id} has been changed to ${res.current_access}`)
            }
            else{
                alert("Error While Changing the Room Access");
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
    <Header />
    {
            (show)

            ?
            <div className=' relative pt-[60px]'> {/*Main Listing Body  Container Open*/}
            <div  className='absolute top-0 z-[10] right-0 p-[2%]'>
                <Stack spacing={2} direction="row">
                    <NavLink to={`/updateroom/${roomId}`}>
                        <Button variant="contained"><EditIcon /> </Button>
                    </NavLink>
                </Stack>
            </div>
        <div className='h-[90vh] grid lg:grid-cols-2 grid-cols-1 clear-start mt-[-6vh]'> {/*Hero Container Open*/}
            <div className=''> {/*Image Slider Open*/}
                    <RoomListingImages data={data.room_images} />
            </div>  {/*Image Slider Close*/}

          {/*Reservation  Container Open*/}
            <div className='clear-both'> 
                <div className='px-[10%] py-[2%]'>
                    
                <div>
                    <p className='text-[1.2rem] font-bold mt-[3%] capitalize'>{data.room_title}</p>
                </div>
                <div>
                    <p className="text-[.8rem] capitalize text-custom_grey ">{data.room_add}</p>
                </div>
                <div  className="flex my-[3%]">
                    <NavLink to={`/`} className="flex my-[3%]">
                    <div>
                        <img src={data.hotel_data[0].hotel_logo} alt="" style={{border: ".1px solid #333333"}} className='w-[100px] h-[60px] rounded-[100%]' />
                    </div>
                    <div className='mt-[5%]  mx-[3%] w-[100%]'>
                        <p className='text-[1.2rem] font-bold text-custom_black capitalize'>{data.hotel_data[0].hotel_name}</p>
                        <p className="text-[.7rem] flex capitalize"><LocationOnIcon style={{fontSize: ".9rem", color: "#3B82F6"}} />{data.room_city}</p>
                    </div>
                    </NavLink>
                </div>
                <div className='flex justify-between p-[10px]'>
                    <div>
                        <p className='text-[.9rem] capitalize'> <b>Room Bed : </b>{data.room_bed} Bed</p>  
                    </div>
                    <div>
                        <p className='text-[.9rem] capitalize'><b>Room Type :</b> {data.room_type}</p>  
                    </div>
                </div>
                <div className='mt-[3%] mb-[2%]'>
                    <p className='text-[1.1rem] font-bold'>Rs.  {data.room_price} <sub className='line-through text-[#7b7b7b] font-normal'>{data.room_dis_price}</sub> <span className='font-normal text-[.9rem]'>per / day </span>  </p>
                </div>

                

                <div className='flex justify-between p-[10px]'>
                    <div>
                        <p className='text-[.7rem]'>Admin Access : <span className={`capitalize ${((hStatus === "restricted" || hStatus === "pending") ? "text-[red]" : "text-[green]")}`}>{hStatus}</span></p>  
                    </div>
                    <div>
                        <p className='text-[.7rem]'>Room Visibility : <span className={`capitalize ${((data.room_status === "restricted") ? "text-[red]" : "text-[green]")}`}>{data.room_status}</span></p>  
                    </div>
                    <div>
                        <Switch {...label}  checked={isChecked} onChange={()=>{changeAccess(hStatus, data._id)}} />
                    </div>
                </div>
                <div>
                        <AnalyticsCard data={{hotel_total_revenue :data.room_total_revenue, hotel_total_rooms: data.reservationDetails.length, msg:"Reservations"}} />
                </div>
                
                </div>
            </div>  
            {/*Reservation  Container Close*/}

        </div> {/*Hero Container Close*/}
            
                

        <div> {/*Conteent Container Open*/}
       
            <div className='lg:mt-[-5vh] mt-[80%] mx-[2%]'> {/*Sub Conteent 1 Container Open*/}
            
                <div className='grid md:grid-cols-2 grid-cols-1 '>
                <div className="p-[5px]"> {/*Description Container Open*/}
                    <p className="text-[1.5rem] font-bold ">Description</p>
                    <p className='text-[.9rem] text-custom_grey pt-[2%] capitalize px-[5px]'>{data.room_des}</p>
                </div> {/*Description Container Close*/}
                <div className='grid grid-cols-3 p-[5px] gap-10 mt-[10%]  text-[.9rem] h-[fit-content]'> {/*Facilites Container Open*/}
                        <p><AcUnitIcon style={{color : "#EBD7B2",  marginRight: "5px"}} /> AC </p>
                        <p><TvIcon   style={{color : "#EBD7B2", marginRight: "5px"  }}/>TV</p>
                        <p><WifiIcon  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Free Wifi</p>
                        <p><ElectricBoltIcon  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Electric Backup</p>
                        <p><HeatPumpIcon  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Heater</p>
                        <p><Elevator  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Elevator</p>
                        <p><Restaurant  style={{color : "#EBD7B2", marginRight: "5px"  }}/>In house Resturant</p>
                        <p><CreditCard  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Card Payment</p>
                        <p><CameraOutdoor  style={{color : "#EBD7B2", marginRight: "5px"  }}/>CCTV Camera</p>
                        <p><CheckCircle  style={{color : "#EBD7B2", marginRight: "5px"  }}/>Daily House Keeping</p>
                </div> {/*Facilites Container Close*/}  
                </div>
            </div> {/*Sub Conteent Container 1 Close*/}

            <div className="p-[10px] mx-[2%]">  {/*Sub Conteent Container 2 Open*/}
                <div>
                    <p className="text-[1.5rem] font-bold ">Policies</p>
                </div>
                <div className="p-[10px] list-outside">
                    <ul className="text-custom_grey">
                        {
                            (data.room_policy.map((val, i)=>{
                                return(
                                    <li className='my-[5px] list-disc capitalize' key={i}>{val}</li>
                                )
                            }))
                        }
                    </ul>
                </div>
            </div> {/*Sub Conteent Container 2 Close*/}

            <div> {/*Sub Conteent Container 3 Open*/}
                <div className="p-[10px] mx-[2%]">
                <p className="text-[1.5rem] font-bold ">Reservation Details: </p>
                </div>

                <div  className='grid  md:grid-cols-4 grid-cols-2 p-[10px] gap-2 px-[40px] '>
                
                </div>
                <div className='mx-[5%] my-[2%]'>
                  <ReservationLists data={data.reservationDetails} /> 
                </div>
            </div> {/*Sub Conteent Container 3 Close*/}

            
            <div> {/*Comment Section Open*/}
                        

                        <div className='p-[5px] mb-[5%]'>
                        {
                            (data.comments.length>0)
                            ?
                            <>
                                {
                                    
                            data.comments.reverse().map((val, i)=>{
                                return(
                                <>
                                    <div  className='md:mx-[5%] mx-[3%] p-[.5%] break-words text-wrap w-[70%]'>
                                        <div>
                                            <p className='text-custom_darkBrown my-[5px] capitalize'>{val.user_name} <span className='text-[.8rem] mx-[8px] text-custom_grey'>{formatDateTime(val.creationData)}</span> </p>
                                        </div>
                                        <div>
                                            <p className='text-custom_darkBrown my-[5px] text-[.9rem]'>{val.user_message}</p>
                                        </div>
                                    </div>
                                    <hr className='text-[2rem] border-[.5px] w-[60%] md:mx-[5%] mx-[3%] border-custom_darkBrown' />
                                </>
                                )
                            })
                                }
                            </>
                            :
                            <p className='text-custom_darkBrown my-[5px] capitalize mx-[5%]'> No Comments. </p>
                        }
                          </div>
                    </div> {/*Comment Section Close*/}
        </div> {/*Conteent Container Close*/}

        
    </div> 

            :
            <Loader />
}
    
        
    
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

     
    
    
    </> 
  )
}

export {RoomListing}