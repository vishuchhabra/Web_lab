const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')
//importing the model
const cors = require('cors')

//body parser

app.use(cors())
app.use(bodyParser.urlencoded({extended:true})); 

//model for database
const user = mongoose.model('User',{ 
    firstName: {
        type:String,
        required :true
    },
    lastName:{
        type:String,
        required:true
    }

})

app.post('/user', async(req, res) => {
   
    const val = new user({
        firstName:req.body.firstName,
        lastName: req.body.lastName
    })

    val.save((err, data)=>{
        if(err){
            return res.send("Failed to Create User")
        }
        return res.send("Successfully Created user")
    })
})

//connect DB
mongoose.connect('mongodb://localhost:27017/geeks',
{ useNewUrlParser: true,useUnifiedTopology: true},(err, data)=>{
    if(err){
     console.log("There is an error")
    }
    else{
        console.log("DB connecting successfully")
    }
})

//connecting the server
const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port${port}`)
})