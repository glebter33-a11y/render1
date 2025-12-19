const express = require('express');
const app = express();

 Раздаем файлы
app.use(express.static(__dirname));

 Игроки
let players = {};

 WebSocket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) = {
     Новый игрок
    players[socket.id] = { 
        id socket.id, 
        x Math.random()  400, 
        y Math.random()  300,
        color ['red','blue','green','yellow'][Math.floor(Math.random()4)]
    };
    
     Отправляем всех игроков
    socket.emit('players', players);
    socket.broadcast.emit('newPlayer', players[socket.id]);
    
     Движение
    socket.on('move', (data) = {
        players[socket.id] = { ...players[socket.id], ...data };
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });
    // Стрельба
socket.on('shoot', (data) => {
    socket.broadcast.emit('bullet', {
        id: socket.id,
        x: data.x,
        y: data.y,
        dir: data.dir
    });
});
     Отключение
    socket.on('disconnect', () = {
        delete players[socket.id];
        io.emit('playerLeft', socket.id);
    });
});

 Запуск
server.listen(process.env.PORT  3000, () = {
    console.log('🎮 Игра запущена!');

});
