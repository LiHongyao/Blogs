/*
 * @Author: Lee
 * @Date: 2022-03-18 17:35:26
 * @LastEditors: Lee
 * @LastEditTime: 2022-03-18 18:11:04
 */

// -- 发布者
class Publisher {
  constructor(name, context) {
    this.name = name;
    this.context = context;
  }
  publish(type, content) {
    this.context.publish(type, content);
  }
}
// -- 经纪人（发布订阅中心）
class Broker {
  constructor() {
    this.messages = {};
    this.listeners = {};
  }
  // @发布
  publish(type, content) {
    const msg = this.messages[type];
    if (!msg) {
      this.messages[type] = [];
    }
    this.messages[type].push(content);
  }
  // @订阅
  subscribe(type, cb) {
    // 判断当前type是否已存在订阅者
    // 如果不存在，则构造数组存储
    // 如果已存在，则追加新的订阅者
    const listener = this.listeners[type];
    if (!listener) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(cb);
  }
  // @通知
  notify(type) {
    const messages = this.messages[type];
    const listeners = this.listeners[type] || [];
    listeners.forEach((cb, index) => cb(messages[index]));
  }
}
// -- 订阅者
class Subscriber {
  constructor(name, context) {
    this.name = name;
    this.context = context;
  }
  subscribe(type, cb) {
    this.context.subscribe(type, cb);
  }
}

// --------- 示例 -----------
// -- 创建事件中心
const broker = new Broker();

// -- 创建发布者
const publisherA = new Publisher('京东', broker);
publisherA.publish('推送', '这是一条推送消息！');

// -- 创建订阅者
const subscriberA = new Subscriber('张三', broker);
subscriberA.subscribe('推送', (res) => {
  console.log('张三收到消息：', res);
});

// -- 发送通知
broker.notify('推送');
