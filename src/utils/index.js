/* global layui */
// 客户端的工具

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

/**
 * checkDate
 * 检查日期
 * @param date
 * @returns {boolean}
 */
export const checkDate = (date) => {
  if (typeof date === 'string') {
    const mts = date.match(/(\/Date(\d+)\/)/);
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2]);
    }
  }
  date = new Date(date);
  return !(!date || date.toUTCString() === 'Invalid Date');
};

/**
 * dateFormat
 * 日期格式化 yyyy-MM-dd hh:mm:ss:SS q
 * @param date
 * @param format
 * @returns {*}
 */
export const dateFormat = (date, format) => {
  if (!checkDate(date)) {
    return '';
  }
  date = new Date(date);
  const map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };

  return format.replace(/([yMdhmsqS])+/g, (all, t) => {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
};

/**
 * dateFormatMapping
 * 映射本（上、下）周，21天的中文表达
 * @param date
 * @param prefixFormat 仅支持 yyyy-MM-dd
 * @param suffixFormat 仅支持 hh:mm:ss:SS q
 * @returns {*}
 */
export const dateFormatMapping = (date, prefixFormat, suffixFormat) => {
  const curTimestamp = new Date().getTime();
  const _date = new Date(curTimestamp).getDate();
  const day = new Date(curTimestamp).getDay();
  const mondayTimestamp = new Date(curTimestamp).setDate(_date - (day ? day - 1 : 6));
  const weekZh = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const prevPrefix = '上';
  const nextPrefix = '下';
  const mapping = {
    '+0': '今天',
    '-1': '昨天',
    '-2': '前天',
    '+1': '明天',
    '+2': '后天'
  };
  const mappingFormat = {};
  const suffix = suffixFormat ? dateFormat(date, suffixFormat) : '';
  for (const [key, d] of weekZh.entries()) {
    const mondayDate = new Date(mondayTimestamp).getDate();
    mappingFormat[dateFormat(new Date(mondayTimestamp).setDate(mondayDate - 7 + key), prefixFormat)] = `${prevPrefix}${d}`;
    mappingFormat[dateFormat(new Date(mondayTimestamp).setDate(mondayDate + key), prefixFormat)] = `${d}`;
    mappingFormat[dateFormat(new Date(mondayTimestamp).setDate(mondayDate + 7 + key), prefixFormat)] = `${nextPrefix}${d}`;
  }
  for (const [key, d] of Object.entries(mapping)) {
    mappingFormat[dateFormat(new Date(curTimestamp).setDate(_date + parseInt(key)), prefixFormat)] = d;
  }
  return (mappingFormat[dateFormat(date, prefixFormat)] || dateFormat(date, prefixFormat)) + suffix;
};

/**
 * maxNum2Decimal
 * 最大保留小数位，不会补0
 * @param value
 * @param decimal
 * @returns {number}
 */
export const maxNum2Decimal = (value, decimal = 2) => {
  return parseFloat(value.toFixed(decimal));
};
