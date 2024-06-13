import React, { useEffect, useState } from 'react'
import img from "../Img/1.jpg";
import hotel_logo from "../Img/hotel_logo.png";
import { HotelRoomCard } from '../Components/HotelRoomCard';
import AnalyticsCard from '../Components/AnalyticsCard';
import { useAuth } from '../store/auth';
import { Loader } from '../Components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../Components/Header';

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
function HotelListing() {
    
    let [show, setShow] = useState(false);
    let [data, setData] = useState([]);
    let {getHotelListingData, get_token, admin_verify} = useAuth();
    let navigate = useNavigate();
    let params = useParams();
    useEffect(()=>{
        let id = params.id;
        window.scrollTo(0, 0);
        async function get_hotel_data(){
            setShow(false);
            try{
                let token = get_token();
                if(!token || token === null){
                    alert("You are not Logged in , Please Login first");
                    navigate("/login")
                }
                else{
                    // console.log(token);
                    let verify = await admin_verify(token);
                    console.log(verify);
                    console.log(params.id);
                    if(verify.verified === true || verify.verified){
                        let HotelListingData = await getHotelListingData(id);
                        console.log();
                        if(HotelListingData.status === true || HotelListingData.status){
                            setData(HotelListingData.data);
                            console.log(HotelListingData.data);
                            setShow(true);
                        }
                        else{
                            alert(HotelListingData.msg);
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
        get_hotel_data();

    }, []);

  return (
    <>
    <Header />
    {
            (show)

            ?
            <div className='py-[60px] min-h-[80vh] md:mt-[-5%] mt-[-8%]'>
        <div className='relative'> {/*Hotel Content open*/}
            <div>
                <img src={img} alt="" className='h-[300px]  object-cover w-[100%]' />
                <div>
                     <img src={hotel_logo} alt="" style={{border: ".1px solid #333333"}} className='absolute md:top-[150px] top-[200px] md:left-[40%] left-[40%] md:w-[200px] w-[150px] rounded-[100%]' />
                </div>
            </div>

            
            <div className='md:mt-[8%] mt-[15%] px-[5%]'>
            <AnalyticsCard data={{hotel_total_revenue :data.hotel_total_revenue, hotel_total_rooms: data.total_hotel_rooms, msg: "Rooms"}}/>
            </div>
            <div className='mt-[5%] grid md:grid-cols-5 grid-cols-1 gap-2 p-[10px]'> {/*Hotel Rooms and Details Open*/}
                <div className='grid col-span-1 h-[fit-content] p-[10px] rounded-[5px] shadow-md'>
                    <div>
                        <p className='font-bold text-[.9rem] text-wrap'>Hotel Id: <span className=' text-[#7b7b7b] font-normal'>{data._id}</span></p>
                        <p className='font-bold text-[.9rem]'>Hotel Name: <span className=' text-[#7b7b7b] font-normal'> {data.hotel_name}</span></p>
                        <p className='font-bold text-[.9rem]'>Email: <span className=' text-[#7b7b7b] font-normal'>{data.hotel_email}</span></p>
                        <p className='font-bold text-[.9rem]'>Contact No: <span className=' text-[#7b7b7b] font-normal'>{data.hotel_contact_no}</span></p>
                        <p className='font-bold text-[.9rem]'>City: <span className=' text-[#7b7b7b] font-normal'>{data.hotel_city}</span></p>
                        <p className='font-bold text-[.9rem]'>Account Status: <span className=' text-[#7b7b7b] font-normal'>{data.admin_access}</span></p>
                        <p className='font-bold text-[.9rem]'>Account Creation : <span className=' text-[#7b7b7b] font-normal'>{data.creationData.split('T')[0]}</span></p>
                        <p className='font-bold text-[.9rem]'>Address: <br /><span className=' text-[#7b7b7b] font-normal'>{data.hotel_add}</span></p>
                    </div>
                </div>
                <div className='grid col-span-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 p-[10px]'>
                    {data.hotel_rooms.map((val, i)=>{
                        return(
                            <>
                                <HotelRoomCard data={val} key={i} />
                            </>

                        )
                    })}
                </div>
            </div> {/*Hotel Rooms and Details  close*/}
        </div> {/*Hotel Content close*/}
    </div>

            :
            <Loader />

    }
    
    </>
  )
}

export {HotelListing}