const dayOfTheWeek = {
  '0': 'Monday',
  '1': 'Tuesday',
  '2': 'Wednesday',
  '3': 'Thursday',
  '4': 'Friday',
  '5': 'Saturday',
  '6': 'Sunday'
}

const months = {
  '0': 'January',
  '1': 'February',
  '2': 'March',
  '3': 'April',
  '4': 'May',
  '5': 'June',
  '6': 'July',
  '7': 'August',
  '8': 'September',
  '9': 'October',
  '10': 'November',
  '11': 'December'
}

export function getFormattedDate(_date:Date|number|string) {
  let date = new Date(_date)
  return {
    date: date.getDate(),
    dayOfTheWeek: dayOfTheWeek[date.getDay().toString()],
    month: months[date.getMonth().toString()],
    year: date.getFullYear()
  }
}