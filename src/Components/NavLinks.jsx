import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';1
import AddIcon from '@mui/icons-material/Add';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from 'react-router-dom';
import hotel_logo from "../Img/hotel_logo.png";
import { useAuth } from '../store/auth';
import { Loader } from './Loader';




function NavLinks() {  
    const [open, setOpen] = React.useState(false);
    let {get_token, admin_verify, getHotelDetials} = useAuth();
    let [img, setImg] = useState(hotel_logo);
    let [hotelName, setHotelName] = useState("Admin Panel");
    let [show, setShow ] = useState(false);
  
    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
    useEffect(()=>{
      async function getData(){
        setShow(false);
        try{let token = get_token();
          if(!token || token === null){
              navigate("/login")
          }
          else{
              
              // console.log(token);
              let verify = await admin_verify(token);
              // console.log(verify);
              if(verify.verified === true || verify.verified){
                let data = await getHotelDetials();
                console.log(data);
                setImg(data.data.hotel_logo);
                setHotelName(data.data.hotel_name);
                setShow(true);
              }
          }
        }
        catch(e){
          console.log("Error while finding hotel detials.")
        }
      };
      getData();
      console.log(img);
    }, []);
    const DrawerList = (
        <Box sx={{ width: 250, marginTop: "15%" }} role="presentation" onClick={toggleDrawer(false)}>
          <List>

          <div className='flex flex-col justify-center items-center mt-[-10%]' >
            <img src={img} alt="" className='w-[100px] h-[80px] rounded-[100%] cursor-pointer' style={{border: ".5px solid gray"}} />
            <p className='text-[1.2rem] font-bold my-[5px] uppercase'>{hotelName}</p>
          </div>

          <NavLink to="/">
            <ListItem key={"Dashboard"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
                </NavLink>

                <NavLink to="/find/rooms">
              <ListItem key={"Rooms"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DoorSlidingIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Rooms"} />
                </ListItemButton>
              </ListItem>
              </NavLink>
              
              {/* <NavLink to="/find/users">
              <ListItem key={"Users"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Users"} />
                </ListItemButton>
              </ListItem>
              </NavLink> */}

              <Divider />
             
              <NavLink to="/add/room">
              <ListItem key={"Add Rooms"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AddIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Add Rooms"} />
                </ListItemButton>
              </ListItem>
              </NavLink>

              <Divider />

              <NavLink to="/pendingreservation">
              <ListItem key={"Pending Reservations"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <QueryBuilderIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Pending Reservations"} />
                </ListItemButton>
              </ListItem>
              </NavLink>

              
              <NavLink to="/confirmedreservation">
              <ListItem key={"Confirmed Reservations"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CheckCircleIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Confirmed Reservations"} />
                </ListItemButton>
              </ListItem>
              </NavLink>

              
              <NavLink to="/closereservation">
              <ListItem key={"Closed Reservations"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DoDisturbIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Closed Reservations"} />
                </ListItemButton>
              </ListItem>
              </NavLink>

              
              <NavLink to="/cancelreservation">
              <ListItem key={"Cancelled Reservations"} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <CancelIcon /> 
                  </ListItemIcon>
                  <ListItemText primary={"Cancelled Reservations"} />
                </ListItemButton>
              </ListItem>
              </NavLink>

          </List>
        </Box>
      );
  return (
            <>
              <div>
                  <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
                  <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                  </Drawer>
              </div>

            </>
  )
}

export {NavLinks}