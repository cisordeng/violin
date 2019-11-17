<template>
  <div class="v-main">
    <div class="v-i-main">
      <div class="v-i-comment" v-for="comment in markedComments" :key="comment.content">
        <div class="v-i-poster">
          <img class="v-i-avatar" :src="comment.user.avatar" />
          <div class="v-i-info">
            <div class="v-i-name">{{comment.user.name}}</div>
            <div class="v-i-time">{{comment.created_at}}</div>
          </div>
        </div>
        <div class="v-i-content content" v-html="comment.markedContent"></div>
      </div>
      <div class="v-i-comment new">
        <textarea class="v-i-input" :style="`height: ${textHeight}px`" @input="onChangeContent($event)" v-model="newComment.content" placeholder="留下你善意的评论"/>
        <div class="v-i-action">
          <div class="v-i-count">{{newComment.content.length}} / {{maxLength}}</div>
          <div class="v-i-post" :class="enableComment ? 'v-i-active' : ''" @click="onClickPost">
            <div class="v-i-icon">
              <svg class="icon">
                <use xlink:href="#icon-post" />
              </svg>
            </div>
            <div class="v-i-text">发布</div>
          </div>
        </div>
      </div>
    </div>
    <login :show.sync="showLoginWindow" v-on:exit="loginSuccess"></login>
    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-post" viewBox="0 0 1024 1024">
          <title>发布评论</title>
          <path
            d="M984.273455 16.733091c-18.013091-9.006545-36.026182-9.006545-45.032728 0L38.656 467.013818c-18.013091 0-27.019636 18.013091-27.019636 36.026182s9.006545 36.026182 18.013091 36.026182l216.133818 135.098182c18.013091 9.006545 36.026182 9.006545 54.039272-9.006546l477.323637-432.290909 18.013091 9.006546L362.868364 701.207273c-9.006545 9.006545-9.006545 18.013091-9.006546 26.996363v198.144c0 18.013091 9.006545 36.026182 26.996364 45.032728 18.036364 9.006545 36.049455 0 45.056-9.006546l108.055273-108.078545 216.15709 144.104727c9.006545 9.006545 18.013091 9.006545 26.996364 9.006545h18.036364c18.013091-9.006545 26.996364-18.013091 26.996363-36.026181l180.130909-900.584728c0-27.019636 0-45.032727-18.01309-54.039272z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
import UserService from "../services/user_service";
import CommentService from "../services/comment_service";
import Login from "../components/login";

export default {
  props: {
    newComment: {
      type: Object,
      default: {
        resource: {},
        comment: {},
        content: '',
      },
    },
    comments: {
      type: Array,
      default: []
    }
  },
  components: {
    login: Login,
  },
  data() {
    return {
      textHeight: 34,
      maxLength: 100,
      showLoginWindow: false,
    };
  },
  computed: {
    markedComments() {
      this.comments.map(comment => {
        comment.markedContent = MavonEditor.markdownIt.render(comment.content);
        return comment;
      });
      return this.comments;
    },
    enableComment() {
      return !!this.newComment.content;
    }
  },
  methods: {
    onChangeContent(event) {
      this.textHeight = event.target.scrollHeight;
      this.newComment.content = this.newComment.content.slice(0, this.maxLength);
    },
    async onClickPost() {
      if (!this.enableComment) {
        return;
      }
      if (!UserService.isLogined()) {
        this.showLoginWindow = true;
        return;
      }
      CommentService.newComment(
        this.newComment.resource_type,
        this.newComment.resource,
        this.newComment.comment,
        this.newComment.content,
      ).then(data => {
        this.comments.push(data);
        this.newComment.comment = {};
        this.newComment.content = '';
      });
    },
    loginSuccess() {
      this.showLoginWindow = false;
    }
  },
  mounted() {
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
  .v-i-main {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 0px 3px #ccc;
    box-sizing: border-box;
    .v-i-comment {
      width: 100%;
      padding: 20px 30px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-decoration: inherit;
      color: inherit;
      &:not(:last-child):after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 90%;
        height: 0px;
        border-bottom: 1px dashed #ccc;
      }
      .v-i-poster {
        width: 100%;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .v-i-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        .v-i-info {
          margin: 0 0 0 10px;
          .v-i-name {
            font-size: 12px;
            font-weight: bold;
          }
          .v-i-time {
            font-size: 12px;
            color: #808080;
          }
        }
      }
      .v-i-content {
        width: 100%;
        font-size: 12px;
        line-height: 18px;
        padding: 0 0 0 60px;
        box-sizing: border-box;
      }

      &.new {
        .v-i-input {
          overflow:hidden;
          resize:none; 
          width: 100%;
          height: 36px;
          box-sizing: border-box;
          padding: 8px;
          font-size: 12px;
          line-height: 18px;
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
        .v-i-action {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin: 20px 0 0 0;
          .v-i-count {
            margin: 0 20px 0 0;
            font-size: 12px;
            color: #808080;
          }
          .v-i-post {
            display: flex;
            align-items: center;
            justify-content: space-around;
            cursor: pointer;
            color: #757575;
            transform: scale(1);
            transition: 0.3s;
            &:hover {
              transform: scale(1.1);
            }
            &.v-i-active {
              color: #4b3f90;
            }
            .v-i-icon {
              font-size: 18px;
            }
            .v-i-text {
              font-size: 12px;
              margin: 0 0 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
