import { Socket, Server as SocketIOServer } from 'socket.io';
import { NotificacionVentaUsuarioSocket } from '../shared/interfaces';

type ConnectedUsers = { [key: string]: string };

export class SalesNotificationsErpService {
  private connectedUsers: ConnectedUsers = {};

  constructor(private io: SocketIOServer) {}

  // method to register handlers
  registerHandlers(socket: Socket) {
    socket.on('register', (userId: string) =>
      this.registerUser(userId, socket),
    );
    socket.on('nueva_notificacion_ventas', (data: any) =>
      this.handleNewNotification(data),
    );
    socket.on('disconnect', () => this.handleDisconnect(socket));
  }

  private registerUser(userId: string, socket: Socket) {
    this.connectedUsers[userId] = socket.id;
    console.log(`Usuario ${userId} registrado con el socket ${socket.id}`);
  }

  private handleNewNotification(data: NotificacionVentaUsuarioSocket) {
    const { destinatario } = data;
    const socketId = this.connectedUsers[destinatario];
    // console.log({
    //   destinatario, connectedUsers: this.connectedUsers, data, socketId
    // })
    if (socketId) {
      this.io.to(socketId).emit('recibir_notificacion_ventas', data);
    }
  }

  private handleDisconnect(socket: Socket) {
    for (const [userId, socketId] of Object.entries(this.connectedUsers)) {
      if (socketId === socket.id) {
        delete this.connectedUsers[userId];
        console.log(`Usuario ${userId} desconectado`);
        break;
      }
    }
  }
}
