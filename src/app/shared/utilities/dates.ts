import moment from 'moment';

export type dateFormatFn = (date: moment.Moment) => string;

export function toDateString(value: any, format: dateFormatFn, fallback?: string | null) {
  const date = moment(value);
  if (date.isValid()) {
    return format(date);
  } else if (fallback !== undefined) {
    return fallback;
  }

  const error = new Error(`Invalid date format for '${value}' with no provided fallback value.`);
  error.name = 'ParseError';
  throw error;
}

export function toISOString(value: any, fallback?: string): string {
  const isoFormatter = date => date.toISOString();
  return toDateString(value, isoFormatter, fallback);
}

export function toYearMonthDay(value: any, fallback?: string): string {
  const yearMonthDateFormatter = date => date.format('YYYY-MM-DD');
  return toDateString(value, yearMonthDateFormatter, fallback);
}
