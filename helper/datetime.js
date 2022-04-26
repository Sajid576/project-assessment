const moment = require('moment-timezone');

const formats = {
  YEAR_MONTH_DAY: 'YYYY-MM-DD',
  DAY_MONTH_YEAR: 'DD-MM-YYYY',
};
module.exports = {
  getCurrentDatetime: () => moment().tz('Asia/Dhaka').format(),
  getFormattedDateTime: (serverDatetime) => moment
    .tz(serverDatetime, 'Asia/Dhaka')
    .format(formats.YEAR_MONTH_DAY),
  formatDateTime: (serverDatetime, format) => moment.tz(serverDatetime, 'Asia/Dhaka').format(format),
  formatDate: (date) => date.split('-').reverse().join('-'),
  daysBetweenDates: (startDate, endDate = new Date()) => moment(endDate).diff(startDate, 'days'),
  secsToDate: (secs) => moment.tz(secs * 1000, 'Asia/Dhaka').format(formats.YEAR_MONTH_DAY),
};
