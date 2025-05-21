const axios = require("axios");

const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const ADZUNA_APP_ID = process.env.ADZUNA_APP_ID; 

exports.getJobs = async (query, location) => {
  try {
    const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}&what=${query}&where=${location}`;
    
    const response = await axios.get(url);
    return response.data
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
  }
};


