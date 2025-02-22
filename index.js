#!/usr/bin/env node
import { program } from "commander";
import { Commands } from "./src/service/commandService.js";

const process = globalThis.process;

program
  .name("pixgo")
  .version("0.0.1")
  .description("An CLI tool to upload images to Cloudinary");

program
  .command("hello")
  .description("Prints status message and date and time")
  .action(() => {
    console.log("Pixgo File Uploader");
    const date = new Date();
    console.log(date.toString());
  });

program
  .command("config")
  .description("use init to set config and get to view config")
  .argument('<action>', 'Actions to perform (init | get )')
  .action((action) => {
    if (action === 'get') {
      Commands.getConfig()
    } else if (action === 'init') {
      Commands.initConfig()
    } else {
      console.log('Invalid Command enter get or init')
      process.exit(1)
    }
  })

program
  .command("upload <filePath>")
  .description("Uploads an image to Cloudinary")
  .action(async (filePath) => {
    await Commands.uploadImage(filePath);
  });

program
  .command("delete <id>")
  .description("Delete an uploaded image")
  .action(async (id) => {
    return Commands.deleteUploadedImage(id);
  });

program
  .command("all")
  .description("Get all uploaded images")
  .option("-c, --count <count>", "Number of images to get")
  .action((options) => {
    Commands.getAllImages(parseInt(options.count));
  });

program.parse(process.argv);
