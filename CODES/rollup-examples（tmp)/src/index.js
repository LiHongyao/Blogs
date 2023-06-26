import { log, renderWrap } from '@/helper.js';
import "./css/index.css";

log('Hello, Rollup!');
renderWrap();

const sum = (a, b) => a + b;
console.log(`sum = ${sum(10, 20)}`);

const p = new Promise((resolve, reject) => {
  resolve('Hello');
});
p.then((msg) => {
  console.log(msg);
});
