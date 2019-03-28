<template>
  <div class="hello">
    <!-- <c-title :text="title"></c-title> -->
    <img class="logo" src="./../assets/images/logo.png">
    <p class="welcome">改版中，敬请期待...</p>
    <div v-html="content"></div>
    <audio autoplay="true" loop="true" src="http://music.163.com/song/media/outer/url?id=300136.mp3"></audio>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  import cTitle from 'components/title';
  import Vue from 'vue';
  import Resource from '../lib/resource';

  export default {
    data () {
        return {
            title: '改版中，敬请期待...',
            content: ''
        }
    },
    created() {      
        // this.initWebSocket();
    },
    destroyed() {      
        // this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
        async getContent () {
            // const response = await fetch('/api/hello');
            // console.log(response);
            // this.content = await response.text();
            document.title = this.title;

            // Vue.http.get("http://localhost:8080/user/user?username=cisor").then(resp => {
            //   console.log(resp);
            // }, resp => {
            //   console.log(resp);
            // });
            // console.log(Resource);
            // Resource.get({
            //     service: "mango",
            //     resource: "user.user",
            //     data: {
            //     username: "cisor",
            //     },
            // });
        },

        // initWebSocket(){ //初始化weosocket
        //     const wsuri = "ws://devapi.cisor.cn/mango/ws/ws/?name=cisor";
        //     this.websock = new WebSocket(wsuri);
        //     this.websock.onmessage = this.websocketonmessage;
        //     this.websock.onopen = this.websocketonopen;
        //     this.websock.onerror = this.websocketonerror;
        //     this.websock.onclose = this.websocketclose;
        // },
        // websocketonopen(){ //连接建立之后执行send方法发送数据
        //     let actions = {"test":"12345"};
        //     this.websocketsend(JSON.stringify(actions));
        // },
        // websocketonerror(){//连接建立失败重连
        //     this.initWebSocket();
        // },
        // websocketonmessage(e){ //数据接收
        //     const redata = JSON.parse(e.data);
        //     console.log(redata);
        // },
        // websocketsend(Data){//数据发送
        //     this.websock.send(Data);
        // },
        // websocketclose(e){  //关闭
        //     console.log('断开连接',e);
        // },
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
