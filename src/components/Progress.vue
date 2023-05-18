<template>
  <div class="progress-container" @mousedown="changeDragStatus(true)" @mouseup="changeDragStatus(false)">
    <div class="block">
      <el-slider
        id="slider"
        v-model="timerate"
        :show-tooltip="false"
        :step="0.01"
        @change="changeProgess"
        
      ></el-slider>
    </div>
  </div>
</template>

<script>

import { mapState } from "vuex";
export default {
  name: "Progress",
  data() {
    return {
      timerate: this.width
    };
  },
  methods: {
    // 点击进度条的某个部分，切换进度
    changeProgess(newval) {
      console.log("触发了change：",newval)
      this.$bus.$emit("changeProgress", (newval / 100) * this.duration);
    },
    changeDragStatus(data) {
      console.log(data);
      this.$bus.$emit("changeDrag", data);
    }
  },
  watch: {
    width(newval) {
      this.timerate = newval;
    }
  },
  computed: { 
    ...mapState({
      width: (state) => state.lyric.width,
      duration: (state) => state.lyric.duration
    }),
  },
  
};
</script>

<style lang="less" scoped>
.progress-container {
  width: 100%;
  cursor: pointer;
  .block {
    width: 99%;
    //强制修改样式，解决在歌词页面出现的情况
    /deep/.el-slider__button-wrapper {
      z-index: 0;
    }
  }
}
</style>