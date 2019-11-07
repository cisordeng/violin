<template>
  <div class="v-main main">
    <div class="v-i-main">
      <div class="v-i-notfound">404</div>
      <div class="v-i-notfound">PAGE NOT FOUND</div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  mounted: function() {
    document.title = "404 PAGE NOT FOUND";
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.v-main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .v-i-main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .v-i-notfound {
      color: #4b3f90;
      font-size: 32px;
      font-weight: bold;
    }
  }
}
</style>>