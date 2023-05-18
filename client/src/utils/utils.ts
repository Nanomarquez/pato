export const formatDateTime = (date: string) => {
  const dateFormat = new Date(date)
  const year = dateFormat.getFullYear()
  let month: any = dateFormat.getMonth() + 1
  let day: any = dateFormat.getDate()
  let hours: any = dateFormat.getHours()
  let minutes: any = dateFormat.getMinutes()
  let seconds: any = dateFormat.getSeconds()
  month = month < 9 ? `0${month}` : month
  day = day < 9 ? `0${day}` : day
  hours = hours < 9 ? `0${hours}` : hours
  minutes = minutes < 9 ? `0${minutes}` : minutes
  seconds = seconds < 9 ? `0${seconds}` : seconds
  return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`
}

export const formatDate = (date: string) => {
  date = date.split('T')[0] + 'T00:00:00'
  const dateFormat = new Date(date)
  const year = dateFormat.getFullYear()
  let month: any = dateFormat.getMonth() + 1
  let day: any = dateFormat.getDate()
  month = month < 9 ? `0${month}` : month
  day = day < 9 ? `0${day}` : day
  return `${year}/${month}/${day}`
}

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })
  return formatter.format(value)
}

export const formatPercent = (value: number) => {
  value = value / 100
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
  return formatter.format(value)
}
