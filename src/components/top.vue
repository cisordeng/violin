<template>
  <div v-show="pecent > 0" class="v-top" @click="onClickTop">
    <div class="v-i-up">
        <svg class="icon">
            <use xlink:href="#icon-up" />
        </svg>
    </div>
    <svg
        style="display: none;"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <defs>
            <symbol id="icon-up" viewBox="0 0 1024 1024">
                <title>icon-up</title>
                <path d="M830.24 685.76l11.328-11.312a16 16 0 0 0 0-22.64L530.448 340.688a16 16 0 0 0-22.64 0L196.688 651.808a16 16 0 0 0 0 22.64l11.312 11.312a16 16 0 0 0 22.624 0l288.496-288.512L807.632 685.76a16 16 0 0 0 22.624 0z"></path>
            </symbol>
        </defs>
    </svg>
  </div>
</template>

<script>
import Vue from "vue";
// import MusicPlayer from "../components/music_player";
// import Resource from '../lib/resource'

export default {
  props: {},
  data() {
    return {
        scrollTop: 0,
        pecent: 0,
    };
  },
  methods: {
    onClickTop() {
        document.documentElement.scrollTop = 0;
    },
    scrollToTop() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var canScrollTop = document.body.scrollHeight - document.body.offsetHeight;
        this.pecent = scrollTop / canScrollTop;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop);
  },
  destroyed() {
      window.removeEventListener('scroll', this.scrollToTop);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
.v-top {
    font-size: 20px;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 100%;
  color: #4b3f90;
  box-shadow: 0px 5px 10px 0px rgba(76,70,124,0.2);
  position: fixed;
  bottom: 50px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  cursor: pointer;
  transform: scale(1);
  transition: 0.5s all;
  &:hover {
      transform: scale(1.2);
  }
}
</style>
