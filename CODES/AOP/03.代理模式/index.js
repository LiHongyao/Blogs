/*
 * @Author: Lee
 * @Date: 2023-05-31 15:34:26
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-31 15:34:29
 * @Description: 
 */
function createProxy(target) {
  return new Proxy(target, {
    apply: function (target, thisArg, argumentsList) {
      console.log(`Calling ${target.name} with arguments:`, argumentsList);
      return target.apply(thisArg, argumentsList);
    },
  });
}

function myFunction() {
  console.log('Executing myFunction');
}

const proxiedFunction = createProxy(myFunction);
proxiedFunction(); // 调用 proxiedFunction 时会输出日志信息
