<template>
  <div class="bg">
    <div class="bg-pattern" />
    <img src="@/assets/fight_club.jpg" alt="Fight Club">
  </div>
</template>

<script>
export default {
  name: 'Background'
}
</script>

<style scoped>
.bg {
  overflow: hidden;
  position: absolute;
  z-index: 2;
  width: 100%;
  min-width: 1100px;
  height: 100%;
  margin: 0 auto;
}
.bg .bg-pattern {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: url('../assets/bg-movie-detail-pattern.png') repeat 0 0;
}
.bg img {
  display: block;
  width: 100%;
  -webkit-filter: blur(20px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(15px);
}
</style>