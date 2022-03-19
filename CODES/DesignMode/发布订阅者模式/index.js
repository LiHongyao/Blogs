/*
 * @Author: Lee
 * @Date: 2022-03-18 17:35:26
 * @LastEditors: Lee
 * @LastEditTime: 2022-03-19 08:32:21
 */

// -- 发布订阅中心
class PubSub {
  constructor() {
    // 1、记录发布的消息
    this.messages = {};
    // 2、存储订阅者
    this.listeners = {};
  }
  // @发布
  publish(type, content) {
    // 1、获取当前主题发布的消息集合
    const msg = this.messages[type];
    // 2、如果不存在，则初始化存储该主题消息的容器
    if (!msg) {
      this.messages[type] = [];
    }
    // 3、将最新发布的消息存入容器中
    this.messages[type].push(content);
  }
  // @订阅
  subscribe(type, cb) {
    // 1、获取当前主题所有的订阅者
    const listener = this.listeners[type];
    // 2、如果不存在，则初始化存储该主题订阅者的容器
    if (!listener) {
      this.listeners[type] = [];
    }
    // 3、将订阅者存入容器中
    this.listeners[type].push(cb);
  }
  // @通知
  notify(type) {
    // 1、获取当前主题下发布的消息
    const messages = this.messages[type];
    // 2、获取当前主题下的定于这
    const listeners = this.listeners[type];
    // 3、遍历订阅者并逐一推送消息
    if (messages && listeners) {
      listeners.forEach((cb, index) => cb(messages));
    }
  }
}

// -- 发布者
class Publisher {
  constructor(name, context) {
    // 1、标识符（可用于记录发布者名称）
    this.name = name;
    // 2、上下文（这里用于存储发布订阅者）
    this.context = context;
  }
  publish(type, content) {
    // 1、通过发布订阅者发布消息（type：主题；content：发布内容）
    this.context.publish(type, content);
  }
}
// -- 订阅者
class Subscriber {
  constructor(name, context) {
    // 1、标识符（可用于记录订阅者名称）
    this.name = name;
    // 2、上下文（这里用于存储发布订阅者）
    this.context = context;
  }
  subscribe(type, cb) {
    // 1、通过发布订阅者订阅（type：主题；cb：回调函数 -- 主要用于发布消息时回调）
    this.context.subscribe(type, cb);
  }
}

// --------- 示例 -----------
// -- 创建事件中心
const pubsub = new PubSub();

// -- 创建发布者
const publisherA = new Publisher('发布者1', pubsub);
publisherA.publish('主题1', '你好！');
publisherA.publish('主题1', '世界！');

// -- 创建订阅者
const subscriberA = new Subscriber('张三', pubsub);
subscriberA.subscribe('主题1', (res) => {
  console.log('张三收到消息：', res);
});

const subscriberB = new Subscriber('李四', pubsub);
subscriberB.subscribe('主题1', (res) => {
  console.log('李四收到消息：', res);
});

// -- 发送通知
pubsub.notify('主题1');
