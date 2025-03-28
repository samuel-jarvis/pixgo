# Pixgo - Cloudinary CLI Tool

Pixgo is a CLI tool for uploading images to Cloudinary and getting a URL response. It simplifies managing Cloudinary images through a command-line interface.

It can be useful for developers who want to quickly upload images to Cloudinary without leaving the terminal and for generating image URLs for use in web applications like email templates, social media posts, and more while having complete control over the uploaded images in your Cloudinary account.

![Version](https://img.shields.io/badge/version-1.0.0-purple.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)

## Features

- Upload images to Cloudinary.
- Delete uploaded images.
- Retrieve upload history.
- Easy configuration management.

## Installation

### Requirements

- Node.js v14.0.0 or higher

```bash
npm install -g pixgo
```

## Configuration

Before using Pixgo, you need to configure it with your Cloudinary credentials:

```bash
# Initialize configuration
pixgo config init

# View current configuration
pixgo config get
```

During initialization, you'll be prompted to enter your Cloudinary credentials:

- Cloud name
- API key
- API secret

## Usage

After installation, use the `pixgo` command in your terminal.

### Commands

- **hello**  
  Prints a status message with the current date and time.

  ```bash
  pixgo hello
  ```

- **upload \<filePath\>**  
  Upload an image to Cloudinary.

  ```bash
  pixgo upload /path/to/image.jpg
  ```

- **delete \<id\>**  
  Delete an uploaded image by its ID.

  ```bash
  pixgo delete <image_id>
  ```

- **history**  
  Display all uploaded images. Optionally specify the number of images.

  ```bash
    # View all uploads
    pixgo history

    # Limit the number of uploads shown
    pixgo history --count 10
  ```

## Commands Reference

| Command                          | Description                                          |
| -------------------------------- | ---------------------------------------------------- |
| `pixgo hello`                    | Display status and current time                      |
| `pixgo config init`              | Initialize configuration with Cloudinary credentials |
| `pixgo config get`               | View current configuration                           |
| `pixgo upload <filePath>`        | Upload an image to Cloudinary                        |
| `pixgo delete <id>`              | Delete an image from Cloudinary                      |
| `pixgo history`                  | View upload history                                  |
| `pixgo history --count <number>` | View limited upload history                          |

## Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a feature branch (`git checkout -b feature/your-feature`).
- Commit your changes (`git commit -m 'Add some feature'`).
- Push to your branch (`git push origin feature/your-feature`).
- Open a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Built with [Commander.js](https://www.npmjs.com/package/commander)
- Image processing powered by [Cloudinary](https://cloudinary.com/)
