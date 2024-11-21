<template>
  
  <router-view/>
</template>
<script>
export default{
  mounted() {
  window.scrollTo(0, 0);
}
}

</script>

<style>
  html {
    scroll-behavior: smooth;
  }
</style>
