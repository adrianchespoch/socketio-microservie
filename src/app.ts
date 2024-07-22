import { createServer } from 'http';

import { IoService } from './shared/application/wss.service';
import { envs } from './shared/infrastructure/config';
import { MongoDB } from './shared/infrastructure/persistence';
import { AppRouter } from './shared/infrastructure/server/router';
import { Server } from './shared/infrastructure/server/server';



const main = async () => {

  /* MongoDB */
  await MongoDB.connect({
    mongoUri: envs.MONGODB_URI,
    dbName: envs.MONGODB_NAME,
  });


  // Avoid hidden dependencies
  const server = new Server({
    port: envs.PORT,
    // public_path: envs.PUBLIC_PATH,
  });


  // server.start(); // only express server


  ///* WSS: require a http server != express ---------
  const httpServer = createServer(server.app);
  IoService.initIo({ server: httpServer });

  server.setRoutes(AppRouter.routes); // after initialize WSS

  httpServer.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });

};



(async () => {
  main();
})();
