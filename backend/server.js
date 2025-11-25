require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('./passport');

const app = express();


app.use(cors());
app.use(express.json());
app.use(passport.initialize());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.log(" MongoDB Connection Error:", err));


app.use('/api/auth', require('./routes/auth'));


app.use('/', require('./routes/social'));


app.use('/api/ai', require('./routes/ai'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));