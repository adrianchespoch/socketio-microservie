import { Socket, Server as SocketIOServer } from 'socket.io';

type ConnectedFleets = { [key: string]: string };

export class FleetSchedulingSocketsService {
  private connectedFleets: ConnectedFleets = {};

  constructor(private io: SocketIOServer) {}

  // method to register handlers
  registerHandlers(socket: Socket) {
    // react FC mounted
    socket.on('register_fleet', (fleetId: string) =>
      this.registerFleet(fleetId, socket)
    );

    // post to create new fleet slot schedule
    socket.on('new_slot_fleet_schedule', (data: any) =>
      // la fecha filtra el front
      this.handleNewFleetSchedule(data)
    );

    socket.on('disconnect', () => this.handleDisconnect(socket));
  }

  private registerFleet(fleetId: string, socket: Socket) {
    this.connectedFleets[fleetId] = socket.id;
    socket.join(fleetId); // Unirse a la room basada en fleetId
    console.log(`Flota ${fleetId} registrada con el socket ${socket.id}`);
  }

  private handleNewFleetSchedule(data: any) {
    const { flota } = data;
    console.log('-----------------', { flota, data }, '-----------------');
    this.io.to(flota).emit('receive_fleet_schedule', data); // Emitir a la room
  }

  private handleDisconnect(socket: Socket) {
    for (const [fleetId, socketId] of Object.entries(this.connectedFleets)) {
      if (socketId === socket.id) {
        delete this.connectedFleets[fleetId];
        socket.leave(fleetId); // Salir de la room
        console.log(`Flota ${fleetId} desconectada`);
        break;
      }
    }
  }

  // Método para emitir eventos a todas las flotas
  public emitToAllFleets(event: string, data: any) {
    this.io.emit(event, data);
  }
}
