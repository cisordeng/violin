<template>
  <div class="v-main main">
    <div class="v-i-header">
      <div class="v-i-title">{{article.title}}</div>
      <div class="v-i-time">{{article && article.created_at && article.created_at.split(' ')[0]}}</div>
      <router-link class="v-i-edit" :to="{ path: '/edit_article', query: { id: article.id } }">
        <svg class="icon">
          <use xlink:href="#icon-edit" />
        </svg>
      </router-link>
    </div>
    <div class="v-i-main">
      <div class="v-i-article">
        <div class="v-i-content content" v-html="article.markedContent"></div>
        <div class="v-i-action">
          <div class="v-i-reply">
            <div class="v-i-icon">
              <svg class="icon">
                <use xlink:href="#icon-reply" />
              </svg>
            </div>
            <div class="v-i-count">{{article.replies && article.replies.length}}</div>
          </div>
        </div>
      </div>
      <reply :newReply="newReply" :replies="article.replies" class="v-i-replies"></reply>
    </div>
    <svg
      style="display: none;"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <symbol id="icon-edit" viewBox="0 0 1024 1024">
          <title>编辑</title>
          <path
            d="M336.600219 315.092552c0 14.616648 3.654162 80.391566 3.654162 80.391566s-18.270811-18.270811-36.541621-32.887459c-18.270811 25.579135-14.616648 29.233297-25.579135 54.812432-10.962486 25.579135-29.233297 69.42908-40.195783 95.008214-7.308324 29.233297-32.887459 95.008215-32.887459 95.008215l3.654162 32.887459s-7.308324 7.308324-14.616648 10.962486c-3.654162 32.887459 0 62.120756 3.654162 80.391567 3.654162 14.616648 14.616648 47.504107 18.270811 80.391566-10.962486 36.541621-25.579135 73.083242-29.233297 98.662377-14.616648 54.812432-18.270811 91.354053-18.270811 98.662377v14.616648s21.924973-54.812432 40.195783-105.970701c7.308324-18.270811 14.616648-36.541621 21.924973-51.15827 0 0 3.654162 0 3.654162 3.654163 0-7.308324 0-14.616648 7.308324-21.924973C292.750274 746.28368 329.291895 651.275465 373.14184 581.846385c109.624863-175.399781 193.670592-237.520537 193.670592-237.520537-47.504107 47.504107-113.279025 149.820646-168.091457 255.791348-54.812432 105.970701-102.316539 222.903888-124.241512 274.062158 18.270811-10.962486 65.774918-32.887459 105.970701-36.541621 10.962486-7.308324 21.924973-10.962486 32.887459-18.270811 40.195783-25.579135 76.737404-62.120756 113.279025-98.662377-40.195783-3.654162-76.737404-3.654162-76.737404-3.654162 21.924973-3.654162 87.699891-29.233297 113.279025-36.541621 10.962486-10.962486 18.270811-25.579135 29.233297-36.541621 3.654162-3.654162 7.308324-7.308324 7.308325-10.962486 3.654162-7.308324 7.308324-10.962486 10.962486-14.616649 10.962486-14.616648 18.270811-25.579135 21.924972-36.541621 73.083242-124.241512 109.624863-222.903888 142.512323-332.528751C826.257941 33.72207 859.1454 0.834611 859.1454 0.834611S577.774918-32.052848 336.600219 315.092552z"
          />
        </symbol>
        <symbol id="icon-reply" viewBox="0 0 1024 1024">
          <title>评论</title>
          <path
            d="M511.402 962.766c-29.68 0-57.568-11.561-78.549-32.543L327.52 824.889H142.769C98.238 824.889 62 788.65 62 744.119V144.12c0-44.531 36.238-80.769 80.769-80.769H881.23c44.531 0 80.77 36.238 80.77 80.769v599.999c0 44.531-36.238 80.77-80.77 80.77H695.285L589.952 930.223c-20.981 20.982-48.869 32.543-78.55 32.543zM142.769 132.582c-6.366 0-11.538 5.172-11.538 11.538v599.999c0 6.367 5.172 11.539 11.538 11.539h217.304l13.736 17.623 107.993 107.994c15.82 15.797 43.382 15.797 59.202 0l111.34-112.32 10.389-13.297H881.23c6.367 0 11.539-5.172 11.539-11.539V144.12c0-6.366-5.172-11.538-11.539-11.538H142.769z"
          />
          <path
            d="M696.615 378.45H304.308c-19.122 0-34.615-15.494-34.615-34.615 0-19.122 15.494-34.616 34.615-34.616h392.308c19.122 0 34.615 15.494 34.615 34.616-0.001 19.122-15.494 34.615-34.616 34.615zM558.154 571.043H304.308c-19.122 0-34.615-15.494-34.615-34.615s15.494-34.615 34.615-34.615h253.847c19.121 0 34.615 15.494 34.615 34.615s-15.495 34.615-34.616 34.615z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
