<template>
  <div class="newsman">
    <h3>DAY-1 NEWS</h3>
    <img src="@/resources/newsman.png">
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .newsman{
    width:50vw;
    height:70vh;
  }
  .newsman>h3{
    display:flex;
    justify-content:center;
    align-items:center;
    width:25vw;
    height:25vh;
    font-size:5vh;
    margin:0;
  }
  .newsman>img{
    width:45vh;
    height:45vh;
    margin-left:5vw;
  }
</style>