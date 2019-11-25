<template>
  <div class="v-main" :class="show ? 'v-i-active' : ''">
    <div class="v-i-main" :class="errMsg != '' ? 'v-i-err' : ''">
      <div class="v-i-header">
        <img class="v-i-avatar" src="https://i.ibb.co/stYmBNJ/KBxNDJ.gif" />
      </div>
      <div class="v-i-tabs">
        <div
          class="v-i-tab"
          :class="action == 'login' ? 'v-i-active' : ''"
          @click="onClickToAction('login')"
        >登录</div>
        <div
          class="v-i-tab"
          :class="action == 'register' ? 'v-i-active' : ''"
          @click="onClickToAction('register')"
        >注册</div>
      </div>
      <div v-if="action == 'login'" class="v-i-form">
        <div class="v-i-input">
          <input
            class="v-i-username"
            v-model="login.name"
            :placeholder="`${type == 'admin' ? '管理员' : '用户名'}`"
          />
        </div>
        <div class="v-i-input">
          <input
            class="v-i-password"
            v-model="login.password"
            type="password"
            placeholder="密码"
            @keyup.enter="onClickLogin"
          />
          <div class="v-i-login" :class="enableLogin ? 'v-i-active' : ''" @click="onClickLogin">
            <svg class="icon">
              <use xlink:href="#icon-login" />
            </svg>
          </div>
        </div>
      </div>
      <div v-if="action == 'register'" class="v-i-form">
        <div class="v-i-input">
          <input
            class="v-i-username"
            v-model="register.name"
            :placeholder="`${type == 'admin' ? '管理员' : '用户名'}`"
          />
        </div>
        <div class="v-i-input">
          <input class="v-i-password" v-model="register.password" type="password" placeholder="密码" />
        </div>
        <div class="v-i-input">
          <input
            class="v-i-password"
            v-model="register.confirmPassword"
            type="password"
            placeholder="确认密码"
            @keyup.enter="onClickRegister"
          />
          <div class="v-i-register" :class="enableRegister ? 'v-i-active' : ''" @click="onClickRegister">
            <svg class="icon">
              <use xlink:href="#icon-register" />
            </svg>
          </div>
        </div>
      </div>
      <div class="v-i-close" @click="onClickClose">
        <svg class="icon">
          <use xlink:href="#icon-close" />
        </svg>
      </div>
    </div>

    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-register" viewBox="0 0 1024 1024">
          <title>注册</title>
          <path
            d="M722.6 645.295c17.497-26.999 9.793-63.072-17.206-80.567-21.997-14.255-45.104-26.406-69.045-36.377 69.66-51.387 114.937-134.006 114.937-227.013 0-155.467-126.483-281.951-281.951-281.951s-281.951 126.483-281.951 281.951c0 92.95 45.223 175.527 114.811 226.919-51.763 21.557-99.309 53.261-140.153 94.103-82.080 82.080-127.284 191.213-127.284 307.292 0 32.174 26.082 58.254 58.254 58.254s58.254-26.080 58.254-58.254c0-175.385 142.685-318.068 318.068-318.068 61.579 0 121.298 17.606 172.699 50.915 27.002 17.498 63.074 9.793 80.567-17.206zM469.334 135.897c91.225 0 165.442 74.218 165.442 165.442s-74.218 165.442-165.442 165.442c-91.225 0-165.442-74.217-165.442-165.442s74.218-165.442 165.442-165.442z"
          />
          <path
            d="M926.63 743.197h-66.992v-66.992c0-32.174-26.080-58.254-58.254-58.254s-58.254 26.080-58.254 58.254v66.992h-66.992c-32.174 0-58.254 26.080-58.254 58.254s26.080 58.254 58.254 58.254h66.992v66.992c0 32.174 26.080 58.254 58.254 58.254s58.254-26.080 58.254-58.254v-66.992h66.992c32.174 0 58.254-26.080 58.254-58.254s-26.080-58.254-58.254-58.254z"
          />
        </symbol>
        <symbol id="icon-login" viewBox="0 0 1024 1024">
          <title>登录</title>
          <path
            d="M984.273455 16.733091c-18.013091-9.006545-36.026182-9.006545-45.032728 0L38.656 467.013818c-18.013091 0-27.019636 18.013091-27.019636 36.026182s9.006545 36.026182 18.013091 36.026182l216.133818 135.098182c18.013091 9.006545 36.026182 9.006545 54.039272-9.006546l477.323637-432.290909 18.013091 9.006546L362.868364 701.207273c-9.006545 9.006545-9.006545 18.013091-9.006546 26.996363v198.144c0 18.013091 9.006545 36.026182 26.996364 45.032728 18.036364 9.006545 36.049455 0 45.056-9.006546l108.055273-108.078545 216.15709 144.104727c9.006545 9.006545 18.013091 9.006545 26.996364 9.006545h18.036364c18.013091-9.006545 26.996364-18.013091 26.996363-36.026181l180.130909-900.584728c0-27.019636 0-45.032727-18.01309-54.039272z"
          />
        </symbol>
        <symbol id="icon-close" viewBox="0 0 1024 1024">
          <title>关闭</title>
          <path
            d="M583.168 523.776L958.464 148.48c18.944-18.944 18.944-50.176 0-69.12l-2.048-2.048c-18.944-18.944-50.176-18.944-69.12 0L512 453.12 136.704 77.312c-18.944-18.944-50.176-18.944-69.12 0l-2.048 2.048c-19.456 18.944-19.456 50.176 0 69.12l375.296 375.296L65.536 899.072c-18.944 18.944-18.944 50.176 0 69.12l2.048 2.048c18.944 18.944 50.176 18.944 69.12 0L512 594.944 887.296 970.24c18.944 18.944 50.176 18.944 69.12 0l2.048-2.048c18.944-18.944 18.944-50.176 0-69.12L583.168 523.776z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