import Reply from "../../components/reply";
import ArticleService from "../../services/article_service";

export default {
  components: {
    reply: Reply
  },
  data() {
    return {
      article: {},
      newReply: {
        resource_type: 'article.article',
        resource: {},
        reply: {},
        content: '',
      }
    };
  },
  methods: {},
  async mounted() {
    let id = this.$route.query.id;
    this.article = await ArticleService.getArticle(id);
    this.newReply.resource = this.article;

    // this.article.markedContent = marked(this.article.content);
    this.article.markedContent = MavonEditor.markdownIt.render(this.article.content);

    document.title = this.article.title;
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
  // width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  .v-i-header {
    width: 100%;
    height: 200px;
    background-image: linear-gradient(40deg, #9c4dff 0, #42a7ff 100%);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0NzAiIGhlaWdodD0iNDcwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoNzUsNjMsMTQ0KSI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE4IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI5IiBvcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMzkiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEyIiBvcGFjaXR5PSIwLjA4MDY2NjY2NjY2NjY2NjY2IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNzAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjkiIG9wYWNpdHk9IjAuMDU0NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSI4NyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iOSIgb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjExNSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iNyIgb3BhY2l0eT0iMC4wMzczMzMzMzMzMzMzMzMzMyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE0MCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTEiIG9wYWNpdHk9IjAuMDcyMDAwMDAwMDAwMDAwMDEiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIxNjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjE0IiBvcGFjaXR5PSIwLjA5OCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjE4MyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMjAiIG9wYWNpdHk9IjAuMTUiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIyMDgiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjgiIG9wYWNpdHk9IjAuMDQ2IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMjM1IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNiIgb3BhY2l0eT0iMC4xMTUzMzMzMzMzMzMzMzMzNCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjI2MyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTEiIG9wYWNpdHk9IjAuMDcyMDAwMDAwMDAwMDAwMDEiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIyODgiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwIiBvcGFjaXR5PSIwLjA2MzMzMzMzMzMzMzMzMzM0IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMzA1IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNSIgb3BhY2l0eT0iMC4xMDY2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjMzOSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTkiIG9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMzMzQiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIzNzUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjYiIG9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNDAwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSI1IiBvcGFjaXR5PSIwLjAyIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNDE5IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxOSIgb3BhY2l0eT0iMC4xNDEzMzMzMzMzMzMzMzMzNCIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjQ1MiIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTgiIG9wYWNpdHk9IjAuMTMyNjY2NjY2NjY2NjY2NjUiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIxOCIgeT0iMCIgd2lkdGg9IjkiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjY2NyIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjM5IiB5PSIwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wODA2NjY2NjY2NjY2NjY2NiIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjcwIiB5PSIwIiB3aWR0aD0iOSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA1NDY2NjY2NjY2NjY2NjY3IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iODciIHk9IjAiIHdpZHRoPSI5IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMDU0NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIxMTUiIHk9IjAiIHdpZHRoPSI3IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMDM3MzMzMzMzMzMzMzMzMzMiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIxNDAiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA3MjAwMDAwMDAwMDAwMDAxIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMTYwIiB5PSIwIiB3aWR0aD0iMTQiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wOTgiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIxODMiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjE1IiBmaWxsPSIjMjIyIj48L3JlY3Q+PHJlY3QgeD0iMjA4IiB5PSIwIiB3aWR0aD0iOCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA0NiIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjIzNSIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTE1MzMzMzMzMzMzMzMzMzQiIGZpbGw9IiMyMjIiPjwvcmVjdD48cmVjdCB4PSIyNjMiIHk9IjAiIHdpZHRoPSIxMSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjA3MjAwMDAwMDAwMDAwMDAxIiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMjg4IiB5PSIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wNjMzMzMzMzMzMzMzMzMzNCIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjMwNSIgeT0iMCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTA2NjY2NjY2NjY2NjY2NjciIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSIzMzkiIHk9IjAiIHdpZHRoPSIxOSIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzMzM0IiBmaWxsPSIjZGRkIj48L3JlY3Q+PHJlY3QgeD0iMzc1IiB5PSIwIiB3aWR0aD0iNiIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjAyODY2NjY2NjY2NjY2NjY2NyIgZmlsbD0iIzIyMiI+PC9yZWN0PjxyZWN0IHg9IjQwMCIgeT0iMCIgd2lkdGg9IjUiIGhlaWdodD0iMTAwJSIgb3BhY2l0eT0iMC4wMiIgZmlsbD0iI2RkZCI+PC9yZWN0PjxyZWN0IHg9IjQxOSIgeT0iMCIgd2lkdGg9IjE5IiBoZWlnaHQ9IjEwMCUiIG9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMzMzQiIGZpbGw9IiNkZGQiPjwvcmVjdD48cmVjdCB4PSI0NTIiIHk9IjAiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxMDAlIiBvcGFjaXR5PSIwLjEzMjY2NjY2NjY2NjY2NjY1IiBmaWxsPSIjMjIyIj48L3JlY3Q+PC9zdmc+);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    position: relative;
    text-shadow: -5px 5px 0 rgba(0, 0, 0, 0.1);
    .v-i-title {
      margin: 10px 0;
      color: #fdd;
      font-size: 18px;
      width: 60%;
      word-break: break-word;
      text-align: center;
    }
    .v-i-time {
      margin: 10px;
      color: #fdd;
      position: absolute;
      font-size: 14px;
      bottom: 0;
      left: 0;
    }
    .v-i-edit {
      color: #fff;
      cursor: pointer;
      font-size: 28px;
      transform: scale(1);
      transition: 0.3s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .v-i-main {
    // width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .v-i-article {
      width: 650px;
      padding: 20px 30px;
      margin: 20px 0;
      background: #ffffff;
      box-shadow: 0px 0px 3px #ccc;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .v-i-content {
        width: 100%;
        font-size: 13px;
      }
      .v-i-action {
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: flex-end;
        border-radius: 3px;
        font-size: 12px;
        color: #808080;
        position: relative;
        right: -30px;
        bottom: -20px;
        .v-i-reply {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px 8px;
          cursor: pointer;
          .v-i-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 15px;
            margin: 0 5px 0 0;
          }
          .v-i-count {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 20px;
          }
        }
      }
    }

    .v-i-replies {
      width: 650px;
      margin: 0 0 20px 0;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: -6px;
        right: 0;
        width: 0px;
        height: 0px;
        margin: 0 33px;
        border-width: 7px;
        border-style: solid;
        border-color: #fff transparent  transparent #fff;
        transform: rotate(45deg);
        box-shadow: -1px -1px 3px #ccc;
      }
    }

    @media screen and (max-width: 720px), (max-height: 500px) {
      .v-i-article {
        width: 100%;
      }
      .v-i-replies {
        width: 100%;
      }
    }
  }
}
</style>
