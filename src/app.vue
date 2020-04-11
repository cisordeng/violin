<template>
  <div id="app">
    <top></top>
    <navs></navs>
    <images></images>
    <music-player></music-player>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import MusicPlayer from "components/music_player";
import Top from "components/top";
import Navs from "components/navs";
import Images from "components/images";
export default {
  name: "App",
  components: {
    "music-player": MusicPlayer,
    top: Top,
    navs: Navs,
    images: Images
  },
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba($color: #fff, $alpha: 0.3);
}
#app {
  width: calc(100% + 6px);
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", "Microsoft Yahei",
    "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif;
  word-break: break-word;
  line-height: 1.8;
  img {
    max-width: 100%;
    max-height: 320px;
    padding: 5px;
    box-sizing: border-box;
  }
  video {
    max-width: 100%;
    max-height: 320px;
    padding: 5px;
    box-sizing: border-box;
  }
  pre {
    overflow-x: overlay;
    border-radius: 5px;
    padding: 0.75rem 1.5rem;
    margin: 0.85rem 0;
    line-height: 1.4;
  }
  mark {
    color: inherit;
    background: #dedede;
    padding: 0 5px;
    margin: 0 3px;
    border-radius: 3px;
    color: #333;
  }
  a {
    color: #4b3f90;
    text-decoration: none;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -1px;
      left: 0;
      background: #4b3f90;
      transition: 0.2s all;
    }
    &:hover {
      &::after {
        width: 100%;
      }
    }
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  left: 0;
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
