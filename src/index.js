const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 4000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket  ) => {
    console.log('New WebSocket connection') 
    socket.emit('message', 'welcome') // New connection established
    socket.broadcast.emit('message', 'User joined')

    // receiving user_message from client side into server side
  socket.on("sendMessage", (user_message) => {
    // sending to all client including user
    io.emit("message", (user_message));
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User left')
    })

})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})