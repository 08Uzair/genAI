import fs from "fs";
import pdfParse from "pdf-parser"

export const extractTextFromPdf = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const extracted = await pdfParse(dataBuffer);
    return extracted.text;
  } catch (error) {
    throw new Error("Failed to extract text from PDF");
  }
};
