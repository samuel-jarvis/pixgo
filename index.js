#!/usr/bin/env node

import { program } from "commander";
import fs from "fs";
import db from "./src/orm.js";
import Cloudinary from "./src/cloudinary.js";

program
  .name("image-uploader")
  .version("0.0.1")
  .description("An application to upload images to Cloudinary");

program
  .command("hello")
  .description("Prints status message and date and time")
  .action(() => {
    console.log("Hello Lord Jarvis");
    const date = new Date();
    console.log(date.toString());
  });

async function uploadImage(filePath) {
  try {
    const result = await Cloudinary.uploadImage(filePath);

    const payload = {
      id: result.public_id,
      url: result.url,
      date: new Date(),
      resource_type: result.resource_type,
    };

    console.log(payload.url)

    db.add(payload);
  } catch (error) {
    console.error(error);
  }
}

async function deleteImage(publicId) {
  try {
    await Cloudinary.deleteImage(publicId);
    db.delete(publicId);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error(error);
  }
}

program
  .command("upload <filePath>")
  .description("Uploads an image to Cloudinary")
  // .option("-f, --file <filePath>", "File path of the image to upload")
  .action(async (filePath) => {     
    if (!filePath) {
      console.error("Please provide a file path");
      return;
    }

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error("File does not exist");
        return;
      }

      uploadImage(filePath);
      return
    });
  });

program
  .command("all")
  .description("Get all uploaded images")
  .option("-c, --count <count>", "Number of images to get")
  .action((options) => {
    const count = options.count;
    if (count) {
      console.log(count)
      
      const amt = parseInt(program.count);
      console.log(db.get(amt));
      return;
    }

    const data = db.getAll();

    if (data.length === 0) {
      console.log("No images uploaded");
      return;
    }

    console.log(data);
    return
  });

program
  .command("delete <id>")
  .description("Delete an uploaded image")
  .action((id) => {
    deleteImage(id);
  });

program.parse(process.argv);
