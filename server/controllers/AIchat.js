import AIchat from "../models/AIchat.js";
import fetch from "node-fetch";

export const createAIchat = async (req, res) => {
  const { userContent, messageId } = req.body;
  if (!userContent)
    return res.status(400).json({ error: "No content provided." });
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyACI9UkasdbCLJ9Nz-yt1N4J0OQ1PkbOwY`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `only important short answer in 2-3 lines ${userContent}`,
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

