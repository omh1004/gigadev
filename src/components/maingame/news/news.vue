<template>
  <div class="news-background">
    <div class="news-page">
      <NewsMain />
      <NewsImage />
    </div>
    <NewsDialog />
  </div>
</template>
<script>
import NewsMain from './newsman.vue';
import NewsImage from './newsimage.vue';
import NewsDialog from './newsdialog.vue';

export default {
  components:{ NewsMain,NewsImage,NewsDialog }
}
</script>
<style scoped>
  .news-background{
    width:100vw;
    height:100vh;
    background-image:url("/src/assets/tutorial.jpg");
    /* background-size:contain; */
    background-size:100% 100%;
    background-repeat:no-repeat;
  }
  .news-page{
    display:flex;
    width:100vw;
    height:70vh;
  }
</style>