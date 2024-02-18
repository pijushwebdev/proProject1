import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

const port = config.PORT;
const mongoDb_url = config.database_url;



async function main() {

    try {

        await mongoose.connect(mongoDb_url as string);
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })

    }catch(error){
        console.log(error);
    }
}

main();