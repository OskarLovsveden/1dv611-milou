import { connectDB } from './config/mongoose';
import Server from './server';

const main = async () => {
    try {
        await connectDB();

        const server = new Server(process.env.PORT || 5000);

        server.run();
    } catch (error) {
        console.error(error);
    }
};

main();