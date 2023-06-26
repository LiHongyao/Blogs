// moduleB
define(['./moduleA'], function ({ sum }) {
  const getSum = (a, b) => sum(a, b);
  return { getSum };
});
