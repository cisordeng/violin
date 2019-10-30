<template>
  <div class="v-main">
    <div class="v-i-header">
      <img class="v-i-avatar" src="https://s2.ax1x.com/2019/10/26/KBxNDJ.gif" />
      <div class="v-i-slogan">我是谁，我在哪，我在干虾米</div>
    </div>
    <div class="v-i-main">
      <div class="v-i-articles">
        <div v-for="article in articles" :key="article.name" class="v-i-article">
          <div class="v-i-time">
            <div class="v-i-year">{{article.created_at.split(' ')[0].split('-')[0]}}</div>
            <div class="v-i-month">{{article.created_at.split(' ')[0].split('-')[1]}}月</div>
            <div class="v-i-day">{{article.created_at.split(' ')[0].split('-')[2]}}</div>
          </div>
          <router-link class="v-i-title" :to="{ path: `/blog/article/`, query: { id: article.id } }">{{article.title}}</router-link>
          <div class="v-i-content">{{article.content}}</div>
          <router-link class="v-i-more" :to="{ path: `/blog/article/`, query: { id: article.id } }">
            <div class="v-i-text">阅读全文</div>
          </router-link>
        </div>
      </div>
      <div class="v-i-paging"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MusicPlayer from "../../components/music_player";
import ArticleService from "../../services/article_service";

export default {
  components: {
    "music-player": MusicPlayer
  },
  data() {
    return {
      articles: []
    };
  },
  methods: {},
  async mounted() {
    this.articles = await ArticleService.getArticles();
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
  //   align-items: center;
  //   justify-content: center;
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
    .v-i-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .v-i-slogan {
      margin: 10px 0;
      color: #fdd;
      font-size: 12px;
    }
  }
  .v-i-main {
    width: 100%;
    display: flex;
    justify-content: center;
    .v-i-articles {
      width: 650px;
      box-sizing: border-box;
      margin: 20px 0;
      .v-i-article {
        padding: 20px 30px;
        margin: 20px 0;
        height: 120px;
        background: #ffffff;
        box-shadow: 0px 0px 3px #ccc;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        &:hover {
          .v-i-time {
            .v-i-year {
              opacity: 1;
            }
          }
        }
        .v-i-time {
          width: 48px;
          height: 48px;
          background: #d9534f;
          border-color: #d43f3a;
          color: #ffffff;
          border-radius: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: -15px;
          left: -10px;
          .v-i-year {
            position: absolute;
            right: -100%;
            font-size: 12px;
            border-radius: 3px;
            padding: 0px 3px;
            color: #3d4450;
            opacity: 0;
            transition: 1s;
          }
          .v-i-month {
            transform: scale(0.7);
            font-size: 12px;
            line-height: 8px;
          }
          .v-i-day {
            font-size: 18px;
            font-weight: bold;
          }
        }
        .v-i-title {
          width: 100%;
          font-size: 20px;
          color: #3d4450;
          text-align: center;
          text-decoration: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            color: #d9534f;
          }
        }
        .v-i-content {
          width: 100%;
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          height: 36px;
          line-height: 18px;
        }
        .v-i-more {
          cursor: pointer;
          background: #d9534f;
          color: #ffffff;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: flex-end;
          padding: 5px 8px;
          border-radius: 3px;
          .v-i-text {
            font-size: 12px;
          }
        }
      }
    }
    @media screen and (max-width: 720px), (max-height: 500px) {
      .v-i-articles {
        width: 90%;
      }
    }
  }
}
</style>
