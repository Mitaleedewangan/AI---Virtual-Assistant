// import axios from "axios";

// const geminiResponse = async (userPrompt, assistantName, userName) => {
//     try {
//         const apiUrl = process.env.GEMINI_API_URL;

//         const systemPrompt = `
// You are a virtual assistant named "${assistantName}" created by "${userName}".

// You are not Google. You behave like a smart voice-enabled AI assistant.

// Your task:
// Understand the user's natural language input and respond ONLY in JSON format.

// Response format:
// {
//   "type": "general" | "google_search" | "youtube_search" | "youtube_play" | 
//           "get_time" | "get_date" | "get_day" | "get_month" | 
//           "calculator_open" | "instagram_open" | "facebook_open" | "weather_show",

//   "userinput": "<original user input (remove assistant name if present)>",

//   "response": "<short voice-friendly reply>"
// }

// Instructions:
// - Always return valid JSON
// - Keep response short
// - Detect intent correctly
// `;

//         const finalPrompt = systemPrompt + "\nUser: " + userPrompt;

//         const result = await axios.post(apiUrl, {
//             contents: [
//                 {
//                     parts: [{ text: finalPrompt }]
//                 },
//                 {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   }
//             ]
//         });

//         return result.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//     } catch (error) {
//         console.log(error.response?.data || error.message);
//     }
// };

// export default geminiResponse;


// import axios from "axios";

// const geminiResponse = async (userPrompt, assistantName, userName) => {
//     try {
//         const apiKey = process.env.GEMINI_API_KEY;

//        const apiUrl ="https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent" 

//         const systemPrompt = `
// You are a virtual assistant named "${assistantName}" created by "${userName}".
// Reply ONLY in JSON format.
// `;

//         const finalPrompt = systemPrompt + "\nUser: " + userPrompt;

//         const result = await axios.post(
//             apiUrl,
//             {
//                 contents: [
//                     {
//                         parts: [{ text: finalPrompt }]
//                     }
//                 ]
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "x-goog-api-key": apiKey   // 👈 YAHAN API KEY ADD HUI
//                 }
//             }
//         );

//         const text = result.data?.candidates?.[0]?.content?.parts?.[0]?.text;

//         try {
//             return JSON.parse(text);
//         } catch {
//             return text;
//         }

//     } catch (error) {
//         console.log("ERROR:", error.response?.data || error.message);
//     }
// };

// export default geminiResponse;

import axios from "axios";

const geminiResponse = async (userPrompt,userName, assistantName ) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

 const systemPrompt = `
You are a smart voice assistant named "${assistantName}" created by "${userName}".

You MUST return ONLY valid JSON in this exact format:

{
  "type": "general | google_search | youtube_search | youtube_play | get_time | get_date | get_day | get_month | calculator_open | instagram_open | facebook_open | weather_show",
  "userInput": "",
  "response": ""
}

Rules:
- Do NOT add extra fields (no name, creator, status)
- Do NOT return text outside JSON
- Keep response short and natural
- Detect intent correctly

Examples:

User: open youtube
Output:
{
  "type": "youtube_search",
  "userInput": "youtube",
  "response": "Opening YouTube"
}

User: play song on youtube
Output:
{
  "type": "youtube_play",
  "userInput": "song",
  "response": "Playing on YouTube"
}
`;

        const finalPrompt = systemPrompt + "\nUser: " + userPrompt;

        console.log("🟡 FINAL PROMPT:", finalPrompt);   // ✅ 1

        const result = await axios.post(
            apiUrl,
            {
                contents: [
                    {
                        parts: [{ text: finalPrompt }]
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                }
            }
        );

        // ✅ 2 FULL RESPONSE
        console.log("🟢 FULL GEMINI RESPONSE:", JSON.stringify(result.data, null, 2));

        const text = result.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        // ✅ 3 RAW TEXT
        console.log("🔵 RAW TEXT FROM GEMINI:", text);

        try {
            const parsed = JSON.parse(text);

            // ✅ 4 PARSED JSON
            console.log("🟣 PARSED JSON:", parsed);

            return parsed;

        } catch (err) {
            console.log("❌ JSON PARSE FAILED");
            return text;
        }

    } catch (error) {
        console.log("🔴 GEMINI ERROR:", error.response?.data || error.message);

        return null;
    }   
};

export default geminiResponse;