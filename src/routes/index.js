const NotFound = r => require(['views/notfound'], r);

const About = r => require(['views/about/about'], r);

const Articles = r => require(['views/article/articles'], r);
const Article = r => require(['views/article/article'], r);
const EditArticle = r => require(['views/article/edit_article'], r);

const Words = r => require(['views/word/words'], r);
const Word = r => require(['views/word/word'], r);
const EditWord = r => require(['views/word/edit_word'], r);

const Messages = r => require(['views/message/messages'], r);

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
      title: '关于',
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
  }, {
    path: '/edit_article',
    component: EditArticle,
    meta: {
      keepAlive: true,
    },
  }, {
    path: '/friends',
    component: Words,
    meta: {
      keepAlive: true,
      title: '动态',
      isNav: true,
    },
  }, {
    path: '/word',
    component: Word,
  }, {
    path: '/edit_word',
    component: EditWord,
    meta: {
      keepAlive: true,
    },
  }, {
    path: '/messages',
    component: Messages,
    meta: {
      keepAlive: true,
      title: '留言',
      isNav: true,
    },
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


NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: true, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3, // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
  NProgress.start();

  next();
})

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  from.meta.scrollTop = document.querySelector("#app").scrollTop;
  if (to.meta && to.meta.keepAlive && to.meta.scrollTop) {
    setTimeout(() => {
      document.querySelector("#app").scrollTop = to.meta.scrollTop;
    }, 500)
  }

  NProgress.done();
})

export default router;
