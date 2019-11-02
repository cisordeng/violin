<template>
  <div class="v-main">
    <div class="v-i-main">
        <div class="v-i-header">
            <img class="v-i-avatar" src="https://s2.ax1x.com/2019/10/26/KBxNDJ.gif" />
        </div>
        <div class="v-i-form">
          <div class="v-i-input">
            <input class="v-i-username" v-model="user.name" placeholder="Username"/>
          </div>
          <div class="v-i-input">
            <input class="v-i-password" v-model="user.password" type="password" placeholder="Password"/>
            <div class="v-i-login" :class="enableLogin ? 'v-i-active' : ''" @click="onClickLogin">
              <svg class="icon">
                <use xlink:href="#icon-login" />
              </svg>
            </div>
          </div>
        </div>
    </div>
    
    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-login" viewBox="0 0 1024 1024">
          <title>登录</title>
          <path d="M984.273455 16.733091c-18.013091-9.006545-36.026182-9.006545-45.032728 0L38.656 467.013818c-18.013091 0-27.019636 18.013091-27.019636 36.026182s9.006545 36.026182 18.013091 36.026182l216.133818 135.098182c18.013091 9.006545 36.026182 9.006545 54.039272-9.006546l477.323637-432.290909 18.013091 9.006546L362.868364 701.207273c-9.006545 9.006545-9.006545 18.013091-9.006546 26.996363v198.144c0 18.013091 9.006545 36.026182 26.996364 45.032728 18.036364 9.006545 36.049455 0 45.056-9.006546l108.055273-108.078545 216.15709 144.104727c9.006545 9.006545 18.013091 9.006545 26.996364 9.006545h18.036364c18.013091-9.006545 26.996364-18.013091 26.996363-36.026181l180.130909-900.584728c0-27.019636 0-45.032727-18.01309-54.039272z"></path>
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
import Vue from "vue";
// import MusicPlayer from "../components/music_player";
// import Resource from '../lib/resource'

export default {
  props: {},
  data() {
    return {
        user: {
            name: '',
            password: '',
        }
    };
  },
  computed: {
    enableLogin() {
      return this.user.name != '' && this.user.password != '';
    },
  },
  methods: {
    onClickLogin() {
      console.log(this.user);
      if (!this.enableLogin) {
        return;
      }
    },
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
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .v-i-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background: #f0f0f0;
    box-shadow: 0 1px 11px rgba(0,0,0,.27);
    width: 350px;
    height: 300px;
    border-radius: 5px;
    overflow: hidden;
    .v-i-header {
        width: 100%;
        height: 150px;
        background-image: url(https://s2.ax1x.com/2019/11/03/KOublR.md.jpg);
        background-size: cover;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        .v-i-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 0 -20px 0;
            z-index: 1;
        }
    }
    .v-i-form {
      display: flex;
      align-items: center;
      justify-content:space-around;
      flex-direction: column;
      height: 90px;
      margin: 20px 0;
      .v-i-input {
        display: flex;
        position: relative;
        .v-i-username, .v-i-password {
          min-height: 28px;
          padding: 6px 8px;
          padding-top: 3px;
          padding-bottom: 3px;
          font-size: 12px;
          line-height: 20px;
          color: #24292e;
          vertical-align: middle;
          background-color: #fff;
          background-repeat: no-repeat;
          background-position: right 8px center;
          border: 1px solid #d1d5da;
          border-radius: 3px;
          outline: none;
          box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
          &:focus {
            border-color: #2188ff;
            outline: none;
            box-shadow: inset 0 1px 2px rgba(27,31,35,.075), 0 0 0 0.2em rgba(3,102,214,.3);
          }
        }
        .v-i-login {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: space-around;
          position: absolute;
          width: 38px;
          height: 38px;
          bottom: 0;
          right: 0;
          margin: 0 -58px 0 0;
          border-radius: 3px;
          padding: 10px;
          color: #757575;
          cursor: pointer;
          font-size: 18px;
          transform: scale(1);
          transition: 0.3s;
          &:hover {
            transform: scale(1.2);
          }
          &.v-i-active {
            color: #4b3f90;
            animation: scale-down 2s infinite;
          }
        }
      }
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

</style>
