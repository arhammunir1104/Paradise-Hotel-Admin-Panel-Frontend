import React, { useEffect , useState} from 'react';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Components/Loader';
import { Header } from '../Components/Header';
import { toast } from 'react-toastify';
import { Error } from './Error';

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


function Home() {
    let {get_token, admin_verify, dashboard_data} = useAuth();
    let [show, setShow] = useState(false);
    let [data, setData] = useState({});
    let navigate = useNavigate();
    useEffect(()=>{
        async function get_home_data(){
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
                    if(verify.verified === true || verify.verified){
                        let dash_data = await dashboard_data();
                        // console.log(dash_data);
                        setData(dash_data.data);
                        if(verify.hotel_status === "incomplete"){
                            navigate(`/complete/${verify.id}`);
                        }
                        if(verify.admin_access === "pending"){
                            navigate("/error/pending");
                        }
                        else if(verify.admin_access === "restricted"){
                            navigate("/error/restricted");
                        }
                        setShow(true);

                    }
                    else{
                        // alert("There are some Errors while fetching data, please login again.");
                        toast.error("There are some Errors while fetching data, please login again.", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
                        navigate("/login")
                    }
                }
            }
            catch(e){
                console.log("Error while fetcing Dashboard data");
            }
        };
        get_home_data();

    }, []);
  return (
    <>
    <Header />
    {
        (show)

        ?
        <div> {/**Home page container open */}
        <div>
        <div className='px-[10%] py-[5%]' >
            <div>
                <p className='text-[2rem] text-center text-blue-500 font-bold'>Welcome to <span className='capitalize'>{data.hotelData[0].hotel_name}</span></p>
            </div>
            <div>
                <p className='text-[1.5rem] text-center text-gray-500 font-bold'>Admin Panel</p>
            </div>
            <div> {/*Dashboard cards open*/}
                <div className='mt-[2%] grid md:grid-cols-3 grid-cols-2 gap-3'>
                    <div className='grid grid-cols-3 rounded-[5px] bg-blue-700 text-white min-h-[70px]'>
                        <div className='col-span-2 px-[10px]'>
                            <p className='text-[1.2rem] font-bold capitalize'>{data.hotelData[0].hotel_city} </p>
                            <p>City</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-center'>
                            <LocationOnIcon/>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 rounded-[5px] bg-gray-700 text-white min-h-[70px]'>
                        <div className='col-span-2 px-[10px]'>
                            <p className='text-[1.2rem] font-bold'>{data.hotelData[0].total_hotel_rooms}  </p>
                            <p>Rooms</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-center'>
                            <DoorSlidingIcon/>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 rounded-[5px] bg-teal-900 text-white min-h-[70px]'>
                        <div className='col-span-2 px-[10px]'>
                            <p className='text-[1.05rem] font-bold'>{data.total_pending} </p>
                            <p>Total Pending Reservations</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-center'>
                            <DoDisturbIcon/>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-3 rounded-[5px] bg-amber-500 text-white min-h-[70px]'>
                        <div className='col-span-2 px-[10px]'>
                            <p className='text-[1.05rem] font-bold'>{data.total_confirmed} </p>
                            <p>Total Confirmed Reservations</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-center'>
                            <CheckCircleIcon/>
                        </div>
                    </div>

                    <div className='grid grid-cols-3 rounded-[5px] bg-red-500 text-white min-h-[70px]'>
                        <div className='col-span-2 px-[10px]'>
                            <p className='text-[1.05rem] font-bold'>{data.total_cancelled} </p>
                            <p>Total Cancelled Reservations</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-center'>
                            <AttachMoneyIcon/>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 rounded-[5px] bg-slate-500 text-white min-h-[70px]'>
                        <div className='col-span-2 px-[10px]'>
                            <p className='text-[1.05rem] font-bold'>{data.total_closed} </p>
                            <p>Total Closed Reservations</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-center'>
                            <DonutLargeIcon/>
                        </div>
                    </div>
                    
                    <div className='grid grid-cols-3 md:col-span-3 mx-[20%] col-span-2  rounded-[5px] bg-green-500 text-white min-h-[70px]'>
                        <div className='col-span-2 px-[10px]'>
                            <p className='text-[1.2rem] font-bold'>Rs. {data.hotelData[0].hotel_total_revenue} </p>
                            <p>Total Revenue</p>
                        </div>
                        <div className='col-span-1 flex justify-center items-center'>
                            <AttachMoneyIcon/>
                        </div>
                    </div>
                </div>
            </div>  {/*Dashboard cards open*/}
        </div>
        </div>
    </div>  //{/**Home page container close */}

        :
        <Loader />
    }
       
    </>
  )
}

export {Home}