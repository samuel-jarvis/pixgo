import db from "./databaseService.js";
import { handleError, validateFile } from "../utils.js";
import Cloudinary from "./cloudinaryService.js";
import yoctoSpinner from 'yocto-spinner';
import ConfigService from "./configService.js";

export const Commands = {
  uploadImage: async (filePath) => {
    try {
      validateFile(filePath)

      const spinner = new yoctoSpinner({
        text: 'Uploading image...',
        color: 'yellow',
      });

      spinner.start();

      const result = await Cloudinary.uploadImage(filePath);

      if (!result) {
        throw new Error('Cloudinary failed to upload image.')
      }

      const payload = {
        id: result.public_id,
        url: result.url,
        createdAt: new Date(),
        fileName: result.original_filename,
        resource_type: result.resource_type,
      };

      db.insert(payload);

      spinner.stop();
      console.log("Image uploaded successfully");

      console.log(payload.url)
    } catch (error) {
      handleError(error)
    }
  },

  deleteUploadedImage: async (id) => {
    try {
      const spinner = new yoctoSpinner({
        text: 'Deleting image...',
        color: 'yellow',
      });

      spinner.start();

      const image = db.getById(id);

      if (!image) {
        throw new Error('Image not found.')
      }

      await Cloudinary.deleteImage(image.id);

      db.delete(id);
      spinner.stop();
      console.log("Image deleted successfully");
    } catch (error) {
      handleError(error)
    }
  },

  getAllImages: (count) => {
    const data = db.getAll(count);
    console.log(data)
    console.log(`Total images: ${data.length}`)
  },

  // config related commands
  getConfig: () => {
    try {
      console.log('⚠️ Make Sure not one is looking ⚠️')
      setTimeout(() => {
        const data = ConfigService.getConfig();
        console.log(data)
      }, 2000)
    } catch (error) {
      handleError(error)
    }
  },

  initConfig: async () => {
    try {
      return await ConfigService.createConfig();
    } catch (error) {
      handleError(error)
    }
  },
}