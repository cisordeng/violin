// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import Vuex from 'vuex'
// import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import App from './app'
import router from './routes'
import storeOption from './vuex/store'

// Vue.use(Vuex);
// Vue.use(VueRouter);
// Vue.use(VueResource);

// import mavoneditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// Vue.use(MavonEditor)

// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false,
//   highlight: function (code, lang) {
//         if (lang && hljs.getLanguage(lang)) {    
//           return hljs.highlight(lang, code, true).value;
//         } else {
//           return hljs.highlightAuto(code).value;
//         }
//     }
// });
MavonEditor.markdownIt.options.highlight = function (code, lang) {
  if (lang && hljs.getLanguage(lang)) {    
    return '<pre class="hljs"><code>' + hljs.highlight(lang, code, true).value +
    '</code></pre>';
  } else {
    return '<pre class="hljs"><code>' + hljs.highlightAuto(code).value +
    '</code></pre>';
  }
};

Vue.config.silent = true;

// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(storeOption);

window.__lendApp__ = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

// 输入框在虚拟键盘弹出时，自动滚动到可见位置
document.body.addEventListener('click', function (event) {
  var element = event.target;
  var tags = {
    'INPUT': 1,
    'TEXTAREA': 1,
  }
  if ((element.tagName in tags) ) {
    setTimeout(function(){
      element.scrollIntoViewIfNeeded();
      // console.log('scrollIntoViewIfNeeded');
    }, 400);
  }
}, false);
