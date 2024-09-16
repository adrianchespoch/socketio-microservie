const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

console.clear();

// Mapeo de usuarios conectados
let connectedUsers = {};

io.on('connection', socket => {
  console.log('Nuevo cliente conectado', socket.id);

  // Registrar el usuario con su userId
  socket.on('register', userId => {
    connectedUsers[userId] = socket.id;
    console.log(`Usuario ${userId} registrado con el socket ${socket.id}`);
  });

  // Escuchar nuevas notificaciones desde Django
  socket.on('nueva_notificacion_ventas', data => {
    const { destinatario_id, mensaje, tipo } = data;
    // console.log('Nueva notificación de ventas:', data);

    // Enviar la notificación solo al destinatario correcto
    if (connectedUsers[destinatario_id]) {
      io.to(connectedUsers[destinatario_id]).emit('recibir_notificacion', {
        mensaje,
        tipo,
      });
    }
  });

  // Manejar la desconexión
  socket.on('disconnect', () => {
    console.log('Cliente desconectado', socket.id);
    for (const [userId, socketId] of Object.entries(connectedUsers)) {
      if (socketId === socket.id) {
        delete connectedUsers[userId];
        break;
      }
    }
  });
});

server.listen(3111, () => {
  console.log('Servidor Socket.io corriendo en el puerto 3111');
});
