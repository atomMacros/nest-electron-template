import { app } from "electron";
import * as path from "path";
import * as crypto from 'crypto';

/**
 * @functionName 时间转换
 * @param {Object|string|number} time
 * @param {string} cFormat {y}-{m}-{d} {h}:{i}:{s}
 * @description 返回字符串
 * @author 谭人杰
 * @date 2020-06-10 11:03:20
 */

export function parseTime(time: object | string | number, cFormat?: string) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}

/**
 * @path: src\main\utils\index.ts 
 * @functionName jsfn
 * @param {} 
 * @description 升级随机字符串作为盐值
 * @author 谭人杰
 * @date 2024-08-13 14:21:42
*/
export function generateSalt() {
  return crypto.randomBytes(16).toString('hex');
}

/**
 * @path: src\main\utils\index.ts 
 * @functionName jsfn
 * @param {} 
 * @description 对密码进行MD5加盐加密
 * @author 谭人杰
 * @date 2024-08-13 14:23:00
*/
export function encryptPassword(password, salt) {
  return crypto.createHmac('md5', salt).update(password).digest('hex');
}


/**
 * @path: src\main\utils\index.ts 
 * @functionName jsfn
 * @param {} 
 * @description DTO 循环赋值给 entity
 * @author 谭人杰
 * @date 2024-08-15 22:13:53
*/

export const dto2entity = (dto: any, entity:any) => {
  for (const key in entity) {
      if (dto.hasOwnProperty(key)) {
          entity[key]= dto[key];
      }
  }
}