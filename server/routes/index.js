const path = require('path');

const routesArr = [
  {
    name: '/',
    routerName: 'index',
    fileName: '/index'
  },
  {
    name: '/welcome',
    routerName: 'index',
    fileName: '/welcome'
  }
];

const routes = (app) => {
  for (const router of routesArr.values()) {
    app.use(router.name, require(path.resolve(__dirname, `.${router.fileName}/${router.routerName}`)));
  }
};

module.exports = routes;
