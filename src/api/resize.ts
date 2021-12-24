import { Router, Request, Response } from 'express';
import middleware from '../middlewares';
import ResizeService from '../services/ResizeService';
import config from '../config';
import path from 'path';

const apiRoutes = Router();

apiRoutes.get(
  '/',
  middleware.validation,
  (req: Request, res: Response) => {
    let fileName = req.query.fileName as string;
    fileName = `${fileName}${config.imageType}`;
    const width = req.query.width as string;
    const widthInt = parseInt(width); //parse from string to int
    const height = req.query.height as string;
    const heightInt = parseInt(height); //parse from string to int

    const service = new ResizeService(fileName, widthInt, heightInt);
    service
      .resizeImage()
      .then(() => {
        res.sendFile(path.resolve(`./images/resized/${fileName}`));
      })
      .catch(() => {
        res.send(`<strong>error resizing image</strong>`);
      });
  },
);

export default apiRoutes;
