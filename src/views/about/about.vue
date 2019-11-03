<template>
  <div class="v-main">
    <!-- <div v-title :data-title="title"></div> -->
    <div class="v-i-header v-i-home">
      <img class="v-i-avatar" src="https://s2.ax1x.com/2019/10/26/KBxNDJ.gif" />
      <div class="v-i-slogan">我是谁，我在哪，我在干虾米</div>
      <div class="v-i-navs">
        <div v-for="nav in navs" :key="nav.name" class="v-i-nav">
          <a :href="nav.href" :target="nav.name">{{nav.name}}</a>
        </div>
      </div>
      <router-link class="v-i-down" to="/articles">
        <svg class="icon">
          <use xlink:href="#icon-down" />
        </svg>
      </router-link>
    </div>
    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-down" viewBox="0 0 1024 1024">
          <title>icon-down</title>
          <path
            d="M830.24 340.688l11.328 11.312a16 16 0 0 1 0 22.624L530.448 685.76a16 16 0 0 1-22.64 0L196.688 374.624a16 16 0 0 1 0-22.624l11.312-11.312a16 16 0 0 1 22.624 0l288.496 288.496 288.512-288.496a16 16 0 0 1 22.624 0z"
            p-id="3459"
            fill="#f0f0f0"
          />
        </symbol>
      </defs>
    </svg>
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
      showHome: true,
      navs: [
        {
          name: "Github",
          href: "https://github.com/cisordeng"
        },
        {
          name: "博客园",
          href: "https://cnblogs.com/dearvee"
        },
        {
          name: "CSDN",
          href: "https://blog.csdn.net/dearvee"
        },
        {
          name: "Email",
          href: "mailto:m@cisor.cn"
        },
        {
          name: "网易云音乐",
          href: "https://music.163.com/#/user/home?id=347204163"
        }
      ],
      articles: []
    };
  },

  methods: {
    onClickDown() {
      document.querySelector("#app").scrollTop = document.querySelector(
        "#app"
      ).offsetHeight;
    },
    scrollToTop() {}
  },
  async mounted() {
    document.querySelector("#app").addEventListener("scroll", this.scrollToTop);

    this.articles = await ArticleService.getArticles();
  },
  destroyed() {
    document
      .querySelector("#app")
      .removeEventListener("scroll", this.scrollToTop);
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
.v-main {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #f0f0f0;
  // overflow-y: scroll;
  display: flex;
  flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  .v-i-header {
    width: 100%;
    height: 300px;
    background-image: linear-gradient(40deg, #9c4dff 0, #42a7ff 100%);
    // background-image: url(https://s2.ax1x.com/2019/10/26/KDyb6g.jpg);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NzAiIGhlaWdodD0iNDcwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoNzUsNjMsMTQ0KSI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE4IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI5IiBvcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMzkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEyIiBvcGFjaXR5PSIwLjA4MDY2NjY2NjY2NjY2NjY2IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNzAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjkiIG9wYWNpdHk9IjAuMDU0NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSI4NyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iOSIgb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjExNSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iNyIgb3BhY2l0eT0iMC4wMzczMzMzMzMzMzMzMzMzMyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE0MCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTEiIG9wYWNpdHk9IjAuMDcyMDAwMDAwMDAwMDAwMDEiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIxNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjE0IiBvcGFjaXR5PSIwLjA5OCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE4MyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMjAiIG9wYWNpdHk9IjAuMTUiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIyMDgiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjgiIG9wYWNpdHk9IjAuMDQ2IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMjM1IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNiIgb3BhY2l0eT0iMC4xMTUzMzMzMzMzMzMzMzMzNCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjI2MyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTEiIG9wYWNpdHk9IjAuMDcyMDAwMDAwMDAwMDAwMDEiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIyODgiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwIiBvcGFjaXR5PSIwLjA2MzMzMzMzMzMzMzMzMzM0IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMzA1IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNSIgb3BhY2l0eT0iMC4xMDY2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjMzOSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTkiIG9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMzMzQiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIzNzUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjYiIG9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNDAwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI1IiBvcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNDE5IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxOSIgb3BhY2l0eT0iMC4xNDEzMzMzMzMzMzMzMzMzNCIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjQ1MiIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTgiIG9wYWNpdHk9IjAuMTMyNjY2NjY2NjY2NjY2NjUiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIxOCIgeT0iMCIgd2lkdGg9IjkiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjM5IiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wODA2NjY2NjY2NjY2NjY2NiIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjcwIiB5PSIwIiB3aWR0aD0iOSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iODciIHk9IjAiIHdpZHRoPSI5IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMDU0NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIxMTUiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMDM3MzMzMzMzMzMzMzMzMzMiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIxNDAiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA3MjAwMDAwMDAwMDAwMDAxIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMTYwIiB5PSIwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wOTgiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIxODMiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjE1IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMjA4IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA0NiIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjIzNSIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTE1MzMzMzMzMzMzMzMzMzQiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIyNjMiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA3MjAwMDAwMDAwMDAwMDAxIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMjg4IiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wNjMzMzMzMzMzMzMzMzMzNCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjMwNSIgeT0iMCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTA2NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIzMzkiIHk9IjAiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzMzM0IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMzc1IiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjAyODY2NjY2NjY2NjY2NjY2NyIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjQwMCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjQxOSIgeT0iMCIgd2lkdGg9IjE5IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMzMzQiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSI0NTIiIHk9IjAiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjEzMjY2NjY2NjY2NjY2NjY1IiBmaWxsPSIjMjIyIj48L3JlY3Q+PC9zdmc+);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    text-shadow: -5px 5px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    transition: 0.5s all;
    .v-i-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .v-i-slogan {
      margin: 10px 0;
      color: #fdd;
      font-size: 15px;
    }
    .v-i-down {
      position: absolute;
      font-size: 58px;
      bottom: 0;
      cursor: pointer;
      animation: scale-down 3s infinite;
      &:hover {
        animation: none;
        transform: scale(1.2);
        filter: drop-shadow(0px 0px 10px #fff);
      }
    }
    &.v-i-home {
      opacity: 1;
      height: 100vh;
    }
  }

  .v-i-navs {
    padding: 5vw;
    display: flex;
    flex-direction: column;
    font-family: "Bitter", serif;
    text-align: center;
    .v-i-nav {
      margin: 20px 0;
      transition: 0.3s;
      font-size: 15px;
      width: 100px;
      height: 20px;
      a {
        text-decoration: none;
        color: #d0d8e6;
        font-weight: inherit;
        position: relative;
        &:hover {
          color: #fff;
        }
        &:before {
          content: ">";
          width: 15px;
          height: 100%;
          line-height: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
          top: 0;
          left: -30px;
          opacity: 0;
        }
        &:after {
          content: "<";
          width: 15px;
          height: 100%;
          line-height: 100%;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
          top: 0;
          right: -30px;
          opacity: 0;
        }
        &:hover:before {
          left: -20px;
          opacity: 1;
          font-weight: bold;
        }
        &:hover:after {
          right: -20px;
          opacity: 1;
          font-weight: bold;
        }
      }
    }
  }
  @media screen and (max-width: 700px), (max-height: 500px) {
    .v-i-navs {
      padding: 1vw;
      width: 410px;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0 10px;
      box-sizing: border-box;
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
          background: #4b3f90;
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
            color: #4b3f90;
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
            color: #4b3f90;
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
          background: #4b3f90;
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
  @keyframes scale-down {
    0% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
      filter: drop-shadow(0px 0px 10px #fff);
    }
    100% {
      transform: scale(1.2);
    }
  }
}
</style>
