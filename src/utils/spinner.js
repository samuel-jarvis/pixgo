import yoctoSpinner from 'yocto-spinner';

export const createSpinner = (text, color = 'yellow') => {
  return new yoctoSpinner({
    text,
    color,
  });
};

export const withSpinner = async (text, asyncFn, color = 'yellow') => {
  const spinner = createSpinner(text, color);
  spinner.start();
  
  try {
    const result = await asyncFn();
    spinner.stop();
    return result;
  } catch (error) {
    spinner.stop();
    throw error;
  }
};