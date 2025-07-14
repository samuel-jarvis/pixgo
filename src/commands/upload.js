import { validateFile } from '../utils/validation.js';
import CloudinaryService from '../services/cloudinary.js';
import DatabaseService from '../services/database.js';
import { createSpinner } from '../utils/spinner.js';
import { handleError } from '../utils/error.js';

export const uploadCommand = async (filePath) => {
  try {
    validateFile(filePath);

    const spinner = createSpinner('Uploading image...', 'yellow');
    spinner.start();

    const result = await CloudinaryService.uploadImage(filePath);

    if (!result) {
      throw new Error('Cloudinary failed to upload image.');
    }

    const payload = {
      id: result.public_id,
      url: result.url,
      createdAt: new Date(),
      fileName: result.original_filename,
      resource_type: result.resource_type,
    };

    DatabaseService.insert(payload);

    spinner.stop();
    console.log('Image uploaded successfully');
    console.log(payload.url);
  } catch (error) {
    handleError(error);
  }
};