import { check } from 'express-validator';
import { validate, isFileExist } from './validate';

const validation = validate([
  check('fileName').exists().custom(isFileExist), //validate if file already exists
  check('width').exists().isInt({ min: 10 }), //validation
  check('height').exists().isInt({ min: 10 }),
]);

export default {
  validation,
};
