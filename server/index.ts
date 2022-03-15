import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
  
const PORT = 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "*"
    }
});

interface User{
  username: string
  socketId: string
}

const users: User[] = []

const handleNewUser = (username: string, socketId: string) => {
  const userIndex = users.findIndex(u => u.username === username);
  if(userIndex >= 0){
    users[userIndex].socketId = socketId;
    return;
  }
  users.push({
    username,
    socketId
  });
}

const removeUserBySocketId = (socketId: string) => {
  const userIndex = users.findIndex(u => u.socketId === socketId);
  users.splice(userIndex,1);
}

const removeUserByUsername = (username: string) => {
  const userIndex = users.findIndex(u => u.username === username);
  if(userIndex >= 0) users.splice(userIndex,1);
}

const handlePushNotifi = (usernameToPush: string, socket: any) => {
  const user = users.find(u => u.username === usernameToPush);
  if(!user) return;
  
  socket.to(user.socketId).emit('force_getNotifi')
}

io.on('connection', (socket) => {
  console.log('An user connected');
  
  socket.on('new_user', (username) =>  handleNewUser(username, socket.id))

  socket.on('push_notifications', (usernameToPush: string) => handlePushNotifi(usernameToPush, socket))

  socket.on('user_leave', (username) => {
    removeUserByUsername(username);
  })

  io.on('disconnect', (s) => {
    removeUserBySocketId(socket.id)
    console.log(users);
    console.log('An user has been disconnected');
  })
})

server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);   
})