const  Resume  = require("../models/Resume");
const { getJobs } = require("../utils/adzonaAPI");
const { geminiCreate } = require("../utils/geminiAI");

exports.upload = async (req, res) => {
  try {
    const userId = req.user;
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Invalid file format. Only PDF and DOCX allowed." });
    }
    const aiResponse = await geminiCreate(req.file.path);

    const skillsMatch = aiResponse.match(/\*\*Skills:\*\*\s*([\s\S]*?)\n\n/);
    const jobPreferencesMatch = aiResponse.match(/\*\*Job Preferences:\*\*\s*([\s\S]*)/);

    const skills = skillsMatch ? skillsMatch[1].split(",").map(skill => skill.trim()) : [];
    const jobPreferences = jobPreferencesMatch ? jobPreferencesMatch[1].trim() : "Not Mentioned";
    

    const resumeData = new Resume({
      userId,
      filename: req.file.filename,
      skills,
      jobPreferences,
    });

    await resumeData.save();

    res.status(200).json({
      message: "File uploaded successfully!",
      filename: req.file.filename,
      skills: skills,
      jobPreferences: jobPreferences
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the file." });
  }
};

// This should be part of your uploadsController.js file
exports.jobList = async(req, res) => {
  try {
    const userId = req.user;
    const resume = await Resume.findOne({ userId }).sort({ createdAt: -1 });
    
    if (!resume) {
      return res.status(404).json({ error: "No resume found. Please upload your resume first." });
    }
    
    const jobTitleRegex = /^[^,;]+/;
    const jobRole = resume.jobPreferences.match(jobTitleRegex)?.[0] || "No job preference listed";
    
    const location = "India";
    const jobs = await getJobs(jobRole, location);
    
    if (!jobs || !jobs.results) {
      return res.status(200).json({ jobs: { results: [] } });
    }
    
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Error fetching job list:", error);
    res.status(500).json({ error: "An error occurred while fetching job list." });
  }
};
