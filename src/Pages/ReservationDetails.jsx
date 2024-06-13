import React, { useEffect } from 'react'
import { RoomListingImages } from '../Components/RoomListingImages'
import hotel_logo from "../Img/hotel_logo.png";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import WifiIcon from '@mui/icons-material/Wifi';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { CameraOutdoor, CheckCircle, CreditCard, Elevator, Restaurant } from '@mui/icons-material';
// import { RoomCards } from '../Components/RoomCards's;
import { NavLink } from 'react-router-dom';
import AnalyticsCard from '../Components/AnalyticsCard';
import { ReservationLists } from '../Components/ReservationLists';
import { ReservationDetialsCard } from '../Components/ReservationDetailsCard';


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


function ReservationDetails() {
  return (
    <>
    <div className='pt-[60px]'> {/*Main Listing Body  Container Open*/}
        <div className='h-[90vh] grid lg:grid-cols-2 grid-cols-1'> {/*Hero Container Open*/}
            <div> {/*Image Slider Open*/}
                    <RoomListingImages />
            </div>  {/*Image Slider Close*/}

          {/*Reservation  Container Open*/}
            <div className=''> 
                <div className='px-[10%] py-[2%]'>
                    
                <div>
                    <p className='text-[1.2rem] font-bold mt-[3%]'>OYO Hotel J P Inn Near Patel Nagar Metro Station</p>
                </div>
                <div>
                    <p className="text-[.8rem] text-custom_grey ">Hotel J P Inn, 5/2 East Patel Nager, Near Patel Nagar Metro Station, Delhi</p>
                </div>
                <div  className="flex my-[3%]">
                    <NavLink to="/f/hotel/1" className="flex my-[3%]">
                    <div>
                        <img src={hotel_logo} alt="" style={{border: ".1px solid #333333"}} className='w-[70px] rounded-[100%]' />
                    </div>
                    <div className='mt-[5%]  mx-[3%]'>
                        <p className='text-[1.2rem] font-bold text-custom_black'>OYO</p>
                        <p className="text-[.7rem] flex"><LocationOnIcon style={{fontSize: ".9rem", color: "#3B82F6"}} />Karachi</p>
                    </div>
                    </NavLink>
                </div>
                <div className='mt-[3%] mb-[2%]'>
                    <p className='text-[1.1rem] font-bold'>Rs. 1999 / per day <span className='text-[.7rem] line-through text-custom_grey'>2899 / per day</span> </p>
                </div>
                {/* <div>
                <form action="">
                    <div className='grid lg:grid-cols-2 md:grid-cols-2 px-[5%] relative py-[10px] pb-[20px]' >
                        <div className='w-[100%] absolute h-[100%] z-[-1] bg-black opacity-[.5]'></div>
                        <div className='col-span-2'>
                            <label htmlFor="city" className="text-custom_white">City
                            <input type="text" name="city" placeholder='Karachi' id='city' className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black md:w-[100%] ' autoComplete='off' />
                            </label>
                        </div>
                        <div >
                            <label htmlFor="checkin" className="text-custom_white">Check In Date:
                            <input type="date" name="city" placeholder='Check in Date' id='checkin' onFocus={(e)=>{e.type = "date"}} className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' />
                            </label>
                        </div>
                        <div >
                            <label htmlFor="checkout" className="text-custom_white">Check Out Date:
                            <input type="date" name="city" placeholder='Check out Date' id='checkout' className='md:h-[50px] h-[40px] px-[10px] outline-none text-custom_black w-[100%]' />
                            </label>
                        </div>
                        <div >
                            <label htmlFor="beds" className="text-custom_white">Beds
                            <input type="text" name="city" placeholder="Bed's Type" id='beds'  className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' />
                            </label>
                        </div>
                        <div >
                            <label htmlFor="roomtype" className="text-custom_white">Room Type
                            <input type="text" name="city" placeholder="Room Type" id='roomtype'  className='md:h-[50px] h-[40px]  px-[10px] outline-none text-custom_black w-[100%]' />
                            </label>
                        </div>

                        <div  className='flex justify-center items-center'>
                            <button className="bg-custom_camel mt-[20px] md:h-[50px] h-[40px]  lg:rounded-[10px] md:none rounded-[10px] w-[100%] py-[7px] duration-[.4s] ease-in-out hover:bg-custom_lightBrown text-custom_white ml-[10px]">Check Availibility</button>
                        </div><div  className='flex justify-center items-center'>
                            <button className="bg-custom_camel mt-[20px] md:h-[50px] h-[40px]  lg:rounded-[10px] md:none rounded-[10px] w-[100%] py-[7px] duration-[.4s] ease-in-out hover:bg-custom_lightBrown text-custom_white ml-[10px]">Pay and Reserve</button>
                        </div>
                    </div>
                </form>
                </div> */}
                </div>
            </div>  
            {/*Reservation  Container Close*/}

            <div></div>
        </div> {/*Hero Container Close*/}
                <div className='mx-[5%] mt-[2%]'>
                  <ReservationDetialsCard />
                </div>

        <div> {/*Conteent Container Open*/}
            <div className='lg:mt-[5%] mt-[60%] grid md:grid-cols-2 grid-cols-1 mx-[2%]'> {/*Sub Conteent 1 Container Open*/}
                <div className="p-[5px]"> {/*Description Container Open*/}
                    <p className="text-[1.5rem] font-bold ">Description</p>
                    <p className='text-[.9rem] text-custom_grey pt-[2%]  px-[5px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, corrupti tenetur odit molestiae veritatis id ipsum assumenda iure vero aliquam libero similique iste ut velit illo accusantium voluptatibus rerum a.
                    Veniam veritatis itaque velit omnis cum totam culpa placeat id ullam error, quibusdam repellat sint, illo nostrum, deleniti inventore voluptas accusantium? Pariatur eum sapiente deleniti reiciendis iste, provident similique? Hic?
                    Sunt, voluptatem error, minus fugiat sit deleniti nisi a debitis veniam unde, hic corrupti? Necessitatibus a assumenda, sint ea dignissimos, similique repellendus expedita corrupti iure facilis voluptates quisquam magnam veritatis.
                    Tempora architecto quae at similique repellendus animi maxime voluptas sequi est facere? Necessitatibus a quidem, maiores rerum excepturi mollitia tempore explicabo nihil expedita, accusantium saepe suscipit ipsum adipisci, vitae culpa.
                    Reiciendis laudantium eos tenetur sapiente aut, necessitatibus expedita facilis. Iure at distinctio minus maiores harum. Totam beatae iste iure dolor quisquam nemo delectus error eius. Unde exercitationem sunt error voluptates?
                    Libero quaerat omnis aliquam incidunt dolores deserunt hic accusamus, facere, eos aliquid doloribus id tenetur quo blanditiis illum consectetur esse sapiente magni sunt eaque voluptatibus repellendus consequatur. Totam, aperiam atque?
                    Modi suscipit inventore sapiente in ipsum laboriosam quam blanditiis nemo asperiores impedit, mollitia consequatur doloremque facere, libero molestias facilis optio nihil corporis illo omnis dolorum eligendi ab reiciendis. Modi, officiis.
                    Ab quam minus iusto exercitationem molestias nulla fugiat possimus, ullam nihil soluta vitae facilis. Molestiae dolores tempora, dolorem, minus quod corporis ducimus blanditiis at, esse beatae deleniti quisquam? Tempora, doloribus.
                    Error, hic dolores fugit vitae illo assumenda non dignissimos, repudiandae quam, necessitatibus asperiores deleniti quis facilis iure ducimus dolorem eligendi nam quas rerum. Sint, libero nam vel laudantium consequatur excepturi.
                    Temporibus blanditiis quaerat culpa ducimus illum! Sapiente reiciendis nihioluptatum. Vero ipsam, asperiores expedita tempora incidunt molestiae eaque, aliquid aperiam natus voluptatibus sit sunt.
                    Quos hic quae similique? Veniam distinctio ducimus sint nulla minus saepe totam expedita illum. Aut ipsum explicabo quod asperiores quia quo ab praesentium quos a? Voluptatum deserunt iusto repudiandae dolor!
                    Sapiente, nostrum adipisci mollitia neque sunt magnam optio numquam veniam sequi aperiam necessitatibus velit at alias hic voluptas recusandae quia soluta totam magni provident omnis aliquam! Voluptas nemo repudiandae exercitationem.
                    Beatae molestias incidunt aspernatur necessitatibus maxime ab earum nisi ad, similique veritatis sequi obcaecati architecto enim voluptatem minima minus. Libero harum autem ea exercitationem repudiandae nam quo itaque veniam! Voluptates!</p>
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
            </div> {/*Sub Conteent Container 1 Close*/}

            <div className="p-[10px] mx-[2%]">  {/*Sub Conteent Container 2 Open*/}
                <div>
                    <p className="text-[1.5rem] font-bold ">Policies</p>
                </div>
                <div className="p-[10px] list-outside">
                    <ul className="text-custom_grey">
                        <li className='my-[5px] list-disc'>Couples are welcome</li>
                        <li className='my-[5px] list-disc'>Guests can check in using any local or outstation ID proof (PAN card not accepted).</li>
                        <li className='my-[5px] list-disc'>Only Indian Nationals allowed</li>
                        <li className='my-[5px] list-disc'>As a complimentary benefit, your stay is now insured by Acko.</li>
                        <li className='my-[5px] list-disc'>This hotel is serviced under the trade name of Hotel Lotus Palace as per quality standards of O</li>
                    </ul>
                </div>
            </div> {/*Sub Conteent Container 2 Close*/}

            <div> {/*Sub Conteent Container 3 Open*/}
                <div className="p-[10px] mx-[2%]">
                <p className="text-[1.5rem] font-bold ">Rooms Nearby</p>
                </div>

                <div  className='grid  md:grid-cols-4 grid-cols-2 p-[10px] gap-2 px-[40px] '>
                    {/* <RoomCards />
                    <RoomCards />
                    <RoomCards />
                    <RoomCards /> */}
                </div>
            </div> {/*Sub Conteent Container 3 Close*/}
        </div> {/*Conteent Container Close*/}
    </div> {/*Main Listing Body  Container Close*/}
    </> 
  )
}

export {ReservationDetails}