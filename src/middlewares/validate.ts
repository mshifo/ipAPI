import express from 'express';
import {
  validationResult,
  ValidationChain,
  CustomValidator,
} from 'express-validator';
import * as fs from 'fs';
import config from '../config';

// parallel processing
const validate = (validations: ValidationChain[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    await Promise.all(
      validations.map((validation) => validation.run(req)),
    );

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
};

const isFileExist: CustomValidator = (value) => {
  const filePath = `${config.imagesFolder}${value}${config.imageType}`;
  return fs.promises.access(filePath, fs.constants.F_OK);
};

export { validate, isFileExist };
