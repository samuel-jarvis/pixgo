import CloudinaryService from '../services/cloudinary.js';
import DatabaseService from '../services/database.js';
import { createSpinner } from '../utils/spinner.js';
import { handleError } from '../utils/error.js';

export const deleteCommand = async (id) => {
  try {
    const spinner = createSpinner('Deleting image...', 'yellow');
    spinner.start();

    const image = DatabaseService.getById(id);

    if (!image) {
      throw new Error('Image not found.');
    }

    await CloudinaryService.deleteImage(image.id);
    DatabaseService.delete(id);
    
    spinner.stop();
    console.log('Image deleted successfully');
  } catch (error) {
    handleError(error);
  }
};