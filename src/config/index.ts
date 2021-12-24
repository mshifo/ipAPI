import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

export default {
  // application port to be run on
  port: process.env.PORT,
  // folder contains images to be resized
  imagesFolder: process.env.IMAGES_FOLDER,
  // folder contains resized images
  resizedImagesFolder: process.env.RESIZED_IMAGES_FOLDER,

  imageType: process.env.DEFAULT_IMAGE_TYPE,
};
