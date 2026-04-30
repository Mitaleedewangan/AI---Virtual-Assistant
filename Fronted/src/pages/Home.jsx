

import React, { useEffect, useContext, useRef } from 'react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from '../assets/ai.gif';
import userImg from '../assets/user.gif';
import { useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);

  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const isProcessingRef = useRef(false);
  const[userText , setUserText] = useState("");
  const[aiText , setAiText] = useState("");
const isListeningRef = useRef(false);

  const handleLogOut = async () => {
    try {

      
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };


  const startListening = () => {
  const recognition = recognitionRef.current;
  if (!recognition || isListeningRef.current) return;

  try {
    recognition.start();
    isListeningRef.current = true;
  } catch (e) {
    console.log("Start error:", e.message);
  }
};

const stopListening = () => {
  const recognition = recognitionRef.current;
  if (!recognition || !isListeningRef.current) return;

  try {
    recognition.stop();
    isListeningRef.current = false;
  } catch (e) {
    console.log("Stop error:", e.message);
  }
};

  // ✅ FIXED SPEAK FUNCTION (NO LOOP)
  // const speak = (text) => {
  //   if (!text) return;

  //   window.speechSynthesis.cancel();

  //   const utterance = new SpeechSynthesisUtterance(text);

  //   // 🛑 mic band while speaking
  //   recognitionRef.current?.stop();

  //   utterance.onend = () => {
  //     // 🎤 resume listening
  //     recognitionRef.current?.start();
  //   };

  //   window.speechSynthesis.speak(utterance);
  // };

  const speak = (text) => {
  if (!text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // 🛑 stop mic before speaking
  stopListening();

  utterance.onend = () => {
    // ✅ restart safely after small delay
    setTimeout(() => {
      startListening();
    }, 500);
  };

  window.speechSynthesis.speak(utterance);
};

// const handleActions = (parsed) => {
//   const query = parsed.userInput || "";

//   switch (parsed.type) {
//     case "youtube_play":
//       window.location.href = `https://www.youtube.com/results?search_query=${query}`;
//       break;

//     case "youtube_search":
//       window.location.href = "https://www.youtube.com";
//       break;

//     case "google_search":
//       window.location.href = `https://www.google.com/search?q=${query}`;
//       break;

//     case "whatsapp_open":
//       window.location.href = "https://web.whatsapp.com";
//       break;

//     case "weather_show":
//       window.location.href = "https://www.google.com/search?q=weather today";
//       break;

//     case "calculator_open":
//       window.location.href = "https://www.google.com/search?q=calculator";
//       break;

//     default:
//       break;
//   }
// };

//   useEffect(() => {
//     if (!userData) return;

//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.log("❌ Speech Recognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.continuous = true;
//     recognition.lang = "hi-IN";

//     recognition.onstart = () => {
//   isListeningRef.current = true;
// };

// recognition.onend = () => {
//   isListeningRef.current = false;

//   // 🔁 auto restart
//   // setTimeout(() => {
//   //   startListening();
//   // }, 500);
// };

//     recognition.onresult = async (e) => {
//       // ✅ only final result
//       if (!e.results[e.results.length - 1].isFinal) return;

//       const transcript =
//         e.results[e.results.length - 1][0].transcript.trim();

//       console.log("🎤 heard:", transcript);

//       setAiText("");
//       setUserText(transcript);

//       if (isProcessingRef.current) return;
//       isProcessingRef.current = true;

//       try {
//         const data = await getGeminiResponse(transcript);

//         console.log("📦 RAW:", data);

//          let parsed;
//         try {
//           parsed = typeof data === "string" ? JSON.parse(data) : data;
//         } catch (err) {
//           console.log("❌ JSON parse error", err);
//           return;
//         }

//       setAiText(parsed.response); 
//         setUserText("");

       

       

//         console.log("🤖 AI:", parsed);

//         // 🔊 SPEAK
//         if (parsed?.response) {
//           speak(parsed.response);
//         }

//         // ✅ ACTION HANDLER
//   switch (parsed.type) {

//   case "youtube_search":
//     window.location.href = "https://www.youtube.com";
//     break;

//   case "youtube_play":
//     window.location.href =
//       `https://www.youtube.com/results?search_query=${parsed.userInput}`;
//     break;

//   case "google_search":
//     window.location.href =
//       `https://www.google.com/search?q=${parsed.userInput}`;
//     break;

//   case "instagram_open":
//     window.location.href = "https://www.instagram.com";
//     break;

//   case "facebook_open":
//     window.location.href = "https://www.facebook.com";
//     break;

//   case "calculator_open":
//     window.location.href =
//       "https://www.google.com/search?q=calculator";
//     break;

//   case "weather_show":
//     window.location.href =
//       "https://www.google.com/search?q=weather";
//     break;

//   case "whatsapp_open":
//     window.location.href = "https://web.whatsapp.com";
//     break;

//   default:
//     break;
// }

//       } catch (error) {
//         console.log("❌ API ERROR:", error);
//       }

//       setTimeout(() => {
//         isProcessingRef.current = false;
//       }, 2000);
//     };

//     startListening(); 

//     return () => {
//       recognition.stop();
//     };
//   }, [userData]);

const handleActions = (parsed) => {

  if (!parsed) return;

  const query = parsed?.userInput || "";

  switch (parsed?.type) {
    case "youtube_play":
      window.location.href =
        `https://www.youtube.com/results?search_query=${query}`;
      break;

    case "youtube_search":
      window.location.href = "https://www.youtube.com";
      break;

    case "google_search":
      window.location.href =
        `https://www.google.com/search?q=${query}`;
      break;

    case "whatsapp_open":
      window.location.href = "https://web.whatsapp.com";
      break;

    case "weather_show":
      window.location.href =
        "https://www.google.com/search?q=weather today";
      break;

    case "calculator_open":
      window.location.href =
        "https://www.google.com/search?q=calculator";
      break;

    default:
      break;
  }
};

useEffect(() => {
  if (!userData) return;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.log("❌ Speech Recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognitionRef.current = recognition;

  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = false;

  // ✅ mic state tracking
  recognition.onstart = () => {
    console.log("🎤 Mic started");
    isListeningRef.current = true;
  };

  recognition.onend = () => {
    console.log("🛑 Mic stopped");
    isListeningRef.current = false;

    // 🔁 ALWAYS restart (important)
    setTimeout(() => {
      startListening();
    }, 500);
  };

  recognition.onerror = (e) => {
    console.log("❌ Mic error:", e.error);

    // 🔁 restart after error
    setTimeout(() => {
      startListening();
    }, 1000);
  };

  recognition.onresult = async (e) => {
    if (!e.results[e.results.length - 1].isFinal) return;

    const transcript =
      e.results[e.results.length - 1][0].transcript.trim();

    console.log("🎤 heard:", transcript);

    setAiText("");
    setUserText(transcript);

    // 🛑 prevent spam
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

   try {
  const data = await getGeminiResponse(transcript);

  if (!data) {
    console.log("❌ No response from API");
    return;
  }

  let parsed;

  try {
    parsed = typeof data === "string"
      ? JSON.parse(data)
      : data;
  } catch (err) {
    console.log("❌ JSON parse error", err);
    return;
  }

  console.log("🤖 AI:", parsed);

  setUserText("");
  setAiText(parsed?.response || "Thinking...");

  if (parsed?.response) {
    speak(parsed.response);
  }

  handleActions(parsed);

} catch (error) {
  console.log("❌ API ERROR:", error);
}

    setTimeout(() => {
      isProcessingRef.current = false;
    }, 1500);
  };

  startListening();

  return () => {
    recognition.stop();
  };
}, [userData]);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col gap-[15px]">

      <IoIosMenu className="w-[25px] h-[25px]  lg:hidden  cursor-pointer absolute top-[20px] right-[20px]  text-white font-semibold " onClick={handleLogOut} />

        
          
   <div className="absolute top-0 w-full h-full bg-[#00000053] pointer-events-none">
          <RxCross1 className="w-[25px] h-[25px]  lg:hidden  cursor-pointer absolute top-[20px] right-[20px]  text-white font-semibold " onClick={handleLogOut} />
      
       <button
        className="min-w-[150px] h-[60px]  hidden lg:block cursor-pointer absolute top-[20px] right-[20px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]"
        onClick={handleLogOut}
      >
        Log Out
      </button>

      <button
        className="min-w-[150px] h-[60px] hidden lg:block cursor-pointer absolute top-[100px] right-[20px] mt-[30px] px-[20px] py-[10px] text-black font-semibold bg-white rounded-full text-[19px]"
        onClick={() => navigate("/customize")}
      >
        Customize Your Assistant
      </button>
         </div>
      
     

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src={userData?.assistantImage}
          alt=""
          className="h-full object-cover"
        />
      </div>

      <h1 className="text-white text-[18px] font-semibold">
        I'm {userData?.assistantName}
      </h1>
      {!aiText &&   <img src= {userImg} alt=""  className='w-[200px] '/>}
         {aiText &&   <img src= {aiImg} alt=""  className='w-[200px] '/>}
     
    <div className="flex flex-col gap-2 w-[80%]">
  {userText && (
    <div className="bg-blue-500 text-white p-3 rounded-xl self-end">
      {userText}
    </div>
  )}

  {aiText && (
    <div className="bg-gray-700 text-white p-3 rounded-xl self-start">
      {aiText}
    </div>
  )}
</div>

<div className="absolute bottom-10 flex items-center gap-2">
  <div
    className={`w-3 h-3 rounded-full ${
      isListeningRef.current ? "bg-green-500" : "bg-red-500"
    }`}
  />
  <span className="text-white text-sm">
    {isListeningRef.current ? "Listening..." : "Stopped"}
  </span>
</div>
  
    </div>
  );
}

export default Home;