const express = require('express')
const path = require('path')
const dbConnect = require('./src/db/connection')

const adminRoute = require('./src/routes/admin')
const guestBookingsRoute = require('./src/routes/guestBookings')
const listingRoute = require('./src/routes/listing')
const listingImageRoute = require('./src/routes/listingImage')



const cors = require('cors');

dbConnect()
const app = express()

app.use(cors())
require('dotenv').config()

app.use(express.json())

app.use(adminRoute)
app.use(guestBookingsRoute)
app.use(listingRoute)
app.use(listingImageRoute)


const port = process.env.PORT


app.use('/listing-image', express.static(path.join(__dirname, 'uploads/listings')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

