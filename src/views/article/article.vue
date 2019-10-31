<template>
  <div class="v-main">
    <div class="v-i-header">
      <div class="v-i-title">{{article.title}}</div>
      <div class="v-i-time">{{article && article.created_at && article.created_at.split(' ')[0]}}</div>
    </div>
    <div class="v-i-main">
      <div class="v-i-article">
        <div class="v-i-content" v-html="article.markedContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
import MusicPlayer from "../../components/music_player";
import ArticleService from "../../services/article_service";
// import Resource from '../lib/resource'

export default {
  components: {
    "music-player": MusicPlayer
  },
  data() {
    return {
      article: {}
    };
  },
  methods: {},
  async mounted() {
    let id = this.$router.currentRoute.query.id;
    this.article = await ArticleService.getArticle(id);
    this.article.markedContent = markdown.toHTML(this.article.content);

    document.title = this.article.title;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.v-main {
  // width: 100%;
  // height: 100%;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  .v-i-header {
    width: 100%;
    height: 200px;
    background-image: linear-gradient(40deg, #9c4dff 0, #42a7ff 100%);
    // background-image: url(https://s2.ax1x.com/2019/10/26/KDyb6g.jpg);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NzAiIGhlaWdodD0iNDcwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoNzUsNjMsMTQ0KSI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE4IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI5IiBvcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMzkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEyIiBvcGFjaXR5PSIwLjA4MDY2NjY2NjY2NjY2NjY2IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNzAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjkiIG9wYWNpdHk9IjAuMDU0NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSI4NyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iOSIgb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjExNSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iNyIgb3BhY2l0eT0iMC4wMzczMzMzMzMzMzMzMzMzMyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE0MCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTEiIG9wYWNpdHk9IjAuMDcyMDAwMDAwMDAwMDAwMDEiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIxNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjE0IiBvcGFjaXR5PSIwLjA5OCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE4MyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMjAiIG9wYWNpdHk9IjAuMTUiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIyMDgiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjgiIG9wYWNpdHk9IjAuMDQ2IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMjM1IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNiIgb3BhY2l0eT0iMC4xMTUzMzMzMzMzMzMzMzMzNCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjI2MyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTEiIG9wYWNpdHk9IjAuMDcyMDAwMDAwMDAwMDAwMDEiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIyODgiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwIiBvcGFjaXR5PSIwLjA2MzMzMzMzMzMzMzMzMzM0IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMzA1IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNSIgb3BhY2l0eT0iMC4xMDY2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjMzOSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTkiIG9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMzMzQiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIzNzUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjYiIG9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNDAwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI1IiBvcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNDE5IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxOSIgb3BhY2l0eT0iMC4xNDEzMzMzMzMzMzMzMzMzNCIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjQ1MiIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTgiIG9wYWNpdHk9IjAuMTMyNjY2NjY2NjY2NjY2NjUiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIxOCIgeT0iMCIgd2lkdGg9IjkiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjM5IiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wODA2NjY2NjY2NjY2NjY2NiIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjcwIiB5PSIwIiB3aWR0aD0iOSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iODciIHk9IjAiIHdpZHRoPSI5IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMDU0NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIxMTUiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMDM3MzMzMzMzMzMzMzMzMzMiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIxNDAiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA3MjAwMDAwMDAwMDAwMDAxIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMTYwIiB5PSIwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wOTgiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIxODMiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjE1IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMjA4IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA0NiIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjIzNSIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTE1MzMzMzMzMzMzMzMzMzQiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIyNjMiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA3MjAwMDAwMDAwMDAwMDAxIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMjg4IiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wNjMzMzMzMzMzMzMzMzMzNCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjMwNSIgeT0iMCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTA2NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIzMzkiIHk9IjAiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzMzM0IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMzc1IiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjAyODY2NjY2NjY2NjY2NjY2NyIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjQwMCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjQxOSIgeT0iMCIgd2lkdGg9IjE5IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMzMzQiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSI0NTIiIHk9IjAiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjEzMjY2NjY2NjY2NjY2NjY1IiBmaWxsPSIjMjIyIj48L3JlY3Q+PC9zdmc+);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    position: relative;
    text-shadow: -5px 5px 0 rgba(0,0,0,0.1);
    .v-i-title {
      margin: 10px 0;
      color: #fdd;
      font-size: 28px;
    }
    .v-i-time {
      margin: 10px;
      color: #fdd;
      position: absolute;
      font-size: 14px;
      bottom: 0;
      left: 0;
    }
  }
  .v-i-main {
    // width: 100%;
    display: flex;
    justify-content: center;
    .v-i-article {
      width: 650px;
      padding: 20px 30px;
      margin: 20px 0;
      background: #ffffff;
      box-shadow: 0px 0px 3px #ccc;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .v-i-content {
        width: 100%;
        font-size: 13px;
      }
    }

    @media screen and (max-width: 720px), (max-height: 500px) {
      .v-i-article {
        width: 90%;
      }
    }
  }
}
</style>
