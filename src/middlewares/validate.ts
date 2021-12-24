import { Request, Response, NextFunction } from 'express';
import {
  validationResult,
  CustomValidator,
  query,
  ValidationChain,
} from 'express-validator';
import * as fs from 'fs';
import config from '../config';

const fileValidationRules = (): ValidationChain[] => {
  return [
    query('fileName').exists().custom(isFileExist), //validate if file already exists
    query('width').exists().isInt({ min: 10 }), //validation
    query('height').exists().isInt({ min: 10 }),
  ];
};

const validate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.send(
    `<strong>${errors.array()[0].param}: ${
      errors.array()[0].msg
    }</strong>`,
  );
};

const isFileExist: CustomValidator = (value): Promise<void> => {
  const filePath = `${config.imagesFolder}${value}${config.imageType}`;
  return fs.promises.access(filePath, fs.constants.F_OK);
};

export { fileValidationRules, validate };
