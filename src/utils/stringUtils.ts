export const convertUnicode = (input: string) => {
  return input.replace(/\\u[0-9a-fA-F]{4}/g, (a, b) => {
    var charcode = parseInt(b, 16);
    return String.fromCharCode(charcode);
  });
};

export const removeAccents = (input: string) => {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};
