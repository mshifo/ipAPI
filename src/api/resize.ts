import { Router, Request, Response } from 'express';
import middleware from '../middlewares';
import ResizeService from '../services/ResizeService';

const apiRoutes = Router();

apiRoutes.get(
  '/',
  middleware.validation,
  (req: Request, res: Response) => {
    const fileName = req.query.fileName as string;
    const width = req.query.width as string;
    const widthInt = parseInt(width); //parse from string to int
    const height = req.query.height as string;
    const heightInt = parseInt(height); //parse from string to int

    const service = new ResizeService(fileName, widthInt, heightInt);
    service
      .resizeImage()
      .then((data) => {
        return res.status(200).json({ data });
      })
      .catch((error) => {
        return res.status(500).json({ message: error });
      });
  },
);

export default apiRoutes;
