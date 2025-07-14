import { program } from 'commander';
import {
  uploadCommand,
  deleteCommand,
  historyCommand,
  getConfigCommand,
  initConfigCommand
} from './commands/index.js';

const process = globalThis.process;

program
  .name('Pixgo')
  .version('1.0.5')
  .description(`
    Pixgo - A command line tool for:
    • Uploading images to Cloudinary
    • Managing uploaded images
    • Viewing upload history
  `);

program
  .command('hello')
  .description('Prints status message and date and time')
  .action(() => {
    console.log('Pixgo - Cloudinary Image Uploader');
    const date = new Date();
    console.log(date.toString());
  });

program
  .command('config')
  .description('Manage configuration settings')
  .argument('<action>', 'Actions to perform (init | get)')
  .action((action) => {
    if (action === 'get') {
      getConfigCommand();
    } else if (action === 'init') {
      initConfigCommand();
    } else {
      console.log('Invalid command. Use "init" or "get"');
      process.exit(1);
    }
  });

program
  .command('upload')
  .description('Upload an image to Cloudinary')
  .argument('<filePath>', 'Path to the local image file')
  .action(async (filePath) => {
    await uploadCommand(filePath);
  });

program
  .command('delete')
  .description('Delete an uploaded image')
  .argument('<id>', 'ID of the image to delete')
  .action(async (id) => {
    await deleteCommand(id);
  });

program
  .command('history')
  .description('Get all uploaded images')
  .option('-c, --count <count>', 'Number of images to get')
  .action((options) => {
    historyCommand(parseInt(options.count));
  });

export default program;
