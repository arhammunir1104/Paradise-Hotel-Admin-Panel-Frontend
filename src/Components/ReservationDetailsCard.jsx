import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

function ReservationDetialsCard() {
  return (
        <>
            <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <p><b>Starting Date : </b> 2024-09-12 <ArrowRightAltIcon style={{color : "#3B82F6"}} /> <b>Ending Date : </b> 2024-09-12</p>
        </AccordionSummary>
        <AccordionDetails >
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <p><b>Reservation Id :</b> 12321</p>
                </div>
                <div>
                    <p><b>Hotel Id :</b> 123</p>
                </div>
                <div>
                    <p><b>Hotel Address :</b> 123123123</p>
                </div>
                <div>
                    <p><b>Room Id :</b> 12312312321</p>
                </div>
                <div>
                    <p><b>Room No :</b> Room Title</p>
                </div>
                <div>
                    <p><b>Room City :</b> Karachi</p>
                </div>
                <div>
                    <p><b>Customer Id :</b> 123123212123</p>
                </div>
                <div>
                    <p><b>Customer Name :</b> Arham</p>
                </div>
                <div>
                    <p><b>Customer Email :</b> abc@gmail.com</p>
                </div>
                <div>
                    <p><b>Customer Phone No :</b> 03012865213</p>
                </div>
                <div>
                    <p><b>Customer CNIC No :</b> 42401-123123-1</p>
                </div>
            </div>
        </AccordionDetails>
      </Accordion>      
    </div>
        </>
  )
}

export {ReservationDetialsCard}