const process = globalThis.process;

export const handleError = (error) => {
  console.error('Error:', error.message);
  process.exit(1);
};

export class PixgoError extends Error {
  constructor(message, code = 'PIXGO_ERROR') {
    super(message);
    this.name = 'PixgoError';
    this.code = code;
  }
}

export const createError = (message, code) => {
  return new PixgoError(message, code);
};