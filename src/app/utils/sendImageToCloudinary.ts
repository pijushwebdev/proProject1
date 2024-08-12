import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendImageToCloudinary = async (file: any, avatarName: string): Promise<UploadApiResponse | undefined> => {

  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret
  });

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(`${file?.path}`, {
      public_id: avatarName,
    }) as UploadApiResponse;

    // delete the file/image asynchronously from uploads folder
    fs.unlink(file?.path, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('File is deleted.');
      }
    });

    return uploadResult;

  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return undefined;
  }
}

//temporary store the image in uploads file using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

export const upload = multer({ storage: storage });

export default sendImageToCloudinary;
