<template>
  <div id="app">
    <music-player></music-player>
    <top></top>
    <navs></navs>
    <images></images>
    <keep-alive>
      <transition :name="transitionName">
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import MusicPlayer from "components/music_player";
import Top from "components/top";
import Navs from "components/navs";
import Images from "components/images";
export default {
  name: 'App',
  components: {
    "music-player": MusicPlayer,
    "top": Top,
    "navs": Navs,
    "images": Images,
  },
  data() {
    return {
      transitionName:''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      if( to.meta.index < from.meta.index){
        this.transitionName = 'slide-right';
      }else{
        this.transitionName = 'slide-left';
      }
    }
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
::-webkit-scrollbar {
    width: 10px;
}
::-webkit-scrollbar-thumb {
	background-color: #dedede;
}
#app {
  width: calc(100% + 10px);
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background: #f0f0f0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.main {
  background-image: url(https://i.ibb.co/vctBJnd/M9WzY4.png);
}

.content {
    font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New",
      "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
    word-break: break-word;
}
.content img {
  max-width: 100%;
  max-height: 320px;
  padding: 5px;
  box-sizing: border-box;
}
.content pre {
  overflow-x: auto;
}
.content mark {
  color: inherit;
  background: #dedede;
  padding: 0 3px;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    will-change: transform;
    transition: all .3s;
    position: absolute;
    width:100%;
    left:0;
}
.slide-right-enter {
    transform: translateX(-100%);
}
.slide-right-leave-active {
    transform: translateX(100%);
}
.slide-left-enter {
    transform: translateX(100%);
}
.slide-left-leave-active {
    transform: translateX(-100%);
}
</style>
