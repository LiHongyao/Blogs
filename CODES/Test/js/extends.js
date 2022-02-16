/*
 * @Author: Lee
 * @Date: 2022-02-16 10:29:22
 * @LastEditors: Lee
 * @LastEditTime: 2022-02-16 10:30:29
 */

// -------------------- Functions --------------------
// -------------------- Functions --------------------
// -------------------- Functions --------------------

Function.prototype.__call = function (context) {
  // 1. 判断调用对象是否为函数（即使定义在函数原型上，但也可能存在call/apply方式等调用的情况）
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  // 2. 判断上下文是否存在，不存在则默认指向window
  context = context || window;
  // 3. 处理参数/因为第1个参数是指定的this,所以只截取第1个之后的参数
  var args = [...arguments].slice(1);
  // 4. 将函数作为上下文对象的一个属性
  context.fn = this;
  // 5. 使用上下文对象来调用这个方法，并保存返回结果。
  var result = context.fn(...args);
  // 6. 删除刚才新增的属性
  delete context.fn;
  // 7. 返回结果
  return result;
};

Function.prototype.__apply = function (context) {
  // 1. 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  // 2. 判断上下文是否存在，不存在则默认指向window
  context = context || window;
  // 3. 将函数作为上下文对象的一个属性
  context.fn = this;
  // 4. 调用方法 & 处理参数
  var result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  // 5. 将属性删除
  delete context.fn;
  // 6. 返回结果
  return result;
};

Function.prototype.__bind = function (context) {
  // 1. 判断调用对象是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('error');
  }
  // 2. 获取参数 & 调用函数
  var args = [...arguments].slice(1),
    fn = this;
  // 3. 返回新函数
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
