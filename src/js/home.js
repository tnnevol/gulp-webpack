// import '@/utils/webpack.hot.refresh';
import '_less/home.less';
require('../views/home.ejs');

const as = async () => {
  const text = 'hello world';
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const a = [1, 2, 3];
      console.log(a.includes(3));
      return resolve();
    }, 2000);
  });
  return text;
};
(async () => {
  console.log(await as());
})();
