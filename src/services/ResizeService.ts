import sharp, { Metadata } from 'sharp';
import config from '../config';

export default class ResizeService {
  fileName;
  width;
  height;
  constructor(fileName: string, width: number, height: number) {
    this.fileName = fileName;
    this.width = width;
    this.height = height;
  }
  public async checkIfResizedBefore(): Promise<boolean | Metadata> {
    return await sharp(
      `${config.resizedImagesFolder}${this.fileName}`,
    )
      .metadata() //get file metadata
      .then((data) => {
        if (
          data.width === this.width &&
          data.height === this.height
        ) {
          //if width and height the same as the file's
          return data;
        } else {
          return false;
        }
      })
      .catch(() => {
        return false;
      });
  }

  public async resizeImage(): Promise<boolean | Metadata> {
    return this.checkIfResizedBefore()
      .then(async (data) => {
        if (data) {
          return data;
        } else {
          return await sharp(`${config.imagesFolder}${this.fileName}`)
            .resize({ width: this.width, height: this.height })
            .toFile(`${config.resizedImagesFolder}${this.fileName}`);
        }
      })
      .catch((error) => {
        return error;
      });
  }
}
