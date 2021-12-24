import { Router, Request, Response } from 'express';
import {
  validate,
  fileValidationRules,
} from '../middlewares/validate';
import ResizeService from '../services/ResizeService';
import config from '../config';
import path from 'path';

const apiRoutes = Router();

apiRoutes.get(
  '/',
  fileValidationRules(),
  validate,
  (req: Request, res: Response) => {
    const fileName = req.query.fileName as string;
    const fullFileName = `${fileName}${config.imageType}`;
    const width = req.query.width as string;
    const widthInt = parseInt(width); //parse from string to int
    const height = req.query.height as string;
    const heightInt = parseInt(height); //parse from string to int

    const service = new ResizeService(
      fullFileName,
      widthInt,
      heightInt,
    );
    service
      .resizeImage()
      .then(() => {
        res.sendFile(
          path.resolve(`./images/resized/${fullFileName}`),
        );
      })
      .catch(() => {
        res.send(`<strong>error resizing image</strong>`);
      });
  },
);

export default apiRoutes;
