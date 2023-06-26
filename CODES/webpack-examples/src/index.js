/*
 * @Author: Lee
 * @Date: 2023-06-01 22:14:22
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-02 16:39:14
 * @Description:
 */


import axios from 'axios';
import _ from 'lodash';
import { renderHello, renderImg, renderBgBox } from '@/js/utils.js';

import '@/css/common.css';
import '@/css/index.less';


// 1. 动态追加元素
function component() {
  const element = document.createElement('div');
  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
document.body.appendChild(component());

// 2. 测试模块热替换
if (module.hot) {
  module.hot.accept(['@/js/utils.js'], function () {
    console.log('有模块更新啦~');
  });
}

// 3. 渲染元素
renderHello();
renderImg();
renderBgBox();
console.log(123 + '!!!!');

// 4. 测试ESNext → ES5
const msg = 'Hello, Webpack!';
const print = (msg) => {
  console.log(msg);
};
print(msg);
const p = new Promise((resolve, reject) => {
  resolve('Hi!');
});
console.log(p);

// 5. 测试devServer.proxy
axios.get('/api/users').then((resp) => {
  console.log(resp.data);
});
