export const log = (msg) => {
  console.log(msg);
};

export const renderWrap = () => {
  const oEle = document.createElement('div');
  oEle.className = 'wrap';
  oEle.textContent = 'China';
  document.body.appendChild(oEle);
};
