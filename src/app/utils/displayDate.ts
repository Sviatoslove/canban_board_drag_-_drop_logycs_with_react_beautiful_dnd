const monthDate = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

function addZero(number: number | string) {
  if (+number < 10) number = `0${number}`;
  return number;
}

function getDateFormat(date: any, separator: any) {
  const day = addZero(date.getDate()); // Получаем день месяца.
  //   const month = setZero(1 + date.getMonth()); // Получаем месяц.
  const month = monthDate[date.getMonth()]; // Получаем месяц.
  const year = date.getFullYear(); // Получаем год.
  // Складываем все данные в строку через сепаратор и возвращаем.
  return `${day}${separator}${month}${separator}${year}г.`;
}

export const declensionWord = (
  num = '0',
  word: string,
  end1: string,
  end2: string,
  end3: string
): string => {
  const z = (+num % 100) / 10;
  const x = +num % 10;
  z >= 1.1 && z <= 1.4
    ? (num += ` ${word}${end1}`)
    : x === 1
    ? (num += ` ${word}${end2}`)
    : x === 2 || x === 3 || x === 4
    ? (num += ` ${word}${end3}`)
    : (num += ` ${word}${end1}`);
  return num;
};

export default function displayDate(timeStep: number) {
  const data = new Date(timeStep);
  const ms = Number(data.getTime());
  const date = new Date(ms);
  const dateNow = new Date();

  const yearDif = dateNow.getFullYear() - date.getFullYear();
  if (yearDif === 0) {
    const dayDif = dateNow.getDate() - date.getDate();
    if (dayDif === 0) {
      const hourDif = (Date.now() - ms) / 1000 / 60 / 60;
      if (hourDif < 1) {
        const minutesDif = `${Math.round((Date.now() - ms) / 1000 / 60)}`;
        if (+minutesDif >= 0 && +minutesDif < 1) return 'just now';
        return `${declensionWord(minutesDif, 'minute', '', '', 's')} ago`;
      }
      return `today at ${addZero(date.getHours())}:${addZero(
        date.getMinutes()
      )}`;
    }
    return `${addZero(date.getDate())} ${
      monthDate[date.getMonth()]
    } в ${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  }
  return getDateFormat(date, ' ');
}
