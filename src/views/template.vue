<template>
  <div class="v-main main"></div>
</template>

<script>
// import Vue from "vue";
import MusicPlayer from "../components/music_player";
// import Resource from '../lib/resource'

export default {
  components: {
    "music-player": MusicPlayer
  },
  data() {
    return {};
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
}
</style>
