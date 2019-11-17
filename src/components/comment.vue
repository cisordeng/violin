<template>
  <div class="v-main">
    <div class="v-i-main">
      <div class="v-i-comment" v-for="comment in markedComments" :key="comment.content">
        <div class="v-i-poster">
          <img class="v-i-avatar" :src="comment.user.avatar" />
          <div class="v-i-info">
            <div class="v-i-name">{{comment.user.name}}</div>
            <div class="v-i-time">{{comment.created_at}}</div>
          </div>
        </div>
        <div class="v-i-content content" v-html="comment.markedContent"></div>
      </div>
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
  props: {
    comments: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  computed: {
    markedComments() {
      this.comments.map(comment => {
        comment.markedContent = MavonEditor.markdownIt.render(comment.content);
        return comment;
      });
      return this.comments;
    }
  },
  methods: {},
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
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 0px 3px #ccc;
    box-sizing: border-box;
    .v-i-comment {
      width: 100%;
      padding: 20px 30px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-decoration: inherit;
      color: inherit;
      &:not(:last-child):after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 90%;
        height: 0px;
        border-bottom: 1px dashed #ccc;
      }
      .v-i-poster {
        width: 100%;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .v-i-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        .v-i-info {
          margin: 0 0 0 10px;
          .v-i-name {
            font-size: 12px;
            font-weight: bold;
          }
          .v-i-time {
            font-size: 12px;
            color: #808080;
          }
        }
      }
      .v-i-content {
        width: 100%;
        font-size: 12px;
        line-height: 18px;
        padding: 0 0 0 60px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
