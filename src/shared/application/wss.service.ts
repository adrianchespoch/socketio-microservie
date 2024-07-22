import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

type Options = {
  server: HttpServer;
};

export class IoService {
  private static _instance: IoService; // singleton
  private ioServer: SocketIOServer;

  private constructor(options: Options) {
    const { server } = options;

    //* set up socket.io server - CORS
    // this.ioServer = new SocketIOServer(server);
    this.ioServer = new SocketIOServer(server, {
      cors: {
        origin: '*',
        // origin: ['http://localhost:3001'],
        methods: ['GET', 'POST'],
      },
    });
    this.start(); // listen connections
  }

  // init ioServer as singleton
  static initIo(options: Options) {
    IoService._instance = new IoService(options);
  }

  static get instance(): IoService {
    if (!IoService._instance) throw 'IoService is not initialized';

    return IoService._instance;
  }

  sendMessage(event: string, payload: Object) {
    this.ioServer.emit(event, payload);
  }

  start() {
    this.ioServer.on('connection', socket => {
      console.log('Client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
}