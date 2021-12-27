/*
 * @Author: Lee
 * @Date: 2021-12-27 16:14:09
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-27 16:14:10
 */

/**
 * 修改元素标题
 * @param {*} id
 * @param {*} title
 */
export function setTitle(id, title) {
  const dom = document.getElementById(id);
  dom.textContent = title;
}
