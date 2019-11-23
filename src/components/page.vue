<template>
  <div class="v-main">
    <div v-if="pageInfo.max_page > 1" class="v-i-main">
      <div class="v-i-prev" :class="pageInfo.has_prev ? 'v-i-active' : ''" @click="onClickPrev">
        <svg class="icon">
          <use xlink:href="#icon-prevx" />
        </svg>
      </div>
      <div class="v-i-page">
        <div class="v-i-curpage">{{pageInfo.cur_page}}</div>
        <div class="v-i-split">/</div>
        <div class="v-i-maxpage">{{pageInfo.max_page}}</div>
      </div>
      <div class="v-i-next" :class="pageInfo.has_next ? 'v-i-active' : ''" @click="onClickNext">
        <svg class="icon">
          <use xlink:href="#icon-nextx" />
        </svg>
      </div>
    </div>
    <div v-else-if="pageInfo.max_page == 1" class="v-i-tip"></div>
    <div v-else class="v-i-tip">这里什么也没有...</div>
    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-prevx" viewBox="0 0 1024 1024">
          <title>上一页</title>
          <path
            d="M612.5824 712.96a25.6 25.6 0 0 1-36.1984 36.1728l-199.1168-199.1168a25.6 25.6 0 0 1 0-36.1984l199.1168-199.1168a25.6 25.6 0 0 1 36.1984 36.1984l-181.0176 181.0176 180.992 181.0176z"
          />
        </symbol>
        <symbol id="icon-nextx" viewBox="0 0 1024 1024">
          <title>下一页</title>
          <path
            d="M411.4176 712.96a25.6 25.6 0 0 0 36.1984 36.1728l199.1168-199.1168a25.6 25.6 0 0 0 0-36.1984l-199.1168-199.1168a25.6 25.6 0 1 0-36.1984 36.1984l181.0176 181.0176-180.992 181.0176z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    pageInfo: {
      type: Object,
      default: {
        has_next: false,
        has_prev: false,
        cur_page: 1,
        max_page: 1,
        prev: 0,
        next: 0,
        total_count: 0
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickPrev() {
      if (this.pageInfo.has_prev) {
        this.$emit("changePage", "prev");
        this.onTop();
      }
    },
    onClickNext() {
      if (this.pageInfo.has_next) {
        this.$emit("changePage", "next");
        this.onTop();
      }
    },
    onTop() {
      document.querySelector("#app").scrollTop = 0;
    },
  },
  mounted() {}
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
.v-main {
  width: 100%;
  .v-i-main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .v-i-prev,
    .v-i-next {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 25px;
      width: 50px;
      height: 50px;
      background: #fff;
      border-radius: 100%;
      box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
      cursor: pointer;
      margin: 0 30px;
      opacity: 0;
      pointer-events: none;
      transform: scale(1);
      transition: 0.5s all;
      &.v-i-active {
        opacity: 1;
        pointer-events: auto;
        color: #4b3f90;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .v-i-page {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4b3f90;
      font-size: 13px;
      .v-i-curpage,
      .v-i-maxpage {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
      }
      .v-i-split {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        font-weight: bold;
      }
    }
  }
  .v-i-tip {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
  }
}
</style>
