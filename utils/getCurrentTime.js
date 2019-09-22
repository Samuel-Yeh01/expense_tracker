const date = new Date();
const currentTime = {
  year: date.getFullYear(),
  month: regulateTime(date.getMonth() + 1),
  date: regulateTime(date.getDate())
};

function regulateTime(time) {
  if (time.toString().length === 1) {
    return `0${time}`;
  }
}

module.exports = {
  currentTime
};
