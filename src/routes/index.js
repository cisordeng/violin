const Home = r => require(['views/home'], r);
const NotFound = r => require(['views/notfound'], r);
const Blog = r => require(['views/blog/blog'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
  {path: '/', component: Home},
  {path: '/home', redirect: {path: '/'}},
  {path: '/blog', component: Blog},
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
