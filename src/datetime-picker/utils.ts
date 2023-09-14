import { isNaN } from '../utils/validate/number';
import { isDate } from '../utils/validate/date'
import dayjs from '../utils/dayjs';

export function times(n: number, iteratee: (index: number) => any[]) {
  let index = -1;
  const result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

export function getTrueValue(value: string | undefined): number {
  if (!value) {
    return 0;
  }

  while (isNaN(parseInt(value, 10))) {
    if (value.length > 1) {
      value = value.slice(1);
    } else {
      return 0;
    }
  }

  return parseInt(value, 10);
}

export function getMonthEndDay(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate();
}

// @ts-ignore
Date.prototype.formath = function(fmt) {
  const o = {
      "M+": this.getMonth() + 1,
      // 月份
      "d+": this.getDate(),
      // 日
      "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
      // 小时
      "H+": this.getHours(),
      // 小时
      "m+": this.getMinutes(),
      // 分
      "s+": this.getSeconds(),
      // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3),
      // 季度
      "S": this.getMilliseconds() // 毫秒
  };
  const week = {
      "0": "\u65e5",
      "1": "\u4e00",
      "2": "\u4e8c",
      "3": "\u4e09",
      "4": "\u56db",
      "5": "\u4e94",
      "6": "\u516d"
  };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    // @ts-ignore
      fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f": "\u5468") : "") + week[this.getDay() + ""]);
  }
  for (const k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        // @ts-ignore
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
  }
  return fmt;
}

export function transErrorDate(date: any, type: any) {
  const now = new Date();
  const calendarMin = new Date();
  const calendarMax = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
  let fDate;
  fDate = new Date(date);
  if(isDate(fDate)) {
  } else {
    if(type === 'min') {
      fDate = calendarMin;
    }
    if(type === 'max') {
      fDate = calendarMax;
    }
  }
  return fDate;
}

export function formatFu(date: string | number | Date, type: string, gmt: boolean) {
  const tempDate = date;
  // @ts-ignore
  const tmpDate = isDate(tempDate) ? tempDate : (tempDate ? new Date(tempDate) : new Date());
  if (type === 'datetime') {
    if (gmt) return tmpDate.toJSON();
    // @ts-ignore
    return tmpDate.formath("yyyy-MM-dd HH:mm:ss")
  }
  if (type === 'date') {
    // @ts-ignore
    return tmpDate.formath("yyyy-MM-dd")
  }
  if (type === 'time') {
    // @ts-ignore
    return tempDate
  }
  if (type === 'year-month') {
    // @ts-ignore
    return tmpDate.formath("yyyy-MM")
  }
}


export function displayFormat(date: string | number | Date, type: string, customFormat?: string) {
  const tempDate = date;
  // @ts-ignore
  const tmpDate = isDate(tempDate) ? tempDate : (tempDate ? new Date(tempDate) : new Date());
  if (type === 'datetime') {
    // @ts-ignore
    return tmpDate.formath(customFormat || "yyyy-MM-dd HH:mm:ss")
  }
  if (type === 'date') {
    // @ts-ignore
    return tmpDate.formath(customFormat || "yyyy-MM-dd")
  }
  if (type === 'year-month') {
    // @ts-ignore
    return tmpDate.formath(customFormat || "yyyy-MM")
  }
  if (type === 'time') {
    // @ts-ignore
    return tempDate
  }
}

export function isValidDate(date: string | Date, type?: string): boolean {
  const isPrimitiveDate = Object.prototype.toString.call(date) === '[object Date]';

  //  Date 类型
  if (isPrimitiveDate) {
    return !isNaN((date as Date).getTime());
  }

  if (!date) {
    return false;
  }

  let format;

  if (type === 'time') {
    format = 'HH:mm'
  } else if (type === 'year-month') {
    format = 'YYYY-MM'
  }

  // string类型
  const valid = dayjs(date, format).isValid();

  return valid;
}
