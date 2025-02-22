import cloudinary from 'cloudinary';
import ConfigService from './configService.js';
import { handleError } from '../utils.js';

const config = ConfigService.getConfig();

cloudinary.config({
  cloud_name: config?.cloudName,
  api_key: config?.apiKey,
  api_secret: config?.apiSecret
})

const options = {
  overwrite: true,
  invalidate: true,
  folder: 'cli'
}

const Cloudinary = {
  uploadImage: async (filePath) => {
    try {
      const result = await cloudinary.v2.uploader.upload(filePath, options);
      return result
    } catch (error) {
      handleError(error)
    }
  },

  deleteImage: async (publicId) => {
    try {
      await cloudinary.v2.uploader.destroy(publicId, options);
    } catch (error) {
      handleError(error)
    }
  }
}

export default Cloudinary;