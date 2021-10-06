<template>

</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "MovieList",
  computed: {
    ...mapState(['movieList'])
  },
  mounted() {
    console.log(this.movieList);
  }
}
</script>

<style scoped>

</style>