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

/**
 * Returns the human-readble formatted date
 * @param _date Date object to convert
 * @returns `DateFormat` object
 */
export function getFormattedDate(_date:Date|number|string):DateFormat {
  let date = new Date(_date)
  return {
    date: date.getDate(),
    dayOfTheWeek: dayOfTheWeek[date.getDay().toString()],
    month: months[date.getMonth().toString()],
    year: date.getFullYear()
  }
}

const antiDayOfTheWeek = {
  'Monday': 0,
  'Tuesday': 1,
  'Wednesday': 2,
  'Thursday': 3,
  'Friday': 4,
  'Saturday': 5,
  'Sunday': 6
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
  year: number
}

export interface AntiDateFormat {
  date: number
  dayOfTheWeek: number
  month: number
  year: number
}