/*
 * @Author: Lee
 * @Date: 2023-05-31 15:27:02
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-31 15:27:05
 * @Description: 
 */
function log(target, name, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    console.log(`Calling ${name} with arguments:`, args);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

class MyClass {
  @log
  myMethod() {
    console.log('Executing myMethod');
  }
}

const obj = new MyClass();
obj.myMethod(); // 调用 myMethod 时会输出日志信息
