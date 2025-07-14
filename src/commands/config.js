import ConfigService from '../services/config.js';
import { handleError } from '../utils/error.js';

export const getConfigCommand = () => {
  try {
    console.log('⚠️ Make Sure no one is looking ⚠️');
    setTimeout(() => {
      const data = ConfigService.getConfig();
      console.log(data);
    }, 2000);
  } catch (error) {
    handleError(error);
  }
};

export const initConfigCommand = async () => {
  try {
    return await ConfigService.createConfig();
  } catch (error) {
    handleError(error);
  }
};