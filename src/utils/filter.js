import moment from 'moment'


export const time = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  let str = ''
  if (date) {
    str = moment(date).format(fmt)
  }
  return str
}

export const second = (date, fmt = 'HH:mm:ss') => {
  let str = ''
  if (date) {
    str = moment(date).format(fmt)
  }
  return str
}
