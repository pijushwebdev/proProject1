import dotenv from 'dotenv';
import path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') })


export default {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    database_url: process.env.MONGODB_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    student_password: process.env.STUDENT_PASSWORD,
    faculty_password: process.env.FACULTY_PASSWORD,
    admin_password: process.env.ADMIN_PASSWORD,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    jwt_refresh_key: process.env.JWT_REFRESH_KEY,
    jwt_secret_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    super_admin_password: process.env.super_admin_password,
    reset_pass_link: process.env.RESET_PASS_LINK,
    mail_smtp_pass: process.env.MAIL_SMTP_PASS,
    mail_smtp_user: process.env.MAIL_SMTP_USER,
    smtp_host: process.env.SMTP_HOST,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
}