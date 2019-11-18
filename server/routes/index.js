const path = require('path');

const routesArr = [
  {
    name: '/',
    routerName: 'index',
    fileName: '/home'
  }
];

const routes = (app) => {
  for (const router of routesArr.values()) {
    app.use(router.name, require(path.resolve(__dirname, `.${router.fileName}/${router.routerName}`)));
  }
};

module.exports = routes;
