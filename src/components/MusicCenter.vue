<template>
  <div class="center">
    <MusicHeader></MusicHeader>
    <router-view></router-view>
    <MusicFooter></MusicFooter>
  </div>
</template>

<script>
import MusicHeader from "@/components/MusicHeader";
// import MusicContent from "@/components/MusicContent";
import MusicFooter from "@/components/MusicFooter";

export default {
  name: "MusicCenter",
  components: { MusicHeader, MusicFooter },
};
</script>

<style lang="less" scoped>
.center {
  flex: 3.9;
  display: flex;
  flex-direction: column;
  background-color: rgb(246, 246, 246);
  position: relative;
}
</style>