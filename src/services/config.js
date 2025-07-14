import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, '..', '..', 'config.json');
const process = globalThis.process;

class ConfigService {
  static checkConfig() {
    if (!fs.existsSync(configPath)) {
      return false;
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (!config.cloudName || !config.apiKey || !config.apiSecret) {
      return false;
    }

    return true;
  }

  static getConfig() {
    if (!this.checkConfig()) {
      console.error("Please run 'pixgo config init' to set up your configuration.");
      process.exit(1);
    }

    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  static writeConfig(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Config saved to ${configPath}`);
  }

  static async createConfig() {
    const questions = [
      {
        name: 'cloudName',
        type: 'input',
        message: 'Enter your Cloudinary cloud name:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Cloudinary cloud name.';
          }
        }
      },
      {
        name: 'apiKey',
        type: 'input',
        message: 'Enter your Cloudinary API key:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Cloudinary API key.';
          }
        }
      },
      {
        name: 'apiSecret',
        type: 'input',
        message: 'Enter your Cloudinary API secret:',
        validate: function (value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Cloudinary API secret.';
          }
        }
      }
    ];

    const answers = await inquirer.prompt(questions);
    this.writeConfig(answers);
  }
}

export default ConfigService;