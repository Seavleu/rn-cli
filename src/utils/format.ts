import moment from 'moment';

moment.locale('ko');

// Format date to localized format
export const returnToLocale = (val: string): string => {
  val = val.replace(/-/g, '');
  return val
    ? `${val.substr(0, 4)}년 ${val.substr(4, 2)}월 ${val.substr(6, 2)}일`
    : '-';
};

// Convert number to localized string with commas
export const returnToLocaleStrings = (val: number | string): string => {
  return val ? Number(val).toLocaleString('ko-KR') : '-';
};

// Return today's date formatted in Korean
export const returnToday = (): string => {
  return moment().format('YYYY년 M월 D일') + '(오늘)';
};

// Return yesterday's date formatted in Korean
export const returnYesterday = (): string => {
  return moment().subtract(1, 'days').format('YYYY년 M월 D일') + '(어제)';
};

// Calculate rotation for a donut chart
export const returnDonutRotate = (max: number, val: number): number => {
  if (val > max) return 270;
  if (val <= 0) return 90;
  return 90 + (val / max) * 180;
};

// Validate domain format
export const isDomain = (domain: string): boolean => {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return domainRegex.test(domain);
};

// Validate mobile number format
export const isMobileNumber = (mobileNumber: string): boolean => {
  const phoneRegex = /^[0-9]*$/;
  return phoneRegex.test(mobileNumber);
};
