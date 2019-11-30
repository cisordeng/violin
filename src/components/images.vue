<template>
  <div class="v-images" :class="show ? 'v-i-active' : ''" @click="onClickClose">
    <div class="v-i-main">
      <!-- <div class="v-i-prev" :class="curImage.index > 0 ? 'v-i-active' : ''" @click="onClickPrev">
        <svg class="icon">
          <use xlink:href="#icon-prevx" />
        </svg>
      </div>-->
      <img class="v-i-curimage" :src="curImage.src" />
      <!-- <div
        class="v-i-next"
        :class="curImage.index < images.length - 1 ? 'v-i-active' : ''"
        @click="onClickNext"
      >
        <svg class="icon">
          <use xlink:href="#icon-nextx" />
        </svg>
      </div>-->
    </div>
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
  props: {},
  data() {
    return {
      show: false,
      curImage: {},
      images: []
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      this.$nextTick(() => {
        let contents = document.querySelectorAll(".content");
        contents.forEach(content => {
          content.addEventListener("click", this.onClickContent);
        });
      });
    }
  },
  methods: {
    onClickContent(event) {
      if (event.target.nodeName == 'IMG') {
        this.curImage = event.target;
        this.$forceUpdate();
        this.show = true;
      }
    },
    onClickClose() {
      this.show = false;
    },
    onClickPrev() {
      console.log("prev");
    },
    onClickNext() {
      console.log("next");
    }
  },

  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
a .content img {
  cursor: inherit;
}
.content img {
  cursor: zoom-in;
}
</style>>
<style lang="scss" scoped>
.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}
.v-images {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba($color: #000000, $alpha: 0.3);
  pointer-events: none;
  opacity: 0;
  transition: 0.3s;
  &.v-i-active {
    pointer-events: auto;
    opacity: 1;
    .v-i-main {
      transform: scale(1);
    }
  }
  .v-i-main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.5);
    transition: 0.5s;
    .v-i-prev,
    .v-i-next {
    }
    .v-i-curimage {
      cursor: zoom-out;
      max-width: 100%;
      max-height: 100%;
      // min-width: 500px;
      // min-height: 500px;
    }
  }
}
</style>
