import React, {useState, useEffect} from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { ConfirmReservationCard } from '../Components/ConfirmReservatinCard';
import { useAuth } from '../store/auth';
import { Loader } from '../Components/Loader';
import { useNavigate } from 'react-router-dom';
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

function ConfirmReservations() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let [show, setShow] = useState(false);
    let [data, setData] = useState([]);
    let navigate = useNavigate();
    let {getReservationData, get_token, admin_verify,searchReservation} = useAuth();
     let [formData, setFormData] = useState({
        type : "confirm",
        query: "",
        query_type : "reservation_id"
    })

    function handleInput(e){
        let name = e.target.name;
        let value = e.target.value;
        setFormData({
            ...formData,
            [name] : value
        })
    };

    async function  handleSearch(e){
        setShow(false);
        try{
            e.preventDefault();
            let token = get_token();
            let d = {
                token: token,
                type : formData.type,
                query : formData.query,
                query_type : formData.query_type,
            }
            let data = await searchReservation(d);
            setData(data.data);
            // console.log(data);
            setShow(true);

        }
        catch(e){
            console.log("Error while Searching", e);
        }
    };

    useEffect(()=>{
        window.scrollTo(0, 0);
        async function get_reservation_data(){
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
                    // console.log(verify);
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
                        let ReservationData = await getReservationData("confirm");
                        // console.log(ReservationData);
                        if(ReservationData.status === true || ReservationData.status){
                            setData(ReservationData.data);
                            // console.log(ReservationData.data);
                            setShow(true);
                        }
                        else{
                            alert(ReservationData.msg);
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
        get_reservation_data();
    }, []);
  return (
    <>
    <Header />
    {
            (show)

            ?
            <div> {/*Main hotel body open*/}
            <div> {/*sub hotel body open*/}
                
                <div style={{border: "2px solid gray"}} className='shadow-sm shadow-[gray]  mt-[5%] mx-[5%] md:pl-[15%] pl-[5%] p-[10px] rounded-[30px]'> {/*Search hotel body open*/}
                    <div>
                        <form  onSubmit={handleSearch}>
                            <div className='flex'>
                                <div className='md:flex-[.5] flex-[.5]'>
                                    <input type="text" placeholder='Search by Hotel Name, Hotel Id, or Hotel City' style={{border: "1px solid gray"}} className='h-[40px] w-[100%] rounded-[5px] px-[5px]'  onChange={handleInput} value={formData.query} name="query"  />
                                </div>
                                <div className='md:flex-[.2] flex-[.3]'>
                                <select  name="query_type" onChange={handleInput} autoFocus={true} className='h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}} required>
                                    <option  name="query_type" value="reservation_id">Search by Reservation Id</option>
                                    <option  name="query_type" value="user_id">Search by User Id</option>
                                    <option  name="query_type" value="user_name">Search by User Name</option>
                                    <option  name="query_type" value="user_cnic">Search by User Cnic No</option>
                                </select>
                                </div>
                                <div className='md:flex-[.2] flex-[.1]'>
                                    <Stack spacing={2} direction="row">
                                    <Button variant="outlined" style={{width: "80%", height: "40px"}} type='submit'> <SearchIcon /> Search</Button>
                                    </Stack>
                                </div>
                            </div>
                        </form>
                    </div>
                </div> {/*Search hotel body close*/}

                <div className='px-[2%] py-[5%] grid  grid-cols-1 gap-4'> 
                {
                        (data.length>0)

                        ?
                        
                    
                        data.map((val, i)=>{
                            return(
                                <ConfirmReservationCard data={val} key={i} />
                            )

                        })
                    

                        :
                        <p>No Data Found for Hotel</p>
                    }      
                </div>
            </div> {/*sub hotel body open*/}
        </div>  //{/*Main hotel body open*/}

            :
            <Loader />

    }
        
    </>
  )
}

export {ConfirmReservations}