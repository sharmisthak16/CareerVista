require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db/db');
const userRoute = require('./routes/userRoutes')
const uploadRoute = require('./routes/uploadRoute');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  

const allowedOrigins = process.env.FRONTEND_URL;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    optionsSuccessStatus: 200 
};
app.use(cors({
    origin: {}
}))
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT;
connectDB();

app.use('/api', userRoute)
app.use('/api/service',  uploadRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})