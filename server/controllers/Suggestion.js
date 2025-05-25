import Suggestion from "../models/Suggestion.js";
import fetch from "node-fetch";

export const createSuggestion = async (req, res) => {
  const { messageId ,suggestion } = req.body;

 

  if (!suggestion || !messageId)
    return res.status(400).json({ error: "No message provided." });

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
                  text: `This is the chat between two person and u have to provide 3  suggestions of 9-10 words what to tell next to the reciver, no extra text other than this must be present in the response ${suggestion}`,
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
    const generatedSuggestion =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No suggestion generated.";

    // Send the generated suggestion in response
    res.json({ reply: generatedSuggestion });

    // Check if suggestion for this messageId exists
    const existingSuggestion = await Suggestion.findOne({ messageId });

    if (existingSuggestion) {
      // Update existing suggestion
      existingSuggestion.suggestion = generatedSuggestion;
      await existingSuggestion.save();
      console.log("Suggestion updated successfully");
    } else {
      // Create new suggestion
      const newSuggestion = new Suggestion({
        messageId,
        suggestion: generatedSuggestion,
      });
      await newSuggestion.save();
      console.log("Suggestion added successfully");
    }
  } catch (error) {
    console.error("Error generating suggestion:", error);
    res.status(500).json({ message: "Failed to generate suggestion" });
  }
};

export const getSuggestion = async (req, res) => {
  const { messageId } = req.params;

  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 });
    if (messageId) {
      const filteredSuggestions = suggestions.filter(
        (suggestion) => suggestion.messageId === messageId
      );
      return res.status(200).json(filteredSuggestions || []);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};
