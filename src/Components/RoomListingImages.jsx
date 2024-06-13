import React, { useEffect, useState } from 'react'
import pic1 from "../Img/1.jpg";
import pic2 from "../Img/2.jpg";
import pic3 from "../Img/3.jpg";
import "../Css/RoomListingImages.css";
import {Helmet} from "react-helmet";
// import {plusSlides, currentSlide, showSlides} from "../Js/RoomListingImage"
import {RoomListingImage} from "../Js/RoomListingImage"

let slideIndex = 1;
function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    // let captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", ""); 
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    // captionText.innerHTML = dots[slideIndex-1].alt;
  }
  
function RoomListingImages({data}) {
    let [images, setImages] = useState();
    useEffect(()=>{
        RoomListingImage()
        // console.log(data)
    }, [])

  return (
        <>

        <div className="container">
            {/* <!-- Fullwidth "images with number text --> */}
            
                {data.map((val, i)=>{
                    return(
                        <div className="mySlides">
                        <div className="numbertext">{i+1} / 6</div>
                            <img src={val} style={{width:"100%",}} className='md:h-[70vh] h-[60vh] ' />
                        </div>
                    )
                })}
            
            {/* <!-- Next and previous buttons --> */}
            <a className="prev" onClick={()=>{plusSlides(-1)}}>&#10094;</a>
            <a className="next" onClick={()=>{plusSlides(1)}}>&#10095;</a>

            {/* <!-- Image text --> */}
            {/* <div className="caption-container">
            <p id="caption"></p>
            </div> */}

            {/* <!-- Thumbnail images --> */}
            <div className="row">
            {data.map((val, i)=>{
                    return(
                        
                        <div className="column">
                        <img className="demo cursor" src={val} style={{width:"100%", height: "60px"}} onClick={()=>{currentSlide(i+1)}} alt="The Woods" />
                    </div>
                    )
                })}
           
            </div>
            </div>
        </>
  )
}

export {RoomListingImages}