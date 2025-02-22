import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleError } from '../utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFilePath = path.join(__dirname, '..', '..', 'db.json');

const db = {
  readDb: () => {
    if (!fs.existsSync(dbFilePath)) {
      fs.writeFileSync(dbFilePath, '[]');      
    }
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  },

  writeDb: (data) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  },

  insert: (item) => {
    const data = db.readDb();
    data.push(item);
    db.writeDb(data);
  },

  delete: (id) => {
    const data = db.readDb();

    const exist = data.some(item => item.id === id);
    if (!exist) {
      handleError('Item does not exist');
    }

    const newData = data.filter(item => item.id !== id);
    
    db.writeDb(newData);
  },

  getById: (id) => {
    const data = db.readDb();
    return data.find(item => item.id === id);
  },

  getAll: (count) => {
    if (count && isNaN(count)) {
      handleError('Count must be a number');
    }

    const data = db.readDb().reverse();

    if (count) {
      return data.slice(0, count).reverse();
    }
    return data;
  }
}

export default db;