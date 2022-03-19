/*
 * @Author: Lee
 * @Date: 2022-03-19 08:32:46
 * @LastEditors: Lee
 * @LastEditTime: 2022-03-19 08:47:28
 */

class Single {
  // -- 通过构造函数创建单例
  constructor() {
    if (!Single.prototype.instance) {
      Single.prototype.instance = this;
    }
    return Single.prototype.instance;
  }

  // -- 通过类方法获取单例
  static getSingle() {
    if (!Single.prototype.instance) {
      return new Single();
    }
    return Single.prototype.instance;
  }

  sayHi() {
    console.log('Hello, Signle!');
  }
}

let s1 = Single.getSingle();
let s2 = Single.getSingle();
let s3 = new Single();
let s4 = new Single();


console.log(s1 === s2); // true
console.log(s3 === s4); // true
console.log(s1 === s3); // true

s1.sayHi();
s2.sayHi();
s3.sayHi();
s4.sayHi();
