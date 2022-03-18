/*
 * @Author: Lee
 * @Date: 2022-03-18 17:07:34
 * @LastEditors: Lee
 * @LastEditTime: 2022-03-18 17:33:08
 */

// -- 被观察者
class Subject {
  constructor() {
    // -- 存储观察者
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
  }
  remove(observer) {
    const index = this.observers.findIndex(observer);
    index !== -1 && this.observers.splice(index, 1);
  }
  notify() {
    this.observers.forEach((o) => {
      o.update();
    });
  }
}

// -- 观察者
class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`${this.name}：updated!`);
  }
}

// --------- 示例 -----------
// -- 创建被观察者
const subject = new Subject();
// -- 创建观察者
const obs1 = new Observer('张三');
const obs2 = new Observer('李四');
// -- 添加观察者
subject.add(obs1);
subject.add(obs2);
// -- 触发通知
subject.notify();
