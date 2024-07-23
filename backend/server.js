const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const contactRoutes = require('./routes/contactRoutes')

dotenv.config();
connectDB(); 

const app = express () ;

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000 

app.listen(5000,console.log(`server is running on port ${PORT}`));