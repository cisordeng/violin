const Home = r => require(['views/home'], r);
const NotFound = r => require(['views/notfound'], r);
const Articles = r => require(['views/blog/articles'], r);
const Article = r => require(['views/blog/article'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
  {path: '/', component: Home},
  {path: '/home', redirect: {path: '/'}},
  {path: '/blog', component: Articles},
  {path: '/blog/article', component: Article},
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
