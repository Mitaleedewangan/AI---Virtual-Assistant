import React, { useRef } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { useContext } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function Customize() {
    const{ serverUrl ,userData , setUserData ,backendImage , setBackendImage ,frontedImage ,setFrontedImage ,selectedImage , setSelectedImage} =
    useContext(userDataContext);
  const navigate = useNavigate();
    // const [frontedImage,setFrontedImage] = useState(null);
    // const[backendImage , setBackendImage] = useState(null);
    const inputImage = useRef();

    const handleImage =(e)=>{
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontedImage(URL.createObjectURL(file))
    }

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px]">
       <IoMdArrowRoundBack className="absolute top-[30px]  left-[30px] text-white cursor-pointer w[-[25px] h-[25px]" onClick={()=> navigate("/customize")
      
            } />
      <h1 className="text-white mb-[40px] text-[30px] text-center">Select your <span className="text-blue-300">Assistant Image</span></h1>
      <div className="w-[90%] max-w-[900px] flex justify-center items-center flex-wrap gap-[20px] ">
      <Card image={image1} />
      <Card image={image2} />
      <Card image={image3} />
      <Card image={image4} />
      <Card image={image5} />
      <Card image={image6} />
      <Card image={image7} />

      <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]  bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden 
    hover:shadow-2xl hover:shadow-blue-950 cuusor-pointer hover:border-4 hover:border-white flex items-center justify-center ${selectedImage == image1?"border-4  hover:shadow-2xl shadow-blue-950 border-white":null} `}
     onClick={()=>{inputImage.current.click()
        setSelectedImage("input")
     }}>
         {!frontedImage && <FaCloudUploadAlt className ="text-white w-[25px] h-25[px] "/>}
         {frontedImage  && <img src={frontedImage} className="h-full object-cover"/>}
         </div>
         <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage}/>
         </div>
         {selectedImage &&      <button className="min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full cursor-pointer text-[19px]"  onClick={()=>navigate("/customize2")}>Next</button> }
     

    </div>
  );
}

export default Customize;

        