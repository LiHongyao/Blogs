/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-30 10:46:54
 * @LastEditTime: 2021-04-30 11:29:38
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \源码\01. Reduce\funcs.js
 */

/**
 * 累加
 * @param  {...any} vals
 * @returns
 */
function accumulation(...vals) {
  return vals.reduce((t, v) => t + v, 0);
}

/**
 * 累乘
 * @param  {...any} vals
 * @returns
 */
function multiplication(...vals) {
  return vals.reduce((t, v) => t * v, 1);
}

/**
 * 反转数组
 * @param {*} arr
 * @returns
 */
function reverse(arr) {
  return arr.reduceRight((t, v) => (t.push(v), t), []);
}
