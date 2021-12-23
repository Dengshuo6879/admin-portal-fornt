// 生成n位随机数
export const digitRandomNum = (n) => {
  let t = '';
  for (var i = 0; i < n; i++) {
    t += Math.floor(Math.random() * 10);
  }
  return t;
};
