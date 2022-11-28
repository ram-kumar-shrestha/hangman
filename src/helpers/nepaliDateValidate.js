export const NepaliDateValidate = (date) => {
  const todayBsDate = NepaliFunctions.GetCurrentBsDate();
  const InputDate = {
    year: parseInt(date.split("-")[0]),
    month: parseInt(date.split("-")[1]),
    day: parseInt(date.split("-")[2]),
  };

  if (
    todayBsDate.year <= InputDate.year &&
    todayBsDate.month <= InputDate.month &&
    todayBsDate.day > InputDate.day
  )
    return { dayBeforeToday: true };
  return { dayBeforeToday: false };
};
