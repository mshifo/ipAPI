import express from 'express';
import {
  validationResult,
  ValidationChain,
  CustomValidator,
} from 'express-validator';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

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

    res.status(400).json({ errors: errors.array() });
  };
};

const isFileExist: CustomValidator = (value) => {
  const filePath = process.env.IMAGES_FOLDER + value;
  return fs.promises.access(filePath, fs.constants.F_OK);
};

export { validate, isFileExist };
