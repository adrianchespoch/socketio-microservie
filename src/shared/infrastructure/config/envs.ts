import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),

  // MongoDB
  MONGODB_URI: get('MONGODB_URI').required().asString(),
  MONGODB_NAME: get('MONGODB_NAME').required().asString(),

};
