const NotFound = r => require(['views/notfound'], r);

const Home = r => require(['views/home'], r);
const Article = r => require(['views/article/article'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
  {path: '/', component: Home},
  {path: '/home', redirect: {path: '/'}},
  {path: '/article', component: Article},
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
