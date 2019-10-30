<template>
  <div id="app">
    <music-player></music-player>
    <top></top>
    <router-view></router-view>
  </div>
</template>

<script>
import MusicPlayer from "components/music_player";
import Top from "components/top";
export default {
  name: 'App',
  components: {
    "music-player": MusicPlayer,
    "top": Top,
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
  },
}
</script>

<style>
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
