const axios = require("axios");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.geminiCreate = async (filePath) => {
  try {
    let extractedText = "";

    if (filePath.endsWith(".pdf")) {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      extractedText = pdfData.text;
    } else if (filePath.endsWith(".docx")) {
      const docBuffer = fs.readFileSync(filePath);
      const docData = await mammoth.extractRawText({ buffer: docBuffer });
      extractedText = docData.value;
    } else {
      throw new Error("Unsupported file format");
    }

    const prompt = `
Extract the following details from the given resume:

1. **Skills** (List all technical and soft skills mentioned).
2. **Job Preferences**: Identify the desired roles, industries, or locations mentioned. 
   - If job preferences are **not explicitly mentioned**, infer suitable job roles based on the extracted skills.

Ensure the extracted details are formatted as follows:
- **Skills:** (comma-separated list)
- **Job Preferences:** (specific roles, industries, or inferred suggestions)

Resume Content:
${extractedText}
`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    return aiResponse;
  } catch (error) {
    console.error("Error processing resume:", error);
    throw new Error("Failed to extract resume data");
  }
};
