<template>
  <div class="v-main">
    <div class="v-i-main">
      <div
        class="v-i-reply"
        :class="newReply.reply && newReply.reply.id == reply.id ? 'v-i-active' : ''"
        v-for="reply in markedReplies"
        :key="reply.content"
      >
        <div class="v-i-poster">
          <img class="v-i-avatar" :src="reply.user.avatar" />
          <div class="v-i-info">
            <div class="v-i-title">
              <div class="v-i-name">{{reply.user.name}}</div>
              <div v-if="reply.reply" class="v-i-text">回复</div>
              <div v-if="reply.reply" class="v-i-replyuser">@{{reply.reply.user.name}}</div>
            </div>
            <div class="v-i-time">{{reply.created_at}}</div>
          </div>
        </div>
        <div class="v-i-content content" v-html="reply.markedContent"></div>
        <div class="v-i-action">
          <div class="v-i-reply" @click="onClickReply(reply)">
            <div class="v-i-icon">
              <svg class="icon">
                <use xlink:href="#icon-reply" />
              </svg>
            </div>
            <div class="v-i-text">回复</div>
          </div>
        </div>
      </div>
      <div class="v-i-reply new">
        <div v-if="newReply.reply && newReply.reply.user" class="v-i-replyuser">
          <div class="v-i-text">回复@{{newReply.reply.user.name}}</div>
          <div class="v-i-close" @click="onClickCloseReplyUser">
            <svg class="icon">
              <use xlink:href="#icon-close" />
            </svg>
          </div>
        </div>
        <textarea
          class="v-i-input"
          :style="`height: ${textHeight}px`"
          @input="onChangeContent($event)"
          v-model.trim="newReply.content"
          placeholder="留下你善意的评论"
          ref="textarea"
        />
        <div class="v-i-action">
          <div class="v-i-count">{{newReply.content.length}} / {{maxLength}}</div>
          <div class="v-i-post" :class="enablereply ? 'v-i-active' : ''" @click="onClickPost">
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
    <login :show.sync="showLoginWindow" v-on:exit="loginSuccess" type="default"></login>
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
        <symbol id="icon-close" viewBox="0 0 1024 1024">
          <title>取消回复</title>
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
import ReplyService from "../services/reply_service";
import Login from "../components/login";

export default {
  props: {
    newReply: {
      type: Object,
      default: {
        resource: {},
        reply: {},
        content: ""
      }
    },
    replies: {
      type: Array,
      default: []
    }
  },
  components: {
    login: Login
  },
  data() {
    return {
      textHeight: 34,
      maxLength: 100,
      showLoginWindow: false
    };
  },
  computed: {
    markedReplies() {
      this.replies.map(reply => {
        reply.markedContent = MavonEditor.markdownIt.render(reply.content);
        return reply;
      });
      return this.replies;
    },
    enablereply() {
      return !!this.newReply.content;
    }
  },
  methods: {
    onChangeContent(event) {
      this.textHeight = event.target.scrollHeight;
      this.newReply.content = this.newReply.content.slice(0, this.maxLength);
    },
    onClickReply(reply) {
      this.newReply.reply = reply;
      this.$refs.textarea.focus();
    },
    onClickCloseReplyUser() {
      this.newReply.reply = {};
    },
    async onClickPost() {
      if (!this.enablereply) {
        return;
      }
      if (!(await UserService.isLogined("default"))) {
        this.showLoginWindow = true;
        return;
      }
      ReplyService.newReply(
        this.newReply.resource_type,
        this.newReply.resource.id,
        this.newReply.reply,
        this.newReply.content
      ).then(data => {
        this.replies.push(data);
        this.newReply.reply = {};
        this.newReply.content = "";
      });
    },
    loginSuccess() {
      this.showLoginWindow = false;
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
    .v-i-reply {
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
      background: inherit;
      transition: 0.3s;
      &.v-i-active {
        background: rgba($color: #dedede, $alpha: 0.8);
      }
      &:not(:last-child):after {
        content: "";
        position: absolute;
        bottom: 0;
        width: 77%;
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
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          .v-i-title {
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            .v-i-name {
              font-weight: bold;
              overflow: hidden;
              max-width: 100px;
              text-overflow: ellipsis;
            }
            .v-i-text {
              margin: 0 10px;
            }
            .v-i-replyuser {
              font-weight: bold;
              overflow: hidden;
              max-width: 100px;
              text-overflow: ellipsis;
              color: #4b3f90;
            }
          }
          .v-i-time {
            margin: 3px 0 0 0;
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

      .v-i-action {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: flex-end;
        border-radius: 3px;
        font-size: 12px;
        color: #808080;
        .v-i-reply {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          cursor: pointer;
          padding: 5px 8px;
          transition: 0.3s;
          &:hover {
            color: #4b3f90;
          }
          .v-i-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            margin: 0 5px 0 0;
          }
          .v-i-text {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      &.new {
        .v-i-replyuser {
          display: flex;
          flex-direction: row;
          align-self: flex-start;
          color: #4b3f90;
          margin: 0 0 10px 0;
          padding: 5px 10px;
          border-radius: 12px;
          box-shadow: 0px 0px 2px #4b3f90;
          .v-i-text {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            overflow: hidden;
            max-width: 100px;
            text-overflow: ellipsis;
            margin: 0 10px 0 0;
            cursor: pointer;
            transition: 0.3s;
          }
          .v-i-close {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            transform: scale(0.7);
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              transform: scale(1);
            }
          }
        }
        .v-i-input {
          overflow: hidden;
          resize: none;
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
