import fetch from "node-fetch";
import Summary from "../models/Summary.js";
import AIchat from "../models/AIchat.js";
export const generateSummary = async (req, res) => {
  const { summary, messageId } = req.body;

  try {
    // Call Gemini API to generate the summary
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
                  text: `Summarize the given text in at most 10 bullet points: ${summary}`,
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
    const generatedSummary =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated.";

    // Check if a summary for this messageId already exists
    const existingSummary = await Summary.findOne({ messageId });

    if (existingSummary) {
      // Update the existing summary
      existingSummary.summary = generatedSummary;
      await existingSummary.save();
      res.status(200).json({ message: "Summary updated successfully" });
    } else {
      // Create a new summary
      const newSummary = new Summary({
        messageId,
        summary: generatedSummary,
      });
      await newSummary.save();
      res.status(200).json({ message: "Summary added successfully" });
    }
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ message: "Failed to generate summary" });
  }
};

export const getSummary = async (req, res) => {
  const { messageId } = req.params;
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });
    if (messageId) {
      const filteredSummaries = summaries.filter(
        (summary) => summary.messageId === messageId
      );
      return res.status(200).json(filteredSummaries || []);
    }
    // res.status(200).json({ summaries });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

export const getUserSummary = async (messageId) => {
  try {
    const summaries = await Summary.find().sort({ createdAt: -1 });
    if (messageId) {
      const filteredSummaries = summaries.filter(
        (summary) => summary.messageId === messageId
      );
      return filteredSummaries;
    }
  } catch (error) {
    console.log(error);
  }
};
