export const isValidPhoto = (file: File) => {
  const rgex = /(jpg|png|jpeg)/i;
  if (!rgex.test(file.type)) {
    return { error: 'Extenstion is not valid' };
  }
  if (file.size / 1024 / 1024 > 4) {
    return { error: 'File size cant be larger than 4mb' };
  }
  return { value: true };
};