import UserService from "../services/user_service";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      default: "login"
    },
    type: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {
      errMsg: "",
      login: {
        name: "",
        password: "",
        reset() {
          this.name = "";
          this.password = "";
        },
      },
      register: {
        name: "",
        password: "",
        confirmPassword: "",
        reset() {
          this.name = "";
          this.password = "";
          this.confirmPassword = "";
        },
      }
    };
  },
  computed: {
    enableRegister() {
      return this.register.name != "" && this.register.password != "" && this.register.confirmPassword != "" && this.register.password == this.register.confirmPassword;
    },
    enableLogin() {
      return this.login.name != "" && this.login.password != "";
    }
  },
  methods: {
    onClickToAction(action) {
      this.action = action;
      this[action].reset();
    },
    onClickRegister() {
      if (!this.enableRegister) {
        return;
      }
      UserService.registerUser(this.register.name, this.register.password, this.type).then(
        data => {
          this.action = 'login';
          this.login.name = data.name;
        },
        resp => {
          this.errMsg = resp.errMsg;
          setTimeout(() => {
            this.errMsg = "";
          }, 1000);
        }
      );
    },
    onClickLogin() {
      if (!this.enableLogin) {
        return;
      }
      UserService.loginUser(this.login.name, this.login.password, this.type).then(
        data => {
          this.show = false;
          this.$emit("exit");
        },
        resp => {
          this.errMsg = resp.errMsg;
          setTimeout(() => {
            this.errMsg = "";
          }, 1000);
        }
      );
    },
    onClickClose() {
      this.$emit("exit");
    }
  },
  mounted() {}
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
  background: rgba($color: #000000, $alpha: 0.3);
  pointer-events: none;
  opacity: 0;
  transition: 0.3s;
  .v-i-active {
    pointer-events: auto;
    opacity: 1;
    .v-i-main {
      transform: scale(1);
    }
  }
  .v-i-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background: #f0f0f0;
    box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
    width: 350px;
    border-radius: 5px;
    overflow: hidden;
    transform: scale(0.5);
    transition: 0.5s;
    &.v-i-err {
      animation: vibrate 0.3s 1;
    }
    .v-i-header {
      width: 100%;
      height: 150px;
      background-image: url(https://i.ibb.co/pyvmdWP/KOublR.jpg);
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
    .v-i-tabs {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 30px 0 0 0;
      font-size: 12px;
      width: 70px;
      color: #808080;
      .v-i-tab {
        cursor: pointer;
        &.v-i-active {
          color: #4b3f90;
          font-weight: bold;
        }
      }
    }
    .v-i-form {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      margin: 10px 0 20px 0;
      .v-i-input {
        display: flex;
        position: relative;
        margin: 5px 0;
        .v-i-username,
        .v-i-password {
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
          box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
          &:focus {
            border-color: #2188ff;
            outline: none;
            box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
              0 0 0 0.2em rgba(3, 102, 214, 0.3);
          }
        }
        .v-i-register,
        .v-i-login {
          @extend .v-i-after;
        }
        .v-i-after {
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
          margin: 0 -48px 0 0;
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
    .v-i-close {
      position: absolute;
      right: 0;
      top: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      animation: trans-color 4s infinite;
      transform: rotate(0deg) scale(0.8);
      transition: 0.3s;
      &:hover {
        transform: rotate(360deg) scale(1);
        animation: none;
        color: red;
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

@keyframes trans-color {
  0% {
    color: #4b3f90;
  }
  50% {
    color: #fff;
  }
  100% {
    color: #4b3f90;
  }
}

@keyframes vibrate {
  0% {
    transform: translateX(-10px);
  }
  25% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(10px);
  }
  75% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-10px);
  }
}
</style>
