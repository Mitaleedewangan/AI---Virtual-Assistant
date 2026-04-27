import React, { useContext } from "react";
import { useState } from "react";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";

function Customize2() {
  const { userData, backendImage, selectedImage } = useContext(userDataContext)
  const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
  const navigate = useNavigate();
  const { serverUrl, setUserData } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);


  const handleCreateAssistant = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("assistantName", assistantName);
      if (backendImage) {

        formData.append("assistantImage", backendImage);
      }
      else {
        formData.append("imageUrl", selectedImage);
      }
      const res = await axios.post(
        `${serverUrl}/api/user/update`,
        formData,
        { withCredentials: true }
      );
      setLoading(false);

      console.log(res.data);
      setUserData(res.data);
      navigate("/home"); // ya dashboard
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] 
    flex justify-center items-center flex-col p-[20px]">
      <IoMdArrowRoundBack className="absolute top-[30px]  left-[30px] text-white cursor-pointer w[-[25px] h-[25px]" onClick={()=> navigate("/customize")

      } />
      <h1 className="text-white mb-[40px] text-[30px] text-center">Enter Your <span className="text-blue-200">Assistant Image</span></h1>

      <div className="flex flex-col items-center">

       

        <input
          type="text"
          placeholder=" eg:Jarvis"
          className="w-full max-w-[600px] h-[60px] border-2 border-white bg-transparent text-white px-[20px] rounded-full"
          onChange={(e) => setAssistantName(e.target.value)}
          value={assistantName}
        />

      </div>

      {assistantName && <button
        onClick={handleCreateAssistant} disabled={loading}
        className="min-w-[300px] h-[60px] mt-[30px] font-bold font- bg-white rounded-full"
      >
        {!loading ? "Finally Create Your Assistant" : "Loading"}
      </button>}

    </div>
  );
}

export default Customize2;
