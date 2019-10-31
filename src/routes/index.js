const NotFound = r => require(['views/notfound'], r);

const Home = r => require(['views/home'], r);
const Article = r => require(['views/article/article'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [{
  path: '/home',
  redirect: {path: '/'},
  }, {
    path: '/',
    component: Home,
    meta: {
      keepAlive: true,
    },
  }, {
    path: '/article',
    component: Article,
    // meta: {
    //   keepAlive: true,
    // },
  },
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound'});


// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

router.beforeEach((to, from, next) => {
  // ...
  from.meta.scrollTop = document.querySelector("#app").scrollTop;
  console.log(from.meta);
  if (to.meta.keepAlive && to.meta.scrollTop) {
    setTimeout(() => {
      document.querySelector("#app").scrollTop = to.meta.scrollTop;
    }, 1)
  }
  next()
})

export default router;
