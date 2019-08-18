// TODO: lets convert this to a service

export function addDays(date: Date, days: number): Date {
  return new Date(new Date(date).setDate(date.getDate() + days));
}

export function addMonths(date: Date, months: number): Date {
  return new Date(new Date(date).setMonth(date.getMonth() + months));
}

export function getFirstDayOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0);
}

export function getFirstDayOfWeekMonth(date: Date): number {
  return this.getFirstDayOfMonth(date).getDay();
}

export function dayToStartMonth(date: Date, mondayFirstDayOfWeek: boolean): Date {
  return this.addDays(this.getFirstDayOfMonth(date), (this.getFirstDayOfWeekMonth(date) - (mondayFirstDayOfWeek ? 1 : 0)) * -1);
}

export function removeTime(date: Date): Date {

  if (!date) {
    return null;
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
}

export function convertToDate(value: any): Date {

  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== 'object') {
    let date = new Date(value);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
  }

  return value;
}

export function monthDiff(date1: Date, date2: Date, includeCurrentMonth = true): number {

  let dateFrom = date1;
  let dateTo = date2;

  if (date1 > date2) {
    dateFrom = date2;
    dateTo = date1;
  }

  return dateTo.getMonth() - dateFrom.getMonth() + (12 * (dateTo.getFullYear() - dateFrom.getFullYear())) + (includeCurrentMonth ? 1 : 0);
}

export function YYYYMMDDToDate(date: string): Date {

  if (!date || date.length !== 8) {
    return null;
  }

  return new Date(parseInt(date.substr(0, 4), 10),
    parseInt(date.substr(4, 2), 10) - 1, parseInt(date.substr(6, 2), 10), 0, 0);
}
