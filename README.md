# Pixgo - Cloudinary CLI Tool

Pixgo is a CLI tool for uploading images to Cloudinary and getting a URL response. It simplifies managing Cloudinary images through a command-line interface.

Perfect for developers seeking a streamlined workflow - upload images directly from your terminal to Cloudinary and instantly generate URLs for web applications, email templates, and social media content. Maintain full control over your Cloudinary media assets while saving valuable development time.

![Version](https://img.shields.io/badge/version-1.0.5-purple.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green.svg)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-package-red.svg)](https://www.npmjs.com/package/pixgo)

## Features

- 🚀 **Fast Image Upload**: Upload images to Cloudinary with a single command
- 🗑️ **Image Management**: Delete uploaded images by ID
- 📊 **Upload History**: View and manage your upload history
- ⚙️ **Easy Configuration**: Simple setup with interactive prompts
- 🔒 **Secure**: Local configuration storage with validation
- 📁 **File Validation**: Automatic file type and size validation
- 🎨 **Beautiful CLI**: Clean interface with loading indicators

### Supported File Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- Maximum file size: 10MB

## Installation

### Requirements

- Node.js v14.0.0 or higher
- npm or yarn package manager
- Cloudinary account ([Sign up for free](https://cloudinary.com/users/register/free))

### Global Installation

```bash
npm install -g pixgo
```

### Local Installation

```bash
# Install locally in your project
npm install pixgo

# Run with npx
npx pixgo --help
```

## Configuration

Before using Pixgo, you need to configure it with your Cloudinary credentials:

```bash
# Initialize configuration (interactive setup)
pixgo config init

# View current configuration (⚠️ sensitive data)
pixgo config get
```

### Getting Cloudinary Credentials

1. Sign up for a [free Cloudinary account](https://cloudinary.com/users/register/free)
2. Go to your [Dashboard](https://cloudinary.com/console)
3. Copy the following credentials:
   - **Cloud name**: Your unique cloud identifier
   - **API key**: Your public API identifier
   - **API secret**: Your private API secret (keep this secure!)

### Security Note

🔒 Your credentials are stored locally in `config.json`. Never commit this file to version control or share it publicly.

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

## Examples

### Basic Workflow

```bash
# 1. Set up configuration (one-time setup)
pixgo config init

# 2. Upload an image
pixgo upload ./my-image.jpg
# Output: https://res.cloudinary.com/your-cloud/image/upload/v1234567890/cli/abc123.jpg

# 3. View upload history
pixgo history --count 5

# 4. Delete an image (use ID from history)
pixgo delete abc123
```

### Advanced Usage

```bash
# Upload multiple images (bash)
for img in *.jpg; do pixgo upload "$img"; done

# Upload with error handling (PowerShell)
Get-ChildItem *.png | ForEach-Object { pixgo upload $_.FullName }
```

## Commands Reference

| Command                          | Description                                          | Example                    |
| -------------------------------- | ---------------------------------------------------- | -------------------------- |
| `pixgo hello`                    | Display status and current time                      | `pixgo hello`              |
| `pixgo config init`              | Initialize configuration with Cloudinary credentials | `pixgo config init`        |
| `pixgo config get`               | View current configuration                           | `pixgo config get`         |
| `pixgo upload <filePath>`        | Upload an image to Cloudinary                        | `pixgo upload image.jpg`   |
| `pixgo delete <id>`              | Delete an image from Cloudinary                      | `pixgo delete abc123`      |
| `pixgo history`                  | View upload history                                  | `pixgo history`            |
| `pixgo history --count <number>` | View limited upload history                          | `pixgo history --count 10` |
| `pixgo --help`                   | Show help information                                | `pixgo --help`             |
| `pixgo --version`                | Show version information                             | `pixgo --version`          |

## Troubleshooting

### Common Issues

**Configuration Error**
```bash
Error: Please run 'pixgo config init' to set up your configuration.
```
*Solution*: Run `pixgo config init` and enter your Cloudinary credentials.

**File Not Found**
```bash
Error: File does not exist.
```
*Solution*: Check the file path and ensure the file exists.

**Invalid File Format**
```bash
Error: Invalid file format. Allowed formats: jpg, jpeg, png, gif, webp.
```
*Solution*: Convert your image to a supported format.

**File Too Large**
```bash
Error: File size exceeds the maximum limit (10MB).
```
*Solution*: Compress your image or use a smaller file.

### Getting Help

- Use `pixgo --help` for command information
- Check the [Cloudinary documentation](https://cloudinary.com/documentation)
- Report issues on [GitHub](https://github.com/your-username/pixgo/issues)

## Development

### Project Structure

```
src/
├── commands/           # CLI command implementations
├── services/           # Business logic services
├── utils/              # Utility functions
└── main.js             # CLI entry point
```

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/pixgo.git
cd pixgo

# Install dependencies
npm install

# Link for local testing
npm link

# Test the CLI
pixgo --help
```

### Running Tests

```bash
# Run linting
npm run lint

# Format code
npm run format
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes following the existing code style
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to your branch (`git push origin feature/your-feature`)
7. Open a pull request

### Development Guidelines

- Follow the existing code structure
- Add appropriate error handling
- Update documentation for new features
- Ensure backward compatibility

## License

This project is licensed under the MIT License.

## Acknowledgements

- Built with [Commander.js](https://www.npmjs.com/package/commander)
- Image processing powered by [Cloudinary](https://cloudinary.com/)
