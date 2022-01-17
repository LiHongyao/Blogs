/*
 * @Author: Lee
 * @Date: 2022-01-17 16:31:08
 * @LastEditors: Lee
 * @LastEditTime: 2022-01-17 19:34:21
 */

/**
 * 前置通知
 * @description 给方法加入前置切片函数，可以在执行方法之前执行一些操作,
 * @param {Function} callback 前置执行函数
 * @returns
 */
Function.prototype.before = function (callback) {
  // → 保存原函数引用
  var _that = this;
  return function () {
    // → 执行新函数，且保证 this 不被劫持，新函数接受的参数也会被原封不动地传入原函数，新函数在原函数之前执行
    callback.apply(this, arguments);
    // → 执行原函数并返回原函数的执行结果，并且保证 this 不被劫持
    return _that.apply(this, arguments);
  };
};

/**
 * 后置通知
 * @description 给方法加入后置切片函数，可以在执行方法之后执行一些操作
 * @param {Function} fun 后置函数
 * @returns
 */
Function.prototype.after = function (callback) {
  // → 保存原函数引用
  var _this = this;
  return function () {
    // → 执行原函数，并且保证 this 不被劫持
    var agent = _this.apply(_this, arguments);
    // → 执行新函数，且保证 this 不被劫持，新函数接受的参数也会被原封不动地传入原函数，新函数在原函数之前执行
    callback.apply(_this, arguments);
    // → 返回包含了原函数和新函数的"代理"函数
    return agent;
  };
};

/**
 * 环绕通知
 * @description 在方法执行前后分别执行
 * @param {*} beforeFn 前置函数
 * @param {*} afterFn  后置函数
 * @returns
 */
Function.prototype.around = function (beforeFn, afterFn) {
  var _that = this;
  return function () {
    return _that.before(beforeFn).after(afterFn).apply(this, arguments);
  };
};

// ———— 业务代码 ————
function logic() {
  console.log('service code...');
}

// → 1）测试前置通知
var logic1 = logic.before(function () {
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
logic2();
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
logic3();
/**
before
service code...
after */
