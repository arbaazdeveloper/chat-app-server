const express = require('express');
const http = require('http');
const loader = require('./loaders/index')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const socketIO = require('socket.io')
const routes = require('./routes/index');
const initializeSocket = require('./controllers/socket/send-message');
loader(app)
app.use(express.json());

app.use(routes);
const io = socketIO(server,{cors:{origin:'*'}});
initializeSocket(server, io);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});