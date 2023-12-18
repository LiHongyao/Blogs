

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D
 */


import { calcOffset, getEl } from './utils.js';


/** @type {HTMLCanvasElement} */
const canvas = getEl("canvas");
canvas.width = 800;
canvas.height = 500;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

// -- 配置画笔
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle = "#000000"

// -- 先画一个和画布同样大小的矩形，在保存时可有背景颜色
ctx.fillRect(0, 0, canvas.width, canvas.height);
// -- 获取偏移信息
const { left, top } = calcOffset(canvas);

// -- 定义遍历记录信息
const histories = []; // 历史记录
let isPainting = false; // 记录画笔状态
let isEraser = false;
let targetLeft = left;
let targetTop = top;
let lastPoint = { x: 0, y: 0 }

// -- 公共方法
const saveData = (data) => {
  if (histories.length === 10) {
    histories.shift();
  }
  histories.push(data);
  console.log(histories);
}

// -- 绘制相关
/**
 * 画点函数
 * @param {*} x 
 * @param {*} y 
 * @param {*} radius 
 */
const drawCircle = (x, y, radius) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  if (isEraser) {
    ctx.clip()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
  }
}

/**
 * 绘制线条
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} x2 
 * @param {*} y2 
 */
const drawLine = (x1, y1, x2, y2) => {
  if (isEraser) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  } else {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }
}


/**
 * 修改画笔颜色
 * @param {*} color 
 */
const changeColor = (color) => {
  ctx.strokeStyle = color;
}

// -- 监听该函数
const start = (e) => {
  isPainting = true;

  e.stopPropagation();
  e.preventDefault();

  let x = 0;
  let y = 0;

  if (/touch/.test(e.type)) {
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
  } else {
    x = e.pageX;
    y = e.pageY;
  }
  x = x - targetLeft;
  y = y - targetTop;

  console.log(x, y, targetLeft, targetTop)

  lastPoint = { x, y };

  drawCircle(x, y, .5);

  // 记录操作
  const dot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  saveData(dot);
};
const move = (e) => {
  if (!isPainting) return;
  e.stopPropagation();
  e.preventDefault();

  let x = 0;
  let y = 0;

  if (/touch/.test(e.type)) {
    x = e.touches[0].pageX;
    y = e.touches[0].pageY;
  } else {
    x = e.pageX;
    y = e.pageY;
  }


  x = x - targetLeft;
  y = y - targetTop;

  const newPoint = { x, y };
  drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
  lastPoint = newPoint;
};
const end = () => {
  isPainting = false;
};


// -- 事件监听
canvas.addEventListener("touchstart", start, { passive: false });
canvas.addEventListener("touchmove", move, { passive: false });
canvas.addEventListener("touchend", end, { passive: false });

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", move);
canvas.addEventListener("mouseup", end);
canvas.addEventListener("mouseleave", end);



// -- 修改画笔粗细
const aRange = getEl("[type=range]");
aRange.oninput = (e) => {
  console.log(e);
  ctx.lineWidth = e.target.value;
}

// -- 修改颜色
const aColor = getEl("[type=color]");
aColor.onchange = (e) => {
  changeColor(e.target.value);
}

// -- 清空画布
const btnClear = getEl(".clear");
btnClear.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// -- 撤销操作
const undo = () => {
  if (histories.length === 0) return;
  ctx.putImageData(histories.pop(), 0, 0);
}
const btnUndo = getEl(".undo");
btnUndo.onclick = undo;


// -- 保存图片
const saveAsImage = () => {
  const b64 = canvas.toDataURL('image/png');
  const saveBtn = document.createElement("a");
  saveBtn.href = b64;
  saveBtn.download = 'brush__' + (new Date()).getTime();
  saveBtn.target = "_blank";
  saveBtn.click();
}
const btnSave = getEl(".save");
btnSave.onclick = saveAsImage;


// -- 橡皮擦

const eraser = () => {
  isEraser = true;
}
const btnEraser = getEl('.eraser');
btnEraser.onclick = eraser;



