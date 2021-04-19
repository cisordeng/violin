<template>
  <div class="v-main main">
    <div class="v-i-header v-i-home">
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
import MusicPlayer from "../../components/music_player";
import ArticleService from "../../services/article_service";

export default {
  components: {
    "music-player": MusicPlayer
  },
  data() {
    return {
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
    };
  },

  methods: {
    initWebSocket(){ //初始化weosocket
        const wsuri = "ws://devapi.cisor.cn/nature/ws/ws/";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
    },
    websocketonopen(){ //连接建立之后执行send方法发送数据
        let actions = {"test":"12345"};
        this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror(){//连接建立失败重连
        this.initWebSocket();
    },
    websocketonmessage(e){ //数据接收
        const redata = JSON.parse(e.data);
        console.log(redata);
    },
    websocketsend(Data){//数据发送
        this.websock.send(Data);
    },
    websocketclose(e){  //关闭
        console.log('断开连接',e);
        this.initWebSocket();
    },
  },
  created() {
    // this.initWebSocket();
  },
  mounted() {
  },
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
    background-image: url(https://i.ibb.co/pyvmdWP/KOublR.jpg);
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    text-shadow: -5px 5px 0 rgba(0, 0, 0, 0.1);
    position: relative;
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
        color: #695f48;
        text-decoration: none;
        font-weight: bold;
        position: relative;
        text-shadow: 0 0 2px #695f48;
        transition: 0.2s;
        &:hover {
          text-shadow: 0 0 5px #695f48;
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
      margin: 0;
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
        width: 100%;
      }
    }
  }
  @keyframes scale-down {
    0% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(1);
      filter: drop-shadow(0px 0px 10px #fee67a);
    }
    100% {
      transform: scale(1.2);
    }
  }
}
</style>
