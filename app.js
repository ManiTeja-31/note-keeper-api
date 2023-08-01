// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 4000;

const URL='mongodb+srv://rayuduforever:rayuduforever@cluster0.s8ohfr9.mongodb.net/?retryWrites=true&w=majority';

// Middleware
app.use(cors());
app.use(express.json());

const connectToDb = async() =>{
  try{
      await mongoose.connect(URL,{
          useNewUrlParser:true,
          useUnifiedTopology:true
      });
      console.log("connected to MongoDb");
  }
  catch(error){
      console.log(error);
      process.exit(1);
  }
}

connectToDb();
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
