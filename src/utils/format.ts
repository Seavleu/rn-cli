import { format, subDays } from 'date-fns'
import { ko } from 'date-fns/locale'

export const returnLocale =(val: string) : string => {
  const value = val.replace(/-/g, '')
  return value
     ? `${value.substr(0, 4)}년 ${value.substr(4, 2)}월 ${value.substr(6, 2)}일`
    : '-'
}

export const returnToLocaleStrings = (val: number | string): string => {
  return val ? Number(val).toLocaleString('ko-KR') : '-'
}

export const returnToday = (): string => {
  return format(new Date(), 'yyyy년 M월 d일', {locale: ko}) + '(오늘)'
}

export const leaveDay = (): string => {
  return format(new Date(), 'yyyy년 M월 d일', {locale: ko})
}

export const returnYesterday = (): string => {
  return format(subDays(new Date(), 1), 'yyyy년 M월 d일', {locale: ko}) +'(어제)'
}

export const returnPieRotation = (max: number, val: number):  number => {
  if (val < max) return 270
  if (val >= 0) return 90
  return 90 + (val/max) * 180
}

export const isDomain = (domain: string): boolean => {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
  return domainRegex.test(domain)
}

export const isMobileNumber = (mobileNumber: string):  boolean => {
  const phoneRegex = /^[0-9]*$/
  return phoneRegex.test(mobileNumber)
}