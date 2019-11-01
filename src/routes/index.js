const NotFound = r => require(['views/notfound'], r);

const About = r => require(['views/about/about'], r);
const Articles = r => require(['views/article/articles'], r);
const Article = r => require(['views/article/article'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [{
    path: '/about',
    redirect: {path: '/'},
  }, {
    path: '/',
    component: About,
    meta: {
      isNav: true,
    }
  }, {
    path: '/articles',
    component: Articles,
    meta: {
      keepAlive: true,
      title: '笔记',
      isNav: true,
    },
  }, {
    path: '/article',
    component: Article,
  },
].map((route, index) => {
  route.path = rootPath + route.path;
  if (!route.meta) {
    route.meta = {};
  }
  route.meta.index = index;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound', meta: { index: routes.length}});


// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  from.meta.scrollTop = document.querySelector("#app").scrollTop;
  if (to.meta && to.meta.keepAlive && to.meta.scrollTop) {
    setTimeout(() => {
      document.querySelector("#app").scrollTop = to.meta.scrollTop;
    }, 1)
  }
})

export default router;
