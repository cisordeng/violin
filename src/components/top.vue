<template>
  <div class="v-top" :class="pecent > 0 ? '' : 'v-i-hide'">
    <div class="v-i-up" @click="onClickTop">
      <svg class="icon">
        <use xlink:href="#icon-up" />
      </svg>
    </div>
    <div class="v-i-scroll" @click="onClickScroll">
      <div class="v-i-scrollBar" :style="`height: ${pecent * 100}%`"></div>
    </div>
    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-up" viewBox="0 0 1024 1024">
          <title>icon-up</title>
          <path
            d="M830.24 685.76l11.328-11.312a16 16 0 0 0 0-22.64L530.448 340.688a16 16 0 0 0-22.64 0L196.688 651.808a16 16 0 0 0 0 22.64l11.312 11.312a16 16 0 0 0 22.624 0l288.496-288.512L807.632 685.76a16 16 0 0 0 22.624 0z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
      scrollTop: 0,
      pecent: 0
    };
  },
  methods: {
    onClickTop() {
      document.querySelector("#app").scrollTop = 0;
    },
    onClickScroll(e) {
      var canScrollTop =
        document.querySelector("#app").scrollHeight -
        document.querySelector("#app").offsetHeight;
      this.pecent = e.offsetY / e.target.offsetHeight;
      document.querySelector("#app").scrollTop = this.pecent * canScrollTop;
    },
    scroll() {
      var scrollTop = document.querySelector("#app").scrollTop;
      var canScrollTop =
        document.querySelector("#app").scrollHeight -
        document.querySelector("#app").offsetHeight;
      this.pecent = scrollTop / canScrollTop;
    }
  },
  mounted() {
    document.querySelector("#app").addEventListener("scroll", this.scroll);
  },
  destroyed() {
    document.querySelector("#app").removeEventListener("scroll", this.scroll);
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
  opacity: 1;
  transition: 0.5s all;
  &.v-i-hide {
    opacity: 0;
    pointer-events: none;
  }
  .v-i-up {
    font-size: 20px;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 100%;
    color: #4b3f90;
    box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
    position: fixed;
    bottom: 50px;
    right: 30px;
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
  .v-i-scroll {
    width: 6px;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    cursor: pointer;
    .v-i-scrollBar {
      width: 6px;
      height: 100%;
      background: #fff;
      border-radius: 0 0 5px 5px;
      box-shadow: 0px 3px 5px #ccc;
      transition: 0.5s;
      pointer-events: none;
      // &:after {
      //   content: "";
      //   width: 6px;
      //   height: 6px;
      //   background: #4b3f90;
      //   border-radius: 5px;
      //   // box-shadow: 0px -6px 6px #4b3f90;
      //   position: absolute;
      //   right: 0;
      //   bottom: 0;
      //   transition: 0.5s;
      // }
    }
  }
}
</style>
