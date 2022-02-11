/*
 * @Author: Lee
 * @Date: 2022-02-11 14:03:05
 * @LastEditors: Lee
 * @LastEditTime: 2022-02-11 14:40:22
 */

function myInstance(target, fn) {
  var proto = Object.getPrototypeOf(target);
  var prototype = fn.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

function Person() {}
var per = new Person();
console.log(myInstance(per, Person)); // → true
