<template>
    <div class="v-main">
         <mavon-editor v-model="article.content"/>
    </div>
</template>

<script>
// import Vue from "vue";
import ArticleService from "../../services/article_service";
// import Resource from '../lib/resource'

export default {
  components: {

  },
  data() {
    return {
        article: {
            title: '',
            content: '',
        }
    };
  },
  computed: {
  },
  methods: {
  },
  async mounted() {
    
    let id = this.$route.query.id;
    if (id) {
        this.article = await ArticleService.getArticle(id);
        document.title = `编辑笔记 | ${this.article.title}`;
    } else {
        document.title = '新增笔记';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.v-main {
  width: 100%;
  height: 100%;
}
</style>
