<template>
  <div class="app">
    <MusicAside></MusicAside>
    <MusicCenter></MusicCenter>
    <MusicLyric></MusicLyric>
    <LoginInterface></LoginInterface>
  </div>
</template>

<script>
import MusicAside from "@/components/MusicAside.vue";
import MusicCenter from "@/components/MusicCenter.vue";
import MusicLyric from "@/components/MusicLyric.vue";
import LoginInterface from "@/components/LoginInterface";
export default {
  name: "App",
  components: { MusicAside, MusicCenter, MusicLyric, LoginInterface },
  // 禁止选中内容
  created() {
    this.$nextTick(() => {
      document.onselectstart = new Function("event.returnValue=false");
    });
  },
};
</script>

<style lang="less">
.app {
  // margin: 10px auto;
  min-width: 1060px;
  min-height: 700px;
  width: 100vw;
  height: 100vh;
  display: flex;
  // font-weight: bold;
  position: relative;
  overflow: hidden;
  font-family: poppin, Tahoma, Arial, \5fae\8f6f\96c5\9ed1, sans-serif;
}
</style>
