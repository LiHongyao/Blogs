/*
 * @Author: Lee
 * @Date: 2022-12-12 15:59:04
 * @LastEditors: Lee
 * @LastEditTime: 2023-05-31 15:26:28
 * @Description:
 */

// ———— 业务代码 ————
function logic() {
  console.log('service code...');
}

// → 1）测试前置通知
var logic1 = logic.before(function (foo) {
  console.log('before');
});
logic1();
/*
before
service code...*/

// → 2）测试后置通知
var logic2 = logic.after(function () {
  console.log('after');
});
// logic2();
/*
service code...
after */

// → 3）测试环绕通知
var logic3 = logic.around(
  function () {
    console.log('before');
  },
  function () {
    console.log('after');
  }
);
// logic3();
/**
before
service code...
after */
