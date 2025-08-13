export const shortText = (text: String, length: number) => {
  const newText = text.slice(0, length);
  if (text.length > length) {
    return `${newText}...`;
  }
  return newText;
};
