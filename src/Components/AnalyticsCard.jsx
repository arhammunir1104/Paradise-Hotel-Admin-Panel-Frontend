import React from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function AnalyticsCard({data}) {
  return (
        <>
            <div> {/*Dashboard cards open*/}
                    <div className='mt-[2%] grid md:grid-cols-2 grid-cols-2 gap-3 md:px-[10%] px-[1%]'>

                        <div className='grid grid-cols-3 rounded-[5px] bg-gray-700 text-white min-h-[70px]'>
                            <div className='col-span-2 px-[10px]'>
                                <p className='text-[1.2rem] font-bold'>{data.hotel_total_rooms} </p>
                                <p>{data.msg}</p>
                            </div>
                            <div className='col-span-1 flex justify-center items-center'>
                                <DoorSlidingIcon/>
                            </div>
                        </div>

                        <div className='grid grid-cols-3 rounded-[5px] bg-blue-500 text-white min-h-[70px]'>
                            <div className='col-span-2 px-[10px]'>
                                <p className='text-[1.2rem] font-bold'>Rs. {data.hotel_total_revenue} </p>
                                <p>Revenue</p>
                            </div>
                            <div className='col-span-1 flex justify-center items-center'>
                                <AttachMoneyIcon/>
                            </div>
                        </div>
                    </div>
                </div>  {/*Dashboard cards open*/}
        </>
  )
}

export default AnalyticsCard