import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { extractTextFromPdf } from "../controllers/pdf.js";
import { generateSummary, getSummary } from "../controllers/Summary.js";

const summaryRouter = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files are allowed."));
  },
});

// Route
summaryRouter.post("/pdf", upload.single("pdf"), async (req, res) => {
  const filePath = req.file?.path;
  if (!filePath)
    return res.status(400).json({ error: "No PDF file provided." });

  try {
    const extractedText = await extractTextFromPdf(filePath);

    if (!extractedText.trim()) {
      return res.status(400).json({ error: "PDF contains no readable text." });
    }

    const summary = await generateSummary(extractedText);
    res.json({ summary, extractedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Server error." });
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
});

summaryRouter.post("/", generateSummary);
summaryRouter.get("/:messageId", getSummary);
export default summaryRouter;
