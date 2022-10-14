require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

app.use('/imgsSaves', express.static(path.join(__dirname, 'imgsSaves')));

// Set JSON and Form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors for frontend
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

// Connect DB
require('./db/db.js')

// Models
const User = require('./models/User.js');
const Publi = require('./models/Publi.js');

// Routes
const router = require('./routes/Router');
app.use(router);

const PORT = process.env.PORT;

// Listen app
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}...`)
})
