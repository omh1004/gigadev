<template>
  <div>
      <NavComponent/>
      <router-view></router-view>
  </div>
</template>
<script>
import NavComponent from './components/NavComponent.vue';

export default {
  name:"RouterApp",
  components:{NavComponent},

}
</script>
<style>
  
</style>