/* global layui */

/**
 * loadLayuiModule
 * 用于layui的模块加载 返回加载模块或者模块数组
 * @param modules string | array
 * @returns {Promise<any>}
 */
export const loadLayuiModule = (modules) => {
  return new Promise((resolve) => {
    layui.use(modules, () => {
      if (typeof modules === 'string') return resolve(layui[modules]);
      const mds = modules.map(m => layui[m]);
      return resolve(mds);
    });
  });
};

/**
 * getParams
 * 获取地址栏的参数
 * @param param string
 * @returns {*}
 */
export const getParams = (param) => {
  const params = window.location.search.substr(1).split('&');
  const pb = {};
  for (const ele of params.values()) {
    const KV = ele.split('=');
    pb[decodeURI(KV[0])] = decodeURI(KV[1]);
  }
  return pb[param];
};
