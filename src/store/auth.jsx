import { useContext, createContext, useEffect, useState, Children, } from "react";

export let AuthContext= createContext();
export let AuthProvider = ({children})=>{

    async function admin_verify(token){
        // console.log(token);
        let d = {
            token
        }
        try{
            let data = await fetch("http://localhost:3000/admin_verify", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body : JSON.stringify(d)
        });
        // console.log(data);
        let res = await data.json();
        // console.log(res);
        return(res)
        }
        catch(e){
            console.log("Admin Account Verification Error",e);
        }
    };

    function set_token(token){
            localStorage.setItem("token", token);
    };
    
    function get_token(){
       return( localStorage.getItem("token"));
    };

    async function logout(){
        try{
            let token = get_token();
            // console.log(token);
            let d ={
                token
            }
            // console.log(d);
            if(!token || token === null){
                return({msg: "You are not loggedin , please login First", logout: false});
            }
            else{        
                console.log(token);        
                let data = await fetch("http://localhost:3000/logout", {
                    method : "POST",
                    headers: {
                       "Content-Type": "application/json",
                    },
                    body : JSON.stringify(d)
                });
                let res = await data.json();
                localStorage.removeItem("token");
                return(res);
            }

        }
        catch(e){
            console.log("Logging out Error", e);
        }
    };

    
    async function dashboard_data(){
        try{
            let token =  get_token();
            let data = await fetch("http://localhost:3000/dashboarddata", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify({token})
        });
        // console.log(data);
        let res = await data.json();
        // console.log(res);
        return(res)
        }
        catch(e){
            console.log("Admin Account Verification Error",e);
        }
    };
    
    async function getRoomsData(){
        try{    
            let token =  get_token();
            let data = await fetch("http://localhost:3000/find/rooms", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body :JSON.stringify({token})
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Hotel Data Fetching Error",e);
        }
    };
    async function getHotelDetials(){
        try{    
            let token =  get_token();
            let data = await fetch("http://localhost:3000/hotel_details", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body :JSON.stringify({token})
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Hotel Data Fetching Error",e);
        }
    };

    async function updateRoomAccess(room_access, room_id){
        let d = {
            admin_access :room_access,
            room_id: room_id
        };
        try{    
            let data = await fetch("http://localhost:3000/room/change/", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };
    async function getRoomListingData(id){
        try{    
            let data = await fetch(`http://localhost:3000/f/room/${id}`, {
                method : "GET",
                headers: {
                   "Content-Type": "application/json",
                },
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Data Fetching Error",e);
        }
    };

    async function getRoomListingDataUpdate(id){
        try{    
            let data = await fetch(`http://localhost:3000/u/room/${id}`, {
                method : "GET",
                headers: {
                   "Content-Type": "application/json",
                },
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Data Fetching Error",e);
        }
    };

    async function search(d){
        // console.log(d);
        try{    
            let data = await fetch("http://localhost:3000/search", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    async function searchReservation(d){
        // console.log(d);
        try{    
            let data = await fetch("http://localhost:3000/search/reservations", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };
    
    async function getReservationData(type){
        try{
            let token =  get_token();
            if(type === "pending"){
                let data = await fetch(`http://localhost:3000/pendingreservation`, {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body : JSON.stringify({token})
            });
            // console.log(data);
            let res= await data.json();
            // console.log(res);
            return(res);
            }
            else if(type === "confirm"){
                let data = await fetch(`http://localhost:3000/confirmedreservation`, {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body : JSON.stringify({token})
            });
            // console.log(data);
            let res= await data.json();
            // console.log(res);
            return(res);

            }
            else if(type === "close"){
                let data = await fetch(`http://localhost:3000/closereservation`, {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body : JSON.stringify({token})
            });
            // console.log(data);
            let res= await data.json();
            // console.log(res);
            return(res);

            }
            else{
                let data = await fetch(`http://localhost:3000/cancelreservation`, {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body : JSON.stringify({token})
            });
            // console.log(data);
            let res= await data.json();
            // console.log(res);
            return(res);
            }
        }
        catch(e){
            console.log("Reservation data finding error");
        }
    };

    

    async function confirmReservation(room_id, reservation_id){
        let d = {
            room_id :room_id,
            reservation_id: reservation_id
        };
        console.log(d);
        try{    
            let data = await fetch("http://localhost:3000/confirmreservation", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };
    async function cancelReservation(room_id, reservation_id, current_status){
        let d = {
            room_id :room_id,
            reservation_id: reservation_id,
            current_status: current_status
        };
        console.log(d);
        try{    
            let data = await fetch("http://localhost:3000/cancelreservation2", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    
    async function closeReservation(room_id, reservation_id){
        let d = {
            room_id :room_id,
            reservation_id: reservation_id
        };
        console.log(d);
        try{    
            let data = await fetch("http://localhost:3000/closereservation", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(d)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };
    async function addHotel(data){
        console.log(data);
        try{    
            let data = await fetch("http://localhost:3000/createhotel", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    
    async function getHotelDataUpdate(){
        // console.log(d);
        let token = get_token();
        try{    
            let data = await fetch("http://localhost:3000/getHotelData", {
                method : "POST",
                headers: {
                   "Content-Type": "application/json",
                },
                body: JSON.stringify({token})
        });
        // console.log(data);
        let res= await data.json();
        // console.log(res);
        return(res);
        }
        catch(e){
            console.log("Room Status Changin Error",e);
        }
    };

    return(
        <AuthContext.Provider value={{
            // getHotelData,
            set_token,
            get_token,
            logout,
            admin_verify, 
            dashboard_data,
            getRoomsData,
            updateRoomAccess,
            getRoomListingData,
            getRoomListingDataUpdate,
            search,
            getReservationData,
            searchReservation,
            confirmReservation,
            cancelReservation,
            closeReservation,
            addHotel,
            getHotelDetials,
            getHotelDataUpdate
                
            
            }}>
            {children}
        </AuthContext.Provider>
    )
};

export let useAuth = function(){
    let authContextValue = useContext(AuthContext);

    if(!authContextValue){
        throw new Error("UseAuth used outside of the provider")
    }
    return(authContextValue);
}