import moment from 'moment';

moment.locale('ko');

// Format date  'YYYY년 MM월 DD일'
export const returnToLocale = (val: string): string => {
  const sanitizedVal = val.replace(/-/g, '');
  return sanitizedVal
    ? `${sanitizedVal.substr(0, 4)}년 ${sanitizedVal.substr(4, 2)}월 ${sanitizedVal.substr(6, 2)}일`
    : '-';
};

// Convert a number or string to a localized string with commas (e.g., '1,234')
export const returnToLocaleStrings = (val: number | string): string => {
  return val ? Number(val).toLocaleString('ko-KR') : '-';
};

// Get today's date formatted in Korean (e.g., '2024년 9월 26일(오늘)')
export const returnToday = (): string => {
  return moment().format('YYYY년 M월 D일') + '(오늘)';
};

export const leaveDay = (): string => {
  return moment().format('YYYY년 M월 D일')
}

// Get yesterday's date formatted in Korean (e.g., '2024년 9월 25일(어제)')
export const returnYesterday = (): string => {
  return moment().subtract(1, 'days').format('YYYY년 M월 D일') + '(어제)';
}; 

// Calculate rotation for a donut chart based on the given value
export const returnDonutRotate = (max: number, val: number): number => {
  if (val > max) return 270;
  if (val <= 0) return 90;
  return 90 + (val / max) * 180;
};

// Validate if a given string is a valid domain
export const isDomain = (domain: string): boolean => {
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return domainRegex.test(domain);
};

// Validate if a given string is a valid mobile number (numbers only)
export const isMobileNumber = (mobileNumber: string): boolean => {
  const phoneRegex = /^[0-9]*$/;
  return phoneRegex.test(mobileNumber);
};
