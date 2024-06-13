import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { UserCard } from '../Components/UserCard';
import { useAuth } from '../store/auth';
import { Loader } from '../Components/Loader';
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

function FindUsers() {
    let [show, setShow] = useState(false);
    let [data, setData] = useState([]);
    let {getUsersData, get_token, admin_verify, search} = useAuth();
    let navigate = useNavigate();
    let [formData, setFormData] = useState({
        type : "users",
        query: "",
        query_type : "id"
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
            let d = {
                type : formData.type,
                query : formData.query,
                query_type : formData.query_type,
            }
            let data = await search(d);
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
        async function get_home_data(){
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
                        let UserData = await getUsersData();
                        if(UserData.status === true || UserData.status){
                            setData(UserData.data);
                            console.log(UserData.data);
                            
                            setShow(true);
                        }
                        else{
                            alert(UserData.msg);
                        }
                        
                    }
                    else{
                        alert("There are some Errors while fetching data, please login again.");
                        navigate("/login")
                    }
                }
            }
            catch(e){
                console.log("Error while fetcing Users data", e);
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
            <div> {/*Main hotel body open*/}
            <div> {/*sub hotel body open*/}
                
                <div style={{border: "2px solid gray"}} className='shadow-sm shadow-[gray]  mt-[5%] mx-[5%] md:pl-[15%] pl-[5%] p-[10px] rounded-[30px]'> {/*Search hotel body open*/}
                    <div>
                        <form onSubmit={handleSearch}>
                            <div className='flex'>
                                <div className='md:flex-[.5] flex-[.5]'>
                                    <input type="text" placeholder='Search by Hotel Name, Hotel Id, or Hotel City' style={{border: "1px solid gray"}} className='h-[40px] w-[100%] rounded-[5px] px-[5px]' onChange={handleInput} value={formData.query} name="query"  />
                                </div>
                                <div className='md:flex-[.2] flex-[.3]'>
                                <select name="query_type" onChange={handleInput}  autoFocus={true} className='h-[40px]  px-[10px] outline-none text-custom_black w-[100%] rounded-[5px]'  style={{border: "2px solid grey"}} required>
                                    <option value="id" name="query_type" defaultValue={true} selected="true" className='text-custom_black'>Search by Id</option>
                                    <option value="name" name="query_type">Search by Name</option>
                                    <option value="reservation" name="query_type">Search by Reservation Id</option>
                                </select>
                                </div>
                                <div className='md:flex-[.2] flex-[.1]'>
                                    <Stack spacing={2} direction="row">
                                    <Button variant="outlined" style={{width: "80%", height: "40px"}}  type='submit'> <SearchIcon /> Search</Button>
                                    </Stack>
                                </div>
                            </div>
                        </form>
                    </div>
                </div> {/*Search hotel body close*/}

                <div className='px-[5%] py-[5%] grid  grid-cols-1 gap-4'>      
                {
                        (data.length>0)

                        ?
                        
                    
                        data.map((val, i)=>{
                            return(
                                <UserCard data={val} key={i} />
                            )

                        })
                    

                        :
                        <p>No Data Found for Hotel</p>
                    }
                    {/* <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard /> */}
                </div>
            </div> {/*sub hotel body open*/}
        </div>  //{/*Main hotel body open*/}
            :
            <Loader />
    }
        
    </>
  )
}

export {FindUsers}