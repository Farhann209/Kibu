const express = require('express')

const app = express()
const port = 4000
//Query
// let roomNum = [
//   'F1','S1','S2','T1','T2',
// ]
// app.get('/guests', (req, res) => {
//   const selectRoom = roomNum.filter((item)=>{
//     if(item[0] === req.query.startswith) return item
//   })
//   res.send(selectRoom)
// })

let checkins = [
  {room: 'F1', name: 'Aron', nights: 3},
  {room: 'T2', name: 'Jenny', nights: 10},
  {room: 'S3', name: 'Jakub', nights: 4},
  {room: 'S1', name: 'Yui', nights: 30},
  {room: 'S4', name: 'Mike', nights: 5}
]
//params
app.get('/guests/:room', (req, res) => {
  const selectRoom = checkins.find((item)=>{
    if(item.room === req.params.room) return item
  })
  res.send(selectRoom)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
