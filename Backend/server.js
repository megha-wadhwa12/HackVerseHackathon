const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app=express()
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello Users, We are Web Wizards')
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
