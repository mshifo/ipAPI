import express, { Application, Request, Response } from 'express';
import { check } from 'express-validator';
import sharp from 'sharp';
import { validate, isFileExist } from './validate';
import * as dotenv from 'dotenv';

dotenv.config();

// Start up an instance of app
const app: Application = express();
// application port to be run on
const port = process.env.PORT;
// folder contains images to be resized
const imagesFolder = process.env.IMAGES_FOLDER;
// folder contains resized images
const resizedImagesFolder = process.env.RESIZED_IMAGES_FOLDER;

// add routing for / path
app.get(
  '/',
  validate([
    check('fileName').exists().custom(isFileExist), //validate if file already exists
    check('width').exists().isInt({ min: 10 }), //validation
    check('height').exists().isInt({ min: 10 }),
  ]),
  async (req: Request, res: Response) => {
    const fileName = req.query.fileName as string;
    const width = req.query.width as string;
    const widthInt = parseInt(width); //parse from string to int
    const height = req.query.height as string;
    const heightInt = parseInt(height); //parse from string to int

    //check if file already resized before then don't resize again
    checkIfResizedBefore(fileName, widthInt, heightInt)
      .then(async (data) => {
        if (data) {
          return res.json({
            data,
          });
        } else {
          // resize if not resized before
          await resizeImage(fileName, widthInt, heightInt)
            .then((data) => {
              return res.json({
                data,
              });
            })
            .catch((error) => {
              return res.status(500).json({
                message: error,
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: error,
        });
      });
  },
);

const checkIfResizedBefore = async function (
  fileName: string,
  width: number,
  height: number,
) {
  return await sharp(resizedImagesFolder + fileName)
    .metadata() //get file metadata
    .then((data) => {
      if (data.width === width && data.height === height) {
        //if width and height the same as the file's
        return data;
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
};

const resizeImage = async function (
  fileName: string,
  width: number,
  height: number,
) {
  try {
    return await sharp(imagesFolder + fileName)
      .resize({
        width,
        height,
      })
      .toFile(resizedImagesFolder + fileName);
  } catch (error) {
    console.log(error);
    return error;
  }
};

// start express server
try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error}`);
}

export default app;
