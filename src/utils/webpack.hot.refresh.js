// console.log(process.env.NODE_ENV)
// const isDev = process.env.NODE_ENV === 'development';
// 在开发环境下，使用 raw-loader 引入 ejs 模板文件，强制 webpack 将其视为需要热更新的一部分 bundle
// if (isDev) {
//   require('raw-loader!../views/home.ejs');
// }

// if (module.hot) {
//   // const address = window.location.href;
//   module.hot.accept();
//   console.log(`热更新监听中...${window.location.href}`);
//   /**
//    * 这种热更新方式需要注意：
//    * 如果你在元素上之前绑定了事件，那么热更新之后，这些事件可能会失效
//    */
//   module.hot.dispose((cb) => {
//     console.log('refresh');
//     // window.location.reload();
//   });
// }
