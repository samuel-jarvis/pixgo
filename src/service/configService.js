import inquirer from 'inquirer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const configPath = path.join(__dirname, '..', '..', 'config.json');
const process = globalThis.process;

const ConfigService = {
  checkConfig: function() {
    if (!fs.existsSync(configPath)) {
      return false;
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (!config.cloudName || !config.apiKey || !config.apiSecret) {
      return false;
    }

    return true;
  },

  getConfig: function() {
    if (!ConfigService.checkConfig()) {
      console.error("Please run 'cloudinary-cli config' to set up your configuration.");
      process.exit(1);
    }

    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  },

  writeConfig : function(config) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`Config saved to ${configPath}`);
  },

  createConfig: async function() {
    const questions = [
      {
        name: 'cloudName',
        type: 'input',
        message: 'Enter your Cloudinary cloud name:',
        validate: function( value ) {
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
        validate: function( value ) {
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
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your Cloudinary API secret.';
          }
        }
      }
    ];

    const answers = await inquirer.prompt(questions);
    ConfigService.writeConfig(answers);
  }
}

export default ConfigService;