<template>
  <div class="v-main main">
    <div class="v-i-header">
      <div class="v-i-title">动态</div>
      <div class="v-i-time">{{word && word.created_at && word.created_at.split(' ')[0]}}</div>
      <router-link class="v-i-edit" :to="{ path: '/edit_word', query: { id: word.id } }">
        <svg class="icon">
          <use xlink:href="#icon-edit" />
        </svg>
      </router-link>
    </div>
    <div class="v-i-main">
      <div class="v-i-word">
        <div class="v-i-content content" v-html="word.markedContent"></div>
      </div>
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
      </defs>
    </svg>
  </div>
</template>

<script>
// import Vue from "vue";
import MusicPlayer from "../../components/music_player";
import WordService from "../../services/word_service";
// import Resource from '../lib/resource'

export default {
  components: {
    "music-player": MusicPlayer
  },
  data() {
    return {
      word: {}
    };
  },
  methods: {},
  async mounted() {
    let id = this.$route.query.id;
    this.word = await WordService.getWord(id);

    // this.word.markedContent = marked(this.word.content);
    this.word.markedContent = MavonEditor.markdownIt.render(this.word.content);

    document.title = this.word.created_at;
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
    // background-image: url(https://s2.ax1x.com/2019/10/26/KDyb6g.jpg);
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMTA0LDE1Nyw1MCkiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wNzIwMDAwMDAwMDAwMDAwMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjMwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4xNDEzMzMzMzMzMzMzMzMzNCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjYwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wNzIwMDAwMDAwMDAwMDAwMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjkwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wNzIwMDAwMDAwMDAwMDAwMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjEyMCIgeT0iMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMTMyNjY2NjY2NjY2NjY2NjUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSIxNTAiIHk9IjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjExNTMzMzMzMzMzMzMzMzM0IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iMzAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjEwNjY2NjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wODkzMzMzMzMzMzMzMzMzMyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjYwIiB5PSIzMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDQ2IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iOTAiIHk9IjMwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjEyMCIgeT0iMzAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjEyNDAwMDAwMDAwMDAwMDAxIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iMTUwIiB5PSIzMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDQ2IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iMCIgeT0iNjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjE1IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iMzAiIHk9IjYwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xMzI2NjY2NjY2NjY2NjY2NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjYwIiB5PSI2MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTI0MDAwMDAwMDAwMDAwMDEiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSI5MCIgeT0iNjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjAyIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iMTIwIiB5PSI2MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTA2NjY2NjY2NjY2NjY2NjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSIxNTAiIHk9IjYwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4xMDY2NjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjAiIHk9IjkwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4xMDY2NjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjMwIiB5PSI5MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDgwNjY2NjY2NjY2NjY2NjYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSI2MCIgeT0iOTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA5OCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjkwIiB5PSI5MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDI4NjY2NjY2NjY2NjY2NjY3IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iMTIwIiB5PSI5MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMDQ2IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iMTUwIiB5PSI5MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMjIyIiBmaWxsLW9wYWNpdHk9IjAuMTUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIxMjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA0NiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjMwIiB5PSIxMjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjE0MTMzMzMzMzMzMzMzMzM0IiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iNjAiIHk9IjEyMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDcyMDAwMDAwMDAwMDAwMDEiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSI5MCIgeT0iMTIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNDYiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSIxMjAiIHk9IjEyMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDcyMDAwMDAwMDAwMDAwMDEiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSIxNTAiIHk9IjEyMCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMDU0NjY2NjY2NjY2NjY2NjciIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSIwIiB5PSIxNTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzIyMiIgZmlsbC1vcGFjaXR5PSIwLjA5OCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjMwIiB5PSIxNTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0iI2RkZCIgZmlsbC1vcGFjaXR5PSIwLjAyIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIj48L3JlY3Q+PHJlY3QgeD0iNjAiIHk9IjE1MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZGRkIiBmaWxsLW9wYWNpdHk9IjAuMTQxMzMzMzMzMzMzMzMzMzQiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiPjwvcmVjdD48cmVjdCB4PSI5MCIgeT0iMTUwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNjMzMzMzMzMzMzMzMzMzNCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjEyMCIgeT0iMTUwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wNTQ2NjY2NjY2NjY2NjY2NyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0PjxyZWN0IHg9IjE1MCIgeT0iMTUwIiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNkZGQiIGZpbGwtb3BhY2l0eT0iMC4wMzczMzMzMzMzMzMzMzMzMyIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wMiI+PC9yZWN0Pjwvc3ZnPg==);
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
    justify-content: center;
    .v-i-word {
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
    }

    @media screen and (max-width: 720px), (max-height: 500px) {
      .v-i-word {
        width: 90%;
      }
    }
  }
}
</style>
