import React from 'react'
import room1 from "../Img/1.jpg"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';
import KingBedIcon from '@mui/icons-material/KingBed';
import AddIcon from '@mui/icons-material/Add';


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

function HotelRoomCard({data}) {
  return (
    <>
    <NavLink to={`/f/room/${data._id}`} className='group' >
                    <div className='shadow-lg py-[10px] hover:shadow-custom_grey hover:scale-[1.05] duration-[.4s] ease-in-out '> {/*Room Opening Tag*/}
                        <div >
                            <img src={room1} alt="" className='w-[100%]' />
                        </div>
                        <div className='px-[5px]'> {/*Room Listing Content Opening Tag*/}
                        <div className='my-[10px] '>
                                <p className='text-[.9rem] capitalize'>{data.room_title}...</p>
                            </div>
                        <div className='flex items-center justify-between my-[10px] px-[5px]'> {/*Price and city Opening Tag*/}
                            <div >
                                <p className='font-bold text-[1rem]'>Rs. {data.room_price} <sub className='line-through text-[#7b7b7b] font-normal'>{data.room_dis_price}</sub> <span style={{color: "#3B82F6", fontSize: ".8rem",}} className='font-normal'>per / day</span></p>
                            </div>
                            <div className='my-[10px]'>
                                <p className='font-bold text-[.8rem] capitalize' ><LocationOnIcon style={{fontSize: "1rem ", color: "#3B82F6"}}/>{data.room_city}</p>
                            </div>
                        </div> {/*Price and city Closing Tag*/}

                        <div className='my-[10px]'> {/*address Opening Tag*/}
                            <p className='text-[.9rem] capitalize'><LocationOnIcon style={{fontSize: ".9rem ", color: "#3B82F6"}}/>{data.room_add.slice(0,60)}...</p>
                        </div> {/*Address Closing Tag*/}
                        <hr className='my-[5px] mx-[10%] mb-[10px]' />
                        
                        <div className='flex items-center justify-between my-[10px] px-[5px]'> {/*Price and city Opening Tag*/}
                            <div >
                                <p className='text-[.8rem] capitalize'>Admin Access: <span className={`${(data.admin_access === "active") ? "text-green-500" : "text-red-500"}`}>{data.admin_access}</span> </p>
                            </div>
                            <div className='my-[10px]'>
                                <p className='text-[.8rem] capitalize'>Visibility <span className={`${(data.room_status === "active") ? "text-green-500" : "text-red-500"}`}>{data.room_status}</span> </p>
                            </div>
                        </div> {/*Resetrinction and visibility and city Closing Tag*/}
                        
                        <hr className='my-[5px] mx-[10%] mb-[10px]' />

                        <div  className='flex lg:flex-row flex-col justify-between'>
                            <div className='flex justify-between'>
                                <div className='mx-[10px]'>
                                    <p className='md:text-[.9rem] text-[.7rem] capitalize'><KingBedIcon style={{ color: "#3B82F6"}} /> <br /> {data.room_bed}</p>
                                </div>
                                
                                <div  className='mx-[10px]'>
                                    <p className='md:text-[.9rem] text-[.7rem] capitalize text-center'><HomeIcon style={{ color: "#3B82F6"}} />  {(data.room_type !== "standard" ? <sup><AddIcon style={{ color: "#3B82F6",  fontSize: ".6rem"}} /></sup> : "")} <br /> {data.room_type}</p>
                                </div>
                            </div>
                            

                            <div  className='flex md:justify-end '>
                                <NavLink to={`/f/room/${data._id}`} className='mx-[10px] my-[10px] w-[100%] text-center bg-[#3B82F6] text-custom_white px-[10px] py-[5px] rounded-[5px] duration-[.4s] ease-in-out group-hover:bg-[#3B82F6]'>View More</NavLink>
                            </div>
                        </div>
                        </div> {/*Room Listing Content Closing Tag*/}
                    </div> {/*Room Closing Tag*/}
                    </NavLink>
    </>
  )
}

export {HotelRoomCard}