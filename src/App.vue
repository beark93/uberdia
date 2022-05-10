<template>
  <TheHome />
</template>

<script>
import TheHome from './components/TheHome.vue'

export default {
  name: 'App',
  components: {
    TheHome
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
body {
  margin: 0px;
  background-color: #262626;
}
#app {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
