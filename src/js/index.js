import './lib/common';
import '_less/index.less';
import 'raw-loader!@/views/index.ejs';

const $lay = window.layui;

// 注意：导航 依赖 element 模块，否则无法进行功能性操作
$lay.use('element', function () {
  // const element = $lay.element;
});
