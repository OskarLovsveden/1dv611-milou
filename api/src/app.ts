import { connectDB } from './config/mongoose';
import Server from './server';
const main = async () => {
    try {
        await connectDB();

        const server = new Server(5000);

        server.run();
    } catch (error) {
        console.error(error);
    }
};

main();