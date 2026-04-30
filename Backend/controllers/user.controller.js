import { response } from "express"
import geminiResponse from "../gemini.js"
import User from "../models/user.model.js"
import moment from "moment/moment.js"
export const getCurrentuser = async(req,res)=>{
    try{
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user  not found"})
        }

        return res.status(200).json(user)
    }
    catch(error){
        console.log(error);
    }
}

export const updateAssistant = async(req, res) =>{
    try{
        const {assistantName , imageUrl} = req.body
        let assistantImage;
        
        if(req.file)
            {
                assistantImage= await uploadOnCloudinary(req.file.path)
            }
            else{
                assistantImage = imageUrl
            }

            const user = await User.findByIdAndUpdate(req.userId,{
                assistantName , assistantImage
            },{new:true}).select("-password")
            return res.status(200).json(user)
        
    } catch(error){
        return res.status(400).json({message:"update Assistant  error"})
    }
}

// export const askToAssistant = async(req,res) =>{
//     try{
//         const {command} = req.body
//         const user = await User.findById(req.userId);
//         const userName = user.name;
//         const assistantName = user.assistantName;
//        const result = await geminiResponse(command,userName,assistantName)

//        const jsonMatch = result.match(/{[\s\S]*}/)
//        if(!jsonMatch){
//         return res.status(400).json({response:"sorry, i can't  understand"})
//        }
//        const gemResult = JSON.parse(jsonMatch[0])

//        const {type} =gemResult.type

//        switch(type){
//         case 'get-date' :
//             return res.json({
//                 type,
//                 userInput:gemResult.userinput,
//                 response:`current date is ${moment().format("YYYY-MM-DD")}`
//             });
            
//             case 'get-time':
//                 return res.json({
//                     type,
//                     userInput:gemResult.userinput,
//                     response:`current time is ${moment().format("HH:mm:ss")}`
//                 });

//             case 'get-day':
//                 return res.json({
//                     type,
//                     userInput:gemResult.userinput,
//                     response:`today day is ${moment().format("dddd")}`
//                 });

//             case 'get-month':
//                     return res.json({
//                         type,
//                         userInput:gemResult.userinput,
//                         response:`current month is ${moment().format("MMMM")}`
//                     });
            
//             case 'youtube_search':
//             case 'youtube_play':
//             case 'instagram_open':
//             case 'facebook_open':
//             case 'calculator_open':
//             case 'weather_show':
//             case 'google_search':
//             case 'general':
//                 return res.json({
//                     type,
//                     userInput:gemResult.userinput,
//                     response:gemResult.response
//                 });
            
//            default:
//             return res.status(400).json({response:"sorry, i can't  understand"})
//        }
//     }
//     catch(error){
//         console.log(error);
//         return res.status(400).json({response:"sorry, i can't  understand"})

//     }
// }

// export const askToAssistant = async(req,res) =>{
//     try{
//         const {command} = req.body
//         const user = await User.findById(req.userId);

//         const result = await geminiResponse(command,user.name,user.assistantName)

//         console.log("Gemini Result:", result);

//         const gemResult = result
//         console.log("STEP 3 - Parsed:", gemResult);

//         const { type } = gemResult
//         console.log("STEP 4 - Type:", type);

//         switch(type){
//             case 'get-date':
//                 return res.json({
//                     type,
//                     userInput:gemResult.userinput,
//                     response:`current date is ${moment().format("YYYY-MM-DD")}`
//                 });

//             case 'general':
//                 return res.json({
//                     type,
//                     userInput:gemResult.userinput,
//                     response:gemResult.response
//                 });

//             default:
//                 return res.status(400).json({response:"sorry, i can't understand"})
//         }

//     } catch(error){
//         console.log(error);
//         return res.status(400).json({response:"error in assistant"})
//     }
// }

// export const askToAssistant = async (req, res) => {
//     try {
//         const { command } = req.body;

//         const user = await User.findById(req.userId);

//         const result = await geminiResponse(
//             command,
//             user.name,
//             user.assistantName
//         );

//         console.log("Gemini Result:", result);

//         const gemResult = result;
//         console.log("STEP 3 - Parsed:", gemResult);

//         // ✅ FIX: default type
//         const type = gemResult?.type || "general";
//         console.log("STEP 4 - Type:", type);

//         switch (type) {
//             case "get-date":
//                 return res.json({
//                     type,
//                     userInput: gemResult.userInput || command,
//                     response: `current date is ${moment().format("YYYY-MM-DD")}`,
//                 });

//             case "general":
//             case "youtube_play":
//             case "calculator_open":
//             case "instafram_open":
//             case "facebook_open":
//             case "weather_show":  
//             case "google_serach":
//             case 'youtube_serach':
//                 return res.json({
//                     type,
//                     userInput: gemResult.userInput || command,
//                     response:
//                         gemResult.response ,
                        
//                 });

//                 default :
//                 return res.status(400).json({response: " I didn't  understand that command"})
//         }

//     } catch (error) {
//         console.log("❌ ERROR:", error);

//         // ❗ IMPORTANT: 400 mat bhejo
//         return res.status(200).json({
//             type,
//             response: "Something went wrong",
//         });
//     }
// };

export const askToAssistant = async (req, res) => {
  try {
      console.log("BODY:", req.body);
    const { command } = req.body;



    if (!command) {
      return res.json({
        type: "general",
        response: "No command received",
      });
    }

    const text = command.toLowerCase();

    // ✅ FALLBACK (AI fail ho tab bhi kaam kare)
    if (text.includes("youtube")) {
      return res.json({
        type: "youtube_search",
        userInput: command,
        response: "Opening YouTube",
      });
    }

    if (text.includes("whatsapp")) {
      return res.json({
        type: "whatsapp_open",
        userInput: command,
        response: "Opening WhatsApp",
      });
    }

    const user = await User.findById(req.userId);
    user.history.push(command);
    user.save();

    const result = await geminiResponse(
      command,
      user.name,
      user.assistantName
    );

    console.log("Gemini Result:", result);

    // 🛑 IMPORTANT: undefined handle
    if (!result) {
      return res.json({
        type: "general",
        userInput: command,
        response: "AI limit exceed ho gayi hai, please baad me try karo",
      });
    }

    const gemResult = result;

    const type = gemResult?.type || "general";

    console.log("STEP 4 - Type:", type);

    return res.json({
      type,
      userInput: gemResult?.userInput || command,
      response:
        gemResult?.response ||
        "Sorry, I couldn't understand that.",
    });
    

  } catch (error) {
    console.log("❌ ERROR:", error);

    return res.json({
      type: "general",
      response: "Something went wrong",
    });
  }
};