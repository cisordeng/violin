<template>
  <div class="v-main">
    <music-player class="v-i-player"></music-player>
    <div class="v-i-navs">
      <div v-for="nav in navs" :key="nav.name" class="v-i-nav">
        <a :href="nav.href" :target="nav.name">{{nav.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MusicPlayer from "../components/music_player";
// import Resource from '../lib/resource'

export default {
  components: {
    "music-player": MusicPlayer
  },
  data() {
    return {
      navs: [{
        name: "博客",
        href: "/blog"
      }, {
        name: "Github",
        href: "https://github.com/cisordeng"
      }, {
        name: "博客园",
        href: "https://cnblogs.com/dearvee"
      }, {
        name: "CSDN",
        href: "https://blog.csdn.net/dearvee"
      }, {
        name: "Email",
        href: "mailto:m@cisor.cn"
      }, {
        name: "网易云音乐",
        href: "https://music.163.com/#/user/home?id=347204163"
      }]
    };
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.v-main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dfe7ef;
  overflow: hidden;
  .v-i-navs {
    padding: 5vw;
    display: flex;
    flex-direction: column;
    font-family: "Bitter", serif;
    .v-i-nav {
      margin: 20px 0;
      transition: 0.3s;
      font-size: 15px;
      width: 100px;
      height: 20px;
      a {
        text-decoration: none;
        color: #71829e;
        font-weight: inherit;
        position: relative;
        &:hover{
          color: #532ab9;
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
}
@media screen and (max-width: 700px), (max-height: 500px) {
  .v-main {
    flex-direction: column;
  }
}
</style>
