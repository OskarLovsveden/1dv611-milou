import { connectDB } from './config/mongoose';
import Server from './server';
/* import dotenv from 'dotenv'; */

/* dotenv.config(); */


const main = async () => {
    try {


        // await connect to db
        await connectDB();

        const server = new Server(5000);

        server.run();
    } catch (error) {
        console.error(error);
        console.log('test');
    }
};

main();