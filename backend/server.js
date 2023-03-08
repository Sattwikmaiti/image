const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const mongoUrl =
  "mongodb+srv://maitisattwik:Sattwik%402002@cluster0images.k7uxezm.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));




const Images =require('./imageSchema');

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" })

  } catch (error) {
    console.log("eerr")
    res.send({ 
      Status: "error", data: error });

  }
})

app.get("/get-image", async (req, res) => {
  try {
    await Images.find({}).then(data => {
      res.send({ status: "ok", data: data })
    })

  } catch (error) {

  }
})


app.listen(3000,()=>{console.log("serer started in port 3000")})