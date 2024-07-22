import compression from 'compression';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { notFoundMiddleware } from './middlewares';



interface Options {
  port: number;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  // private readonly publicPath: string;


  // Avoid hidden dependencies
  constructor(options: Options) {
    const { port /*  , public_path = 'public' */ } = options;

    this.port = port;
    // this.publicPath = public_path;
    
    this.configure();
  }


  setRoutes(router: Router) {
    this.app.use(router);

    ///* final middlewares
    this.app.use(notFoundMiddleware);
  }


  async start() {
    ///* Express Server - only express server
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });

  }
  public close() {
    this.serverListener?.close();
  }


  private configure() {
    ///* Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    // this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(morgan('dev'));

    ///* Serve Static Content
    // this.app.use(express.static(this.publicPath));

  }

}
