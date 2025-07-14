import cloudinary from 'cloudinary';
import ConfigService from './config.js';
import { handleError } from '../utils/error.js';

class CloudinaryService {
  static #initialized = false;

  static #initialize() {
    if (!this.#initialized) {
      const config = ConfigService.getConfig();
      
      cloudinary.config({
        cloud_name: config?.cloudName,
        api_key: config?.apiKey,
        api_secret: config?.apiSecret
      });
      
      this.#initialized = true;
    }
  }

  static #getOptions() {
    return {
      overwrite: true,
      invalidate: true,
      folder: 'cli'
    };
  }

  static async uploadImage(filePath) {
    try {
      this.#initialize();
      const result = await cloudinary.v2.uploader.upload(filePath, this.#getOptions());
      return result;
    } catch (error) {
      handleError(error);
    }
  }

  static async deleteImage(publicId) {
    try {
      this.#initialize();
      await cloudinary.v2.uploader.destroy(publicId, this.#getOptions());
    } catch (error) {
      handleError(error);
    }
  }
}

export default CloudinaryService;