require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

// Import Passport Config
require('./passport');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());


app.use('/api/auth', require('./routes/auth'));
app.use('/', require('./routes/social'));
app.use('/api/ai', require('./routes/ai'));
app.use('/api/diagramss', require('./routes/diagrams'));

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB Connected Successfully");
    

    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
    
  } catch (err) {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); 
  }
};

connectDB();