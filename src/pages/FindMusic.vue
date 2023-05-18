<template>
  <div class="discoverMusic">
    <div class="title-list">
      <div class="title-item">首页</div>
    </div> 
    <div class="banner-container">
      <div
        class="banner-item"
        ref="banners"
        v-for="(item, index) in bannerArr"
        :key="index"
        :data-index="index"
        :class="{
          middle: index === middleIndex,
          left: index === leftIndex,
          right: index === rightIndex,
        }"
      >
        <img :src="item.imageUrl" title="歌曲封面" />
      </div>
      <div id="navDiv">
        <a
          href="javascript:;"
          v-for="(imgUrl, index) in bannerArr"
          :key="index"
          :class="{ active: index === middleIndex }"
          @mouseenter="changeImage(index)"
        ></a>
      </div>
      <div class="pre" @click="goBack">
        <span class="iconfont icon-zuojiantou"></span>
      </div>
      <div class="next" @click="goNext">
        <span class="iconfont icon-youjiantou"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetBanner } from "@/api/index";
export default {
  name: "FindMusic",
  data() {
    return {
      bannerArr: [],
      bannerTimer: null,
      leftIndex: 7,
      middleIndex: 0,
      rightIndex: 1,
    };
  },
  methods: {
    // 使轮播图自动变化
    CarouselBanners() {
      // clearInterval(this.bannerTimer);
      this.bannerTimer = setInterval(() => {
        this.leftIndex++;
        this.middleIndex++;
        this.rightIndex++;
        if (this.leftIndex > this.bannerArr.length - 1) {
          this.leftIndex = 0;
        }
        if (this.middleIndex > this.bannerArr.length - 1) {
          this.middleIndex = 0;
        }
        if (this.rightIndex > this.bannerArr.length - 1) {
          this.rightIndex = 0;
        }
      }, 2000);
    },
    goBack() {
      clearInterval(this.bannerTimer);
      this.leftIndex--;
      this.middleIndex--;
      this.rightIndex--;
      if (this.leftIndex < 0) {
        this.leftIndex = this.bannerArr.length - 1;
      }
      if (this.middleIndex < 0) {
        this.middleIndex = this.bannerArr.length - 1;
      }
      if (this.rightIndex < 0) {
        this.rightIndex = this.bannerArr.length - 1;
      }
      this.CarouselBanners();
    },
    goNext() {
      clearInterval(this.bannerTimer);
      this.leftIndex++;
      this.middleIndex++;
      this.rightIndex++;
      if (this.leftIndex > this.bannerArr.length - 1) {
        this.leftIndex = 0;
      }
      if (this.middleIndex > this.bannerArr.length - 1) {
        this.middleIndex = 0;
      }
      if (this.rightIndex > this.bannerArr.length - 1) {
        this.rightIndex = 0;
      }
      this.CarouselBanners();
    },
    changeImage(index) {
      clearInterval(this.bannerTimer);
      this.middleIndex = index;
      this.leftIndex = index - 1;
      this.rightIndex = index + 1;
      if(this.leftIndex < 0) {
        this.leftIndex = this.bannerArr.length - 1;
      }
      if(this.rightIndex > this.bannerArr.length - 1) {
        this.rightIndex = 0;
      }
      this.CarouselBanners()
    }
  },
  async created() {
    try {
      let resultBanner = await reqGetBanner();
      // console.log(resultBanner.banners);
      this.bannerArr = resultBanner.banners;
    } catch (e) {
      this.$message({
        message: "首页获取数据失败",
        type: "error",
      });
    }
  },
  mounted() {
    this.CarouselBanners();
  },
};
</script>

<style lang="less" scoped>
.discoverMusic {
  flex: 7;
  .banner-container {
    width: 100%;
    height: 200px;
    margin-top: 20px;
    transform: translateX(80px);
    position: relative;
    cursor: pointer;
    .banner-item {
      position: absolute;
      left: 300px;
      width: 550px;
      height: 200px;
      z-index: -1; //处于中间位置就使它层级为负值
      transition: all 0.6s;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .middle {
      z-index: 9999;
      transform: translateX(0);
      transform: scale(1.2);
    }
    .left {
      transform: translateX(-300px);
    }
    .right {
      transform: translateX(300px);
    }
    #navDiv {
      position: absolute;
      bottom: 55px;
      margin-left: 480px;
      margin-bottom: -100px;
      .active {
        background-color: red;
      }
    }
    #navDiv a {
      float: left;
      width: 8px;
      height: 8px;
      background-color: gray;
      margin: 0 5px;
      opacity: 0.5;
      border-radius: 50%;
    }

    /*设置鼠标移入的效果*/
    #navDiv a:hover {
      background-color: red;
    }

    .pre {
      display: none;
      position: absolute;
      top: 90px;
      span {
        font-size: 40px;
        color: white;
      }
    }
    .pre:hover span {
      color: rgb(176, 173, 173);
    }

    .next {
      display: none;
      position: absolute;
      top: 90px;
      right: 180px;
      span {
        font-size: 40px;
        color: rgb(225, 218, 218);
      }
    }
    .next:hover span {
      color: rgb(176, 173, 173);
    }
    &:hover .pre,
    &:hover .next {
      display: block;
    }
  }
}
</style>
