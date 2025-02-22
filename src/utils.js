import path from 'path';
import fs from 'node:fs';

const process = globalThis.process;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

export const handleError = (error) => {
  console.error('Error:', error.message);
  process.exit(1);
};

export const validateFile = (filePath) => {
  if (!filePath) {
    throw new Error('File path is required.')
  }

  if (!fs.existsSync(filePath)) {
    throw new Error('File does not exist.')
  }

  const fileSize = fs.statSync(filePath).size;
  if (fileSize > MAX_FILE_SIZE) {
    throw new Error('File size exceeds the maximum limit (10MB).')
  }

  const fileExtension = path.extname(filePath).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
    throw new Error('Invalid file format. Allowed formats: jpg, jpeg, png, gif, webp.')
  }

  return true;
};