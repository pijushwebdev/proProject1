import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';

const port = config.PORT;
const mongoDb_url = config.database_url;

//handle uncaught and unhandled rejection
let server: Server;



async function main() {

    try {
        await mongoose.connect(mongoDb_url as string);

        seedSuperAdmin();

        server = app.listen(port, () => {
            console.log(`University app listening on port ${port}`)
        })

    }catch(error){
        console.log(error);
    }
}

main();
//async error handle
process.on('unhandledRejection', () => {
    if(server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

//sync error handle
process.on('uncaughtException', () => {
    process.exit(1);
});
