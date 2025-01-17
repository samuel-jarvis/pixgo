import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
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
      console.error(error);
    }
  },

  deleteImage: async (publicId) => {
    try {
      const result = await cloudinary.v2.uploader.destroy(publicId, options);
      return result
    } catch (error) {
      console.error(error);
    }
  }
}

export default Cloudinary;