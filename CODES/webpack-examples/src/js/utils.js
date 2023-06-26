/*
 * @Author: Lee
 * @Date: 2023-06-02 11:14:48
 * @LastEditors: Lee
 * @LastEditTime: 2023-06-02 14:24:49
 * @Description:
 */
export function renderHello() {
  const oEle = document.createElement('div');
  oEle.textContent = 'Hello，Webpack!';
  oEle.className = 'hello';
  document.body.appendChild(oEle);
}

export function renderImg() {
  const oEle = document.createElement('div');
  const oImg = document.createElement('img');
  oImg.src = require('../images/02.png');
  oImg.width = 50;
  oEle.appendChild(oImg);
  document.body.appendChild(oEle);
}

export function renderBgBox() {
  const oEle = document.createElement('div');
  oEle.className = 'bgBox';
  document.body.appendChild(oEle);
}

console.log("hi!!!");
