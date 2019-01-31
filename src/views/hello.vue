<template>
  <div class="hello">
    <!-- <c-title :text="title"></c-title> -->
    <img class="logo" src="./../assets/images/logo.png">
    <p class="welcome">欢迎使用 vue</p>
    <div v-html="content"></div>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import cTitle from 'components/title';
  import Vue from 'vue';

  export default {
    data () {
      return {
        title: 'Hello Vue123!',
        content: ''
      }
    },
    methods: {
      async getContent () {
        const response = await fetch('/api/hello');
        this.content = await response.text();
        document.title = this.title;

        // Vue.http.get("http://localhost:8080/user/user?username=cisor")
        //     .then((data) => {
        //         console.log(data)
        // })


      }
    },
    mounted () {
      this.$store.commit('message', '欢迎使用 vue！');
      this.getContent();
    },

    components: {cTitle}
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
