import mongoose from "mongoose";


// avoid hidden dependencies
type ConnectionOptions = {
  mongoUri: string;
	dbName: string;
};


export class MongoDB {

  static async connect(options: ConnectionOptions) {
		const { mongoUri, dbName } = options;
		
		try {
			const db = await mongoose.connect(mongoUri, {
				dbName,
			});
			
			console.log(
				`${db.connection.name} connection has been established successfully.`
			);

			return true;
		} catch (error) {
			console.error('Unable to connect to the database:', error);
			// process.exit(1);
			throw Error();
		}
  }

}
