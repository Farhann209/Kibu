const express = require('express')
const dbConnect = require('./src/db/connection')
dbConnect()
//using blowfish algorithm for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const cors = require('cors')


const app = express()
require('dotenv').config()
app.use(cors())
//body parser
app.use(express.json())
const mongoose = require("mongoose")

const { Schema } = mongoose;

const roomSchema = new Schema({
  roomID: String,
  guestFullName: String,
  date: String,
  numberOfNights: Number,
  numberOfGuests: Number,
  email: String,
  password: String,
  role:{
    type: String,
    enum: ['host', 'user'],
    default: ['user']
  }
});

const bookingSchema = new Schema({
  date: Object,
  guestName: String,
  pax: Number,
  email: String,
 
})
const Room = mongoose.model('Room', roomSchema);
const bookingDetails = mongoose.model('bookingDetails', bookingSchema)

const port = process.env.PORT 

// app.get('/rooms', (req, res) => {
//   res.send(['F1', 'S1', 'S2', 'S3', 'S4'])
// })\

app.post('/bookingDetails', async(req, res) => {
  bookingDetails.create(req.body)
  if(bookingDetails){
    const token = jwt.sign({ guestName: req.body.guestName }, process.env.SECRET_KEY);
    res.json({msg: 'Dear '+ req.body.guestName + ', thankyou for booking with Kibu. Your booking is confirmed.'}, token, bookingDetails )
  }
  else{
    res.json({msg: 'Booking Failed'})
  }

})

app.get('/bookingDetails', async(req, res)=>{
  const details = await bookingDetails.find()
  res.send(details)
})


app.post('/register', async(req, res) => {
  const hashPassword = await bcrypt.hash(req.body?.password, saltRounds)
  req.body.password = hashPassword //you can use this for credit card info
  // const userNameExist = await Room.exists({guestFullName: req.body.guestFullName})
  const userEmailExist = await Room.exists({email: req.body.email})

  // if(userNameExist){
  //   return res.status(409).json({msg: "Guest name is already registered."})}
if(userEmailExist){
    return res.status(400).json({msg: "Email is already registered."})
  }
    await Room.create(req.body)
  return res.json({msg: "Guest registered"})

  
  
})

app.post('/login', async(req, res)=>{
  console.log(req.body)
  const room = await Room.findOne({email: req.body.email})
  if(room){
    //bcrypt is used from jsonwebtoken
    const isMatched = await bcrypt.compare(req.body.password, room.password);
    if(isMatched){
      //jwt used to provide secret key
      var token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
      res.json({msg: "Authorized", token, room})
    }else{
      res.status(401).json({msg: "Invalid password"})
    }
  }else{
    res.status(401).json({msg: "Email is not registered."})
  }
})
// app.post('/register', async(req, res) => {
//   console.log(req.body.guestFullName) //to get one particular data
//   await Room.create(req.body)
//   res.send('booking details entered')
// })

// app.get('/register', async (req, res) => {
//   const data = await Room.find()
//   res.send(data)
// })

app.get('/users',async(req,res)=>{
  const data = await Room.find()
  res.json(data)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

