import DatabaseService from '../services/database.js';

export const historyCommand = (count) => {
  const data = DatabaseService.getAll(count);
  console.log(data);
  console.log(`Total images: ${data.length}`);
};