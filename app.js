'use strict'

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

  chat.broadcast.emit('hi')

  chat.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

server.listen(3001, function () {
  console.log('listening on port 3001')
})
