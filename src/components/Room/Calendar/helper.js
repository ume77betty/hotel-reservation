export const WEEK_DAYS = {
  Sunday: 'Su',
  Monday: 'Mo',
  Tuesday: 'Tu',
  Wednesday: 'We',
  Thursday: 'Th',
  Friday: 'Fr',
  Saturday: 'Sa'
};

export const CALENDER_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getDateISO = (date = new Date()) => {
  if (!isDate(date)) return null;
  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2)
  ].join('-');
};

export const zeroPad = (value, length) => `${value}`.padStart(length, '0');

export const isDate = (date) => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());
  return isDate && isValidDate;
};