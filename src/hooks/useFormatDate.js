export const useFormatDate = (date) => {
  const yy = date.getFullYear();
  const mm =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  const tt = date.toLocaleTimeString();
  return `${yy}/${mm}/${dd}, ${tt}`;
};

export const useFormatYear = (date) => {
  const yy = date.getFullYear();
  const mm =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return `${yy}/${mm}/${dd} `;
};
