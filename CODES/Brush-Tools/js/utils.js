/*
 * @Author: Lee
 * @Date: 2023-08-27 16:14:22
 * @LastEditors: Lee
 * @LastEditTime: 2023-08-29 17:57:30
 * @Description: 
 */


/**
 * 获取DOM元素
 * @param {*} sel 
 * @returns 
 */
export const getEl = (sel) => {
  return document.querySelector(sel);
}


/**
 * 递归计算元素的偏移
 * @param {*} dom 
 * @returns 
 */
export const calcOffset = (dom) => {
  let parentNode = dom.offsetParent;
  const offset = {
    top: dom.offsetTop,
    left: dom.offsetLeft,
  }
  while (parentNode) {
    offset.top += parentNode.offsetTop;
    offset.left += parentNode.offsetLeft;
    parentNode = parentNode.offsetParent;
  }
  return offset;
}
