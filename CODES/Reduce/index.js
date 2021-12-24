/*
 * @Author: Li-HONGYAO
 * @Date: 2021-04-30 10:24:44
 * @LastEditTime: 2021-04-30 14:16:38
 * @LastEditors: Li-HONGYAO
 * @Description:
 * @FilePath: \源码\01. Reduce\index.js
 */

(function () {
  // 1. 累加累乘
  console.log(accumulation(1, 2, 3, 4, 5)); // 15
  console.log(multiplication(1, 2, 3, 4, 5)); // 120

  // 2. 权重求和
  const scores = [
    { score: 90, subject: "chinese", weight: 0.5 },
    { score: 95, subject: "math", weight: 0.3 },
    { score: 85, subject: "english", weight: 0.2 },
  ];
  const result = scores.reduce((t, v) => t + v.score * v.weight, 0);
  console.log(result); // 90.5
  // 3. 代替reverse
  console.log(reverse([1, 2, 3, 4])); //  [4, 3, 2, 1]

  // 4. 代替map和filter
  const arr = [0, 1, 2, 3];
  // 代替map：[0, 2, 4, 6]
  const a = arr.map((v) => v * 2);
  const b = arr.reduce((t, v) => [...t, v * 2], []);

  // 代替filter：[2, 3]
  const c = arr.filter((v) => v > 1);
  const d = arr.reduce((t, v) => (v > 1 ? [...t, v] : t), []);

  // 代替map和filter：[4, 6]
  const e = arr.map((v) => v * 2).filter((v) => v > 2);
  const f = arr.reduce((t, v) => (v * 2 > 2 ? [...t, v * 2] : t), []);

  // 5. 代替some和every
  const grades = [
    { score: 605, subject: "chinese" },
    { score: 60, subject: "math" },
    { score: 80, subject: "english" },
  ];

  // 代替some：至少一门合格
  const isAtLeastOneQualified = grades.reduce(
    (t, v) => (t || v.score >= 60 ? true : false),
    false
  ); // true
  console.log(isAtLeastOneQualified);

  // 代替every：全部合格
  const isAllQualified = grades.reduce((t, v) =>
    t && v.score >= 60 ? true : false,
    true
  ); // false
  console.log(isAllQualified);
})();
