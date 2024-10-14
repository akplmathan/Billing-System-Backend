const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const port = 4000;

const cors =  require('cors');

connectDB();


app.use(express.json());
app.use(cors())
app.use('/user',userRoute)
app.use('/product',productRoute)
app.get("/", (req, res) => {
  res.send(`Server is Working`);
});

app.listen(port, () => {
  console.log(`Server is up and Run with http://localhost:${port}`);
}); 
