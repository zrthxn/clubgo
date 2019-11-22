const dayOfTheWeek = {
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday'
}

const shortDayOfTheWeek = {
  '0': 'Sun',
  '1': 'Mon',
  '2': 'Tue',
  '3': 'Wed',
  '4': 'Thu',
  '5': 'Fri',
  '6': 'Sat'
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

const shortMonths = {
  '0': 'Jan',
  '1': 'Feb',
  '2': 'Mar',
  '3': 'Apr',
  '4': 'May',
  '5': 'Jun',
  '6': 'Jul',
  '7': 'Aug',
  '8': 'Sep',
  '9': 'Oct',
  '10': 'Nov',
  '11': 'Dec'
}

/**
 * Returns the human-readble formatted date
 * @param _date Date object to convert
 * @returns `DateFormat` object
 */
export function getFormattedDate(_date:Date|number|string):DateFormat {
  let date = new Date(_date)
  let naturalDate = dayOfTheWeek[date.getDay().toString()] + ', ' + date.getDate() + ' ' + months[date.getMonth().toString()]
  let shortNaturalDate = shortDayOfTheWeek[date.getDay().toString()] + ', ' + date.getDate() + ' ' + shortMonths[date.getMonth().toString()]

  return {
    date: date.getDate(),
    dayOfTheWeek: dayOfTheWeek[date.getDay().toString()],
    month: months[date.getMonth().toString()],
    shortDayOfTheWeek: shortDayOfTheWeek[date.getDay().toString()],
    shortMonth: shortMonths[date.getMonth().toString()],
    year: date.getFullYear(),
    naturalDate,
    shortNaturalDate
  }
}

const antiDayOfTheWeek = {
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6,
  'Sunday': 7
}

const antiMonths = {
  'January': 0,
  'February': 1,
  'March': 2,
  'April': 3,
  'May': 4,
  'June': 5,
  'July': 6,
  'August': 7,
  'September': 8,
  'October': 9,
  'November': 10,
  'December': 11
}

/**
 * Returns the machine-readble formatted date
 * @param _date DateFormat object to convert
 * @returns `AntiDateFormat` object
 */
export function fromFormattedDate(_date:DateFormat):AntiDateFormat {
  return {
    date: _date.date,
    dayOfTheWeek: antiDayOfTheWeek[_date.dayOfTheWeek],
    month: antiMonths[_date.month],
    year: _date.year
  }
}

/**
 * Compares the given dates
 * @returns 0 if equal, 1 if `a` is greater, -1 if `b` is greater
 */
export function compareDates(a:Date, b:Date) {
  function isEqual() {
    if(a.getFullYear()===b.getFullYear())
      if(a.getMonth()===b.getMonth())
        if(a.getDate()===b.getDate())
          return true
        else
          return false
      else
        return false
    else
      return false
  }

  function isGreater() {
    if(a.getFullYear() >= b.getFullYear())
      if(a.getMonth() >= b.getMonth())
        if(a.getDate() > b.getDate())
          return true
        else
          return false
      else
        return false
    else
      return false
  }

  function isSmaller() {
    if(a.getFullYear() <= b.getFullYear())
      if(a.getMonth() <= b.getMonth())
        if(a.getDate() < b.getDate())
          return true
        else
          return false
      else
        return false
    else
      return false
  }

  if(isEqual())
    return 0
  else if(isGreater())
    return 1
  else if(isSmaller())
    return -1
  else
    return undefined
}

export function getTime(date:Date) {
  return (date.getHours() * 60) + date.getMinutes()
}

export function formatTime(time:number, options?) {
  if(time>=1440) time -= 1440
  if(options) {
    if(options.hideMinutes)
      return ((time - (time % 60)) / 60) > 12 ? (
        (
          (((time - (time % 60)) / 60) - 12).toString()==='0' ? '12' : (
            (((time - (time % 60)) / 60) - 12).toString()
          )
        ) + 'PM'
      ) : (
        (
          (((time - (time % 60)) / 60)).toString()==='0' ? '12' : (
            (((time - (time % 60)) / 60)).toString()
          )
        ) + 'AM'
      )
  }
  else
    return ((time - (time % 60)) / 60) > 12 ? (
      (
        (((time - (time % 60)) / 60) - 12).toString()==='0' ? '12' : (
          (((time - (time % 60)) / 60) - 12).toString()
        )
      ) + ':' + (
        (time % 60).toString().length < 2 ? (
          '0' + (time % 60).toString()
        ) : (
          (time % 60).toString()
        ) 
      ) + 'PM'
    ) : (
      (
        (((time - (time % 60)) / 60)).toString()==='0' ? '12' : (
          (((time - (time % 60)) / 60)).toString()
        )
      ) + ':' + (
        (time % 60).toString().length < 2 ? (
          '0' + (time % 60).toString()
        ) : (
          (time % 60).toString()
        ) 
      ) + 'AM'
    )
}

export interface DateFormat {
  date: number
  dayOfTheWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
  month: 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'
  shortDayOfTheWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
  shortMonth: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'
  year: number
  naturalDate: string
  shortNaturalDate: string
}

export interface AntiDateFormat {
  date: number
  dayOfTheWeek: number
  month: number
  year: number
}
