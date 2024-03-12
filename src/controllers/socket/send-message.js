const User=require('../../models/User')
const socketio = require('socket.io');

const initializeSocket = (server,io) => {
//   const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('sample',(data)=>{
        console.log("Sample event received",data);
    })

    socket.on('sendMessage', async ({ messageType, senderId, recipientId, text }) => {
      try {
     
        const areFriends = await User.exists({
          _id: senderId,
          friends: recipientId
        });

        if (!areFriends) {
          return io.to(socket.id).emit('errorMessage', 'You can only send messages to friends.');
        }

        io.to(recipientId).emit('receiveMessage', { messageType, senderId, text });
      } catch (error) {
        console.error(error);
        io.to(socket.id).emit('errorMessage', 'Error sending the message.');
      }
    });


    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
