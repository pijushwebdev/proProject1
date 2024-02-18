import dotenv from 'dotenv';
import path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') })


export default {
    PORT: process.env.PORT,
    database_url: process.env.MONGODB_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    default_password: process.env.DEFAULT_PASSWORD
}