<template>
  <div class="v-main main">
    <mavon-editor class="v-i-content content" v-model.trim="word.content" @imgAdd="onClickUploadImage"/>
    <div class="v-i-post" :class="enablePost ? 'v-i-active' : ''" @click="onClickPost">
      <svg class="icon">
        <use xlink:href="#icon-post" />
      </svg>
    </div>
    <login :show.sync="showLoginWindow" v-on:exit="loginSuccess" type="admin"></login>

    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-post" viewBox="0 0 1024 1024">
          <title>发布</title>
          <path
            d="M984.273455 16.733091c-18.013091-9.006545-36.026182-9.006545-45.032728 0L38.656 467.013818c-18.013091 0-27.019636 18.013091-27.019636 36.026182s9.006545 36.026182 18.013091 36.026182l216.133818 135.098182c18.013091 9.006545 36.026182 9.006545 54.039272-9.006546l477.323637-432.290909 18.013091 9.006546L362.868364 701.207273c-9.006545 9.006545-9.006545 18.013091-9.006546 26.996363v198.144c0 18.013091 9.006545 36.026182 26.996364 45.032728 18.036364 9.006545 36.049455 0 45.056-9.006546l108.055273-108.078545 216.15709 144.104727c9.006545 9.006545 18.013091 9.006545 26.996364 9.006545h18.036364c18.013091-9.006545 26.996364-18.013091 26.996363-36.026181l180.130909-900.584728c0-27.019636 0-45.032727-18.01309-54.039272z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
import Uploader from '../../lib/upload';
import WordService from "../../services/word_service";
import UserService from "../../services/user_service";
import Login from "../../components/login";

export default {
  components: {
    login: Login,
    "mavon-editor": MavonEditor.mavonEditor,
  },
  data() {
    return {
      showLoginWindow: false,
      word: {
        content: ""
      }
    };
  },
  computed: {
    enablePost() {
      return this.word.content != "";
    },
    isNew() {
      return !this.word.id || this.word.id <= 0;
    }
  },
  methods: {
    async onClickUploadImage(pos, file) {
      let imgStr = `![${file.name}](${pos})`;
      let loadImgStr = `![图片上传中...](${pos})`;
      this.word.content = this.word.content.replace(imgStr, loadImgStr);
      let url = await Uploader.upload(file);
      let newImgStr = `![](${url})`;
      this.word.content = this.word.content.replace(loadImgStr, newImgStr);
    },
    async onClickPost() {
      if (!this.enablePost) {
        return;
      }
      if (!await UserService.isLogined('admin')) {
        this.showLoginWindow = true;
        return;
      }
      if (this.isNew) {
        WordService.newWord(
          this.word.content
        ).then(data => {
          this.$router.push({
            path: "/word",
            query: {
              id: data.id
            }
          });
        });
      } else {
        WordService.updateWord(
          this.word.id,
          this.word.content
        ).then(() => {
          this.$router.push({
            path: "/word",
            query: {
              id: this.word.id
            }
          });
        });
      }
    },
    loginSuccess() {
      this.showLoginWindow = false;
    }
  },
  async mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.word = await WordService.getWord(id);
      document.title = `编辑动态`;
    } else {
      document.title = "新增动态";
    }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  .v-i-content {
    width: 100%;
    // height: 100%;
  }
  .v-i-post {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    padding: 10px;
    color: #757575;
    cursor: pointer;
    position: absolute;
    z-index: 9999;
    bottom: 20px;
    font-size: 32px;
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
