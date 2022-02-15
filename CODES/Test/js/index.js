/*
 * @Author: Lee
 * @Date: 2022-02-11 14:03:05
 * @LastEditors: Lee
 * @LastEditTime: 2022-02-15 18:03:04
 */

var obj = {
  name: 'Lee',
};
var name = 'Hong';

function fn(params) {
  console.log(this.name, '----', params);
  return 222;
}

Function.prototype.__call = function (context) {
  // 1. 验证类型
  if (typeof this !== 'function') {
    console.log('type error!');
    return;
  }
  // 2. 判断上下文是否存在，不存在则默认指向window
  context = context || window;
  // 3. 处理参数/因为第1个参数是指定的this,所以只截取第1个之后的参数
  var args = [...arguments].slice(1);
  // 4. 将函数作为上下文对象的一个属性
  context.fn = this;
  var returnValue = context.fn(...args);
  delete context.fn;
  return returnValue;
};

fn.__call();
