/*
 * @Author: Lee
 * @Date: 2022-02-11 14:03:05
 * @LastEditors: Lee
 * @LastEditTime: 2022-02-14 11:55:49
 */

function myInstance(target, fn) {
  // 获取对象的原型
  var proto = Object.getPrototypeOf(target);
  // 获取构造函数的 prototype 对象
  var prototype = fn.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto);
  }
}

function Person() {}
var per = new Person();
console.log(myInstance(per, Person)); // → true



// new 
function objectFactory() {
  let newObject = null;
  let constructor = Array.prototype.shift.call(arguments);
  let result = null;
  // 判断参数是否是一个函数
  if (typeof constructor !== 'function') {
    console.error('type error');
    return;
  }
  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);
  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);
  // 判断返回对象
  let flag =
    result && (typeof result === 'object' || typeof result === 'function');
  // 判断返回结果
  return flag ? result : newObject;
}
// 使用方法
// objectFactory(构造函数, 初始化参数);
