const User = require('../../models/User')
const socketio = require('socket.io');

const initializeSocket = (server, io) => {
    //   const io = socketio(server);
    const socketToUser = {};
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('sample', (data) => {

        });


        // socket.on("disconnect", () => {
        //     socket.broadcast.emit("callEnded")
        // })

        socket.on("callUser", (data) => {
            io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
        })

        socket.on("answerCall", (data) => {
            io.to(data.to).emit("callAccepted", data.signal)
        })


        socket.on('joinRoom', ({ senderId, recipientId }) => {
            const roomName = [senderId, recipientId].sort().join('-');
            socket.join(roomName);
            socket.to(roomName).emit("me", socket.id)


        });
        socket.on('idexchange', ({ id, senderId, recipientId }) => {
            const roomName = [senderId, recipientId].sort().join('-');
            io.to(roomName).emit('getid', { id });
        })
        socket.on('sendFile', ({ file, senderId, recipientId, messageType }) => {
            
            const roomName = [senderId, recipientId].sort().join('-');
            io.to(roomName).emit('receiveFile', { messageType, senderId, file });

        })

        socket.on('sendMessage', async ({ messageType, senderId, recipientId, text }) => {
            try {

                // const areFriends = await User.exists({
                //   _id: senderId,
                //   friends: recipientId
                // });

                // if (!areFriends) {
                //   return io.to(socket.id).emit('errorMessage', 'You can only send messages to friends.');
                // }

                const roomName = [senderId, recipientId].sort().join('-');
                io.to(roomName).emit('receiveMessage', { messageType, senderId, text });



            } catch (error) {
                console.error(error);
                io.to(socket.id).emit('errorMessage', 'Error sending the message.');
            }
        });


        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
            const callerId = socketToUser[socket.id];
            if (callerId) {
                io.to(callerId).emit('userDisconnected', { disconnectedUserId: socket.id });
                delete socketToUser[socket.id];
                delete socketToUser[callerId];
            }
        });
    });

    return io;
};

module.exports = initializeSocket;
