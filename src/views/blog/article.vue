<template>
  <div class="v-main">
    <div class="v-i-header">
      <div class="v-i-title">{{article.title}}</div>
      <div class="v-i-time">{{article.created_at.split(' ')[0]}}</div>
    </div>
    <div class="v-i-main">
      <div class="v-i-article">
        <div class="v-i-content" v-html="article.content"></div>
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
    this.article.content = markdown.toHTML(this.article.content);
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
    background-color: #6852ed;
    background-image: linear-gradient(40deg, #9c4dff 0, #42a7ff 100%);
    background-image: url(https://s2.ax1x.com/2019/10/26/KDyb6g.jpg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    position: relative;
    .v-i-title {
      margin: 10px 0;
      color: #fdd;
      font-size: 18px;
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
    width: 100%;
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
      .v-i-content {
        width: 100%;
        font-size: 13px;
      }
    }
  }
}
</style>
