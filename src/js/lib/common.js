// import 'amfe-flexible'; // 暂时不用，会用的自行解封 ☠
import { loadLayuiModule } from '@/utils/index';

// 注意：导航 依赖 element 模块，否则无法进行功能性操作
$(() => {
  (async (win, undefined) => {
    const [element] = await loadLayuiModule(['element']);
    const headerNavsMapping = {
      index: ['/'],
      welcome: ['/welcome', '/welcome/']
    };
    setNavsActive('#pageHeader .layui-layout-left ', headerNavsMapping);
  })(window);
});

const setNavsActive = (selector, mapping) => {
  const pathName = window.location.pathname;
  let acNav = null;
  for (const [nav, group] of Object.entries(mapping)) {
    if (group.includes(pathName)) acNav = nav;
  }
  $(`${selector} .layui-nav-item[data-nav="${acNav}"]`).addClass('layui-this');
};
