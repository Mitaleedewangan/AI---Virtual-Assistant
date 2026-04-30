import React from "react";
import { createContext } from "react";
import axios from "axios";
import { useEffect ,useState } from "react";




export const userDataContext = createContext()
  
   


function UserContext ({children}){
    // const serverUrl = "http://localhost:5000"
    const serverUrl = import.meta.env.VITE_API_URL
    const[userData , setUserData] = useState(null)
     const [frontedImage,setFrontedImage] = useState(null);
    const[backendImage , setBackendImage] = useState(null);
    const[selectedImage , setSelectedImage] = useState(null);

    const handleCurrentUser = async ()=>{

        try{
            const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})
            setUserData(result.data)
            console.log(result.data);
        }
        catch(error){
            console.log(error);
        }


    }

    const getGeminiResponse = async (command)=>{
        try{
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{command},{withCredentials:true})
            console.log(result.data);
            return result.data
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        handleCurrentUser()
    },[])

    const value ={
        serverUrl ,userData , setUserData ,backendImage , setBackendImage ,frontedImage,setFrontedImage ,selectedImage , setSelectedImage , getGeminiResponse
    }
    return (
        <div>
            <userDataContext.Provider value={value}>
                      {children}
            </userDataContext.Provider>
     
        </div>
    )
}

export default UserContext;