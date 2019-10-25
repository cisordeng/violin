<template>
    <music-player></music-player>
    <!-- <audio autoplay="true" loop="true" src="http://music.163.com/song/media/outer/url?id=300136.mp3"></audio> -->
</template>

<script>
  import Vue from 'vue'
  import MusicPlayer from '../components/music_player'
  // import Resource from '../lib/resource'

  export default {
    components: {
      "music-player": MusicPlayer,
    },
    data() {
      return {
      }
    },
    methods: {
    },
    mounted () {
    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1 {
    color: #42b983;
  }

  .logo {
    width: 100px;
    height: 100px;
  }
</style>
