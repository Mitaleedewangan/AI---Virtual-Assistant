import React from "react";
import { useContext } from "react";
import { userDataContext } from "../context/userContext";

function Card({ image }) {

     const{ serverUrl ,userData , setUserData ,backendImage , setBackendImage ,frontedImage,setFrontedImage ,selectedImage , setSelectedImage} =
        useContext(userDataContext);
    
  return (
    <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden 
    hover:shadow-2xl hover:shadow-blue-950 cuusor-pointer hover:border-4 hover:border-white ${selectedImage == image?"border-4  hover:shadow-2xl shadow-blue-950 border-white":null} `}
     onClick={()=>{setSelectedImage(image)
      setBackendImage(null)
      setFrontedImage(null)
  }}>
      <img src={image} className="h-full object-cover " />
    </div>
  );
}

export default Card;
