'use strict'

// const app = require('express')()
// const http = require('http').Server(app)
// const io = require('socket.io')(http)
// const cors = require('cors')

var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

// localhost:3000/
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (chat) {
  chat.on('disconnect', () => {
    console.log('user disconnected')
  })

  chat.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })

  chat.broadcast.emit('hi')

  chat.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

server.listen(3001, function () {
  console.log('listening on port 3001')
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })
//
// io.on('connection', (socket) => {
//
//   console.log('a user connected')
//
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
//
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg)
//   })
//
//   socket.broadcast.emit('hi')
//
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg)
//   })
// })
//
// http.listen(3000, () => {
//   console.log('listening on *:3000')
// })
