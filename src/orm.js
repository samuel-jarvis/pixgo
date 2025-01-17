import fs from 'fs';

const dbFilePath = './db.json';

const readDb = () => {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

const writeDb = (data) => {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

const db = {
  getAll: () => readDb(),

  add: (item) => {
    const data = readDb();
    data.push(item);
    writeDb(data);
  },

  delete: (id) => {
    const data = readDb();

    const exist = data.some(item => item.id === id);
    if (!exist) {
      console.log('Item does not exist');
      return;
    }

    const newData = data.filter(item => item.id !== id);
    writeDb(newData);
  },

  find: (id) => {
    const data = readDb();
    return data.find(item => item.id === id);
  },

  get: (count = 1) => {
    const data = readDb().reverse();

    return data.slice(0, count);
  }
}

export default db;