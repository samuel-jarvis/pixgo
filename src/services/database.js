import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleError } from '../utils/error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFilePath = path.join(__dirname, '..', '..', 'db.json');

class DatabaseService {
  static readDb() {
    if (!fs.existsSync(dbFilePath)) {
      fs.writeFileSync(dbFilePath, '[]');
    }
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  }

  static writeDb(data) {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  }

  static insert(item) {
    const data = this.readDb();
    data.push(item);
    this.writeDb(data);
  }

  static delete(id) {
    const data = this.readDb();

    const exist = data.some(item => item.id === id);
    if (!exist) {
      handleError('Item does not exist');
    }

    const newData = data.filter(item => item.id !== id);
    this.writeDb(newData);
  }

  static getById(id) {
    const data = this.readDb();
    return data.find(item => item.id === id);
  }

  static getAll(count) {
    if (count && isNaN(count)) {
      handleError('Count must be a number');
    }

    const data = this.readDb().reverse();

    if (count) {
      return data.slice(0, count).reverse();
    }
    return data;
  }
}

export default DatabaseService;