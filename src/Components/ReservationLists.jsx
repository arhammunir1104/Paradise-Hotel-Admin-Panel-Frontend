import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useParams } from 'react-router-dom';

function ReservationLists({data}) {
    let params = useParams();
    let [id, setId] = useState();
    let [list, setList] = useState([]);
    useEffect(()=>{
        setList(data);
        // console.log("D",d);
    }, []);
  return (
        <>
        {
            (data.length>0)

            ?
            <div>

                {
                    list.reverse().map((val, i)=>{
                        return(
                            <>
                            <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                    >
                                    <p className='w-[100%]' ><b>Starting Date : </b> {val.starting} <ArrowRightAltIcon style={{color : "#3B82F6"}} /> <b>Ending Date : </b> {val.ending}  <span className='ml-[3%]'> ( {val.total_days} days ) </span> <b className='ml-[25%]'>Status : </b> <span className={`capitalize ${(val.reservation_status === "confirmed" ? "text-green-600" : "text-red-600" )}`}>{val.reservation_status}</span>  </p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <p><b>Reservation Id :</b> {val._id}</p>
                                            </div>
                                            <div>
                                                <p><b>Customer Id :</b> {val.user_id}</p>
                                            </div>
                                            <div>
                                                <p className='capitalize'><b>Customer Name :</b> {val.user_name}</p>
                                            </div>
                                            <div>
                                                <p><b>Customer Email :</b> {val.user_email}</p>
                                            </div>
                                            <div>
                                                <p><b>Customer Phone No :</b> {val.user_phone}</p>
                                            </div>
                                            <div>
                                                <p><b>Customer CNIC No :</b> {val.user_cnic}</p>
                                            </div>
                                            <div>
                                                <p><b> Total Days :</b> {val.total_days}</p>
                                            </div>
                                            <div>
                                                <p><b> Total Price :</b> {val.total_price} Pkr  </p>
                                            </div>
                                        </div>
                                    </AccordionDetails>
                             </Accordion>
                            </>
                        )
                    })
                }
    </div>

            :
            <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p>No Active Reservations</p>
        </AccordionSummary>
      </Accordion>
      
    </div>
        }

            
        </>
  )
}

export {ReservationLists}