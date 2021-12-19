import express, { Application, Request, Response } from 'express';
import { check } from 'express-validator';
import sharp from 'sharp';
import { validate, isFileExist } from './validate';
import * as dotenv from 'dotenv';

dotenv.config();

// Start up an instance of app
const app: Application = express();
const port = process.env.PORT;
const imagesFolder = process.env.IMAGES_FOLDER;
const resizedImagesFolder = process.env.RESIZED_IMAGES_FOLDER;

// add routing for / path
app.get(
  '/',
  validate([
    check('fileName').exists().custom(isFileExist),
    check('width').exists().isInt({ min: 10, max: 2000 }),
    check('height').exists().isInt({ min: 10, max: 2000 }),
  ]),
  async (req: Request, res: Response) => {
    const fileName: string = req.query.fileName as string;
    const width: string = req.query.width as string;
    const widthInt: number = parseInt(width);
    const height: string = req.query.height as string;
    const heightInt: number = parseInt(height);

    await resizeImage(fileName, widthInt, heightInt)
      .then((data) => {
        return res.json({
          message: data,
        });
      })
      .catch(() => {
        return res.status(500).json({
          message: 'error resizing image, please try again later',
        });
      });
  },
);

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
