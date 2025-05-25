import AIchat from "../models/AIchat.js";
import fetch from "node-fetch";
import { getUserSummary } from "./Summary.js";

export const createAIchat = async (req, res) => {
  const { userContent, messageId } = req.body;
  const userSummary = await getUserSummary(messageId);
  console.log(userSummary?.[0]?.summary, "This is User Summary");
  if (!userContent)
    return res.status(400).json({ error: "No content provided." });
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA_rt8FpxClDON9YhcGe_UAz5cLmOHfig8`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `This is the summary ${userSummary?.[0]?.summary}   of currently going on chat , you have to refer this for getting context of whatever user queries are there , whatever will be the user queries u have to respond to it in 2-3 lines 
User Query : ${userContent}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Gemini API error");
    }

    const data = await response.json();
    console.log(data, "data of AI chat");
    res.json({
      reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "",
    });
    const saveAIchat = new AIchat({
      messageId: messageId,
      aiContent: data.candidates?.[0]?.content?.parts?.[0]?.text || "",
      userContent: userContent,
    });
    try {
      await saveAIchat.save();
      res.status(200).json({ message: "AI Chat  Added Sucessfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `${error}` });
    }
    // return {
    //   messageId: messageId,
    //   aiContent: data.candidates?.[0]?.content?.parts?.[0]?.text || "",
    //   userContent: userContent,
    // };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to generate summary");
  }
};

export const getAIChat = async (req, res) => {
  try {
    const chats = await AIchat.find();
    res.status(200).json({ chats });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};
