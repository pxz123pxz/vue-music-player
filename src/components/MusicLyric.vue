<template>
  <transition name="transitionLyric" appear>
    <div class="lyric-container" v-show="isShowLyric">
      <div class="bgPlay_mask"></div>
      <div
        class="bgPlayer"
        :style="{ 'background-image': `url(${albumImageUrl})` }"
      ></div>
      <div>
        <div class="tool-bar">
          <div class="arrowcontainer">
            <span class="iconfont icon-down_arrow" @click="changeIsShow"></span>
          </div>
          <div class="tool-container">
            <span class="iconfont icon-suoxiao"></span>
            <span class="iconfont icon-zuidahua"></span>
            <span class="iconfont icon-guanbi"></span>
          </div>
        </div>
        <div class="coverMusicContainer">
          <div class="music-cover">
            <div class="imgcontainer">
              <img :src="albumImageUrl" alt="专辑封面" />
            </div>
          </div>

          <div class="music-lyric">
            <div class="lyric-wrapper">
              <div class="lyric-name" :title="songname">{{ songname }}</div>
              <div class="nolyric" v-show="LyricList.length <= 1">暂无歌词</div>
              <div
                class="lyric-songer"
                :title="singername"
                v-show="LyricList.length > 1"
              >
                歌手：{{ singername }}
              </div>
              <div
                class="lyric-ablum"
                :title="albumname"
                v-show="LyricList.length > 1"
              >
                专辑：{{ albumname }}
              </div>
              <ul class="lyric-list" ref="lyricUL">
                <li
                  ref="lyric"
                  class="lyric-item"
                  v-for="(item, index) in LyricList"
                  :key="index"
                  v-show="item.words"
                  :data-index="index"
                >
                  <span
                    ref="lyrictext"
                    class="text"
                    :class="{ load: lyricindex === index ? true : false }"
                    >{{ item.words }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-wrapper">
          <!-- 进度条 -->
          <input
            type="range"
            id="progress"
            step="any"
            v-model.number="width"
            min="0"
            max="100"
            disabled
          />
          <div class="audioContainer">
            <div class="music-settle">
              <span class="iconfont icon-aixin settleitem"></span>
              <span class="iconfont icon-xiazai settleitem"></span>
              <span class="iconfont icon-gengduocaozuo settleitem"></span>
              <span class="iconfont icon-pinglun settleitem"></span>
            </div>
            <!-- 歌曲播放控件部分 -->
            <div class="playControl-warpper">
              <div class="playControl">
                <span class="iconfont icon-24gl-shuffle playitem"></span>
                <span class="iconfont icon-shangyiqu101 playitem"></span>
                <div class="bofangzanting">
                  <span
                    class="iconfont icon-24gl-play playitem bofang"
                    v-if="!isPlay"
                    @click="playmusic"
                  ></span>
                  <span
                    class="iconfont icon-bofangzanting playitem zangting"
                    v-if="isPlay"
                    @click="pausemusic"
                  ></span>
                </div>
                <span class="iconfont icon-xiayiqu101 playitem"></span>
                <span class="iconfont icon-yinliang playitem"></span>
              </div>
            </div>
            <div class="timeContainer">
              <span>{{ updateTotalTime }}</span
              >/
              <span>{{ totalTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "MusicLyric",
  data() {
    return {
      isShowLyric: false,
      lyricindex: -1,
      isload: false,
      isDrag: false,
      newCurrentTime: 0,
      newWidth: 0,
    };
  },
  computed: {
    ...mapGetters({
      LyricList: "newLyricList",
      MusicMsg: "musicTitle",
      albumImageUrl: "albumImage",
    }),
    ...mapState({
      currentTime: (state) => state.lyric.currentTime,
      totalTime: (state) => state.lyric.totalTime,
      updateTotalTime: (state) => state.lyric.updateTotalTime,
      audio: (state) => state.lyric.audio,
      width: (state) => state.lyric.width,
      link: (state) => state.lyric.link,
      duration: (state) => state.lyric.duration,
      isPlay: (state) => state.lyric.isPlay,
      songname: (state) => state.lyric.songname,
      singername: (state) => state.lyric.singername,
      albumname: (state) => state.lyric.albumname,
    }),
  },
  methods: {
    changeIsShow() {
      this.$bus.$emit("showLyric", false);
    },

    playmusic() {
      this.audio.play();
    },
    pausemusic() {
      this.audio.pause();
    },
  },
  mounted() {
    this.$bus.$on("showLyric", (data) => {
      this.isShowLyric = data;
    });
  },
  watch: {
    currentTime() {
      let a = 0;
      let time = 0;
      for (let i = 0; i < this.LyricList.length; i++) {
        if (this.currentTime >= parseFloat(this.LyricList[i].time)) {
          const index = this.$refs.lyric[i].dataset.index;
          if (i === parseInt(index)) {
            this.lyricindex = i;
            let height = this.$refs.lyric[i].offsetHeight;
            a += height;
            this.$refs.lyricUL.scrollTop = a;
            // if (i < this.LyricList.length - 1) {
            //   time =
            //     parseFloat(this.LyricList[i + 1].time) -
            //     parseFloat(this.LyricList[i].time);
            //   // console.log(time);
            //   this.$refs.lyrictext[i].style.animationDuration = time + "s";

            //   let height = this.$refs.lyric[i].offsetHeight;

            //   a += height;
            //   // console.log(a);
            //   this.$refs.lyricUL.scrollTop = a;
            // } else {
            //   time = 0;
            // }
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.lyric-container {
  min-width: 1060px;
  min-height: 700px;
  width: 100%;
  height: 100vh;
  // box-shadow: 8px 10px 6px 2px rgb(207, 202, 202);
  // background-color: rgb(121, 113, 122);
  // background-size: cover;
  position: absolute;
  // background: linear-gradient(
  //   to bottom,
  //   rgb(250, 250, 250),
  //   85%,
  //   rgb(171, 214, 243)
  // );
  // 当做一个图层
  .bgPlay_mask {
    position: absolute;
    top: 0;
    left: 0;
    // background-color: rgb(97, 94, 93);
    background-color: #000;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  // 使背景为专辑封面图，并实现模糊与透明的效果
  .bgPlayer {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    // background-image: url(https://y.gtimg.cn/music/photo_new/T002R300x300M000003vyvvf2kbfel.jpg);
    background-color: rgb(255, 255, 255);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(65px);
    opacity: 0.7;
    transform: translateZ(-30px);
    z-index: 1;
  }
  .tool-bar {
    position: relative;
    z-index: 5;
    margin-top: 15px;
    display: flex;
    margin-bottom: 100px;
    span {
      color: rgb(223, 218, 218);
      cursor: pointer;
    }
    .arrowcontainer {
      flex: 5;
      padding-left: 20px;
    }
    .tool-container {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      span {
        margin-right: 20px;
      }
    }

    span:hover {
      color: rgb(34, 198, 145);
    }
  }
  .coverMusicContainer {
    position: relative;
    z-index: 5;
    display: flex;
    // margin-left: 50px;
    .music-cover {
      // max-width: 370px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      // margin-top: 100px;
      // margin-left: 50px;
      .imgcontainer {
        width: 80%;
        height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          min-height: 340px;
          min-width: 350px;
          max-width: 370px;
          max-height: 362px;
          // max-width: 88%;
          // max-height: 80%;
        }
      }
    }

    .music-lyric {
      // height: 395px;
      flex: 1;
      display: flex;
      align-items: center;
      // justify-content: center;
      .lyric-wrapper {
        height: 395px;
        padding-left: 100px;
        align-items: center;
        .lyric-name {
          width: 300px;
          text-align: center;
          margin-bottom: 25px;
          color: rgb(255, 255, 255);
          font-size: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .nolyric {
          font-size: 26px;
          text-align: center;
          color: rgb(255, 255, 255);
        }
        .lyric-songer,
        .lyric-ablum {
          text-align: center;
          font-size: 14px;
          margin-bottom: 8px;
          // 隐藏多余的文字
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgb(255, 255, 255);
        }
        .lyric-songer {
          width: 300px;
          text-align: center;
          // margin-left: 80px;
          cursor: pointer;
        }
        .lyric-ablum {
          width: 300px;
          text-align: center;
          // margin-left: 30px;
          cursor: pointer;
        }
        .lyric-list {
          padding-top: 180px;
          width: 300px;
          align-items: center;
          height: 100px;
          overflow-y: scroll;
          text-align: center;
          margin-top: 30px;
          scroll-behavior: smooth;
          .lyric-item {
            line-height: normal; //设置合理的行间距
            color: rgb(255, 255, 255);
            padding-bottom: 20px;
            // white-space: normal;
            // transition: all 0.1s linear;
          }
          // 设置背景，后面文字颜色渐变需要使用
          // .text {
          //   background: #fff -webkit-linear-gradient(
          //       left,
          //       rgb(37, 196, 232),
          //       rgb(37, 196, 232)
          //     ) no-repeat 0 0;
          //   -webkit-text-fill-color: transparent;
          //   background-clip: text;
          //   background-size: 0% 100%;
          // }

          .load {
            // background-size: 100% 100%;
            // animation: scan ease-in-out;
            color: #2ff8cc;
          }
        }
        .lyric-list::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
  .footer-wrapper {
    position: relative;
    z-index: 5;
    margin-top: 120px;
    // margin-left: 50px;

    #progress {
      width: 95%;
      height: 2px;
      cursor: pointer;
      margin-left: 35px;
    }
    .audioContainer {
      display: flex;
      // margin-top: 28px;
      margin-left: 23px;
      .music-settle {
        margin-left: 20px;
        margin-top: 28px;
        flex: 1;
        .settleitem {
          // color: rgb(203, 221, 234);
          color: rgb(255, 255, 255);
          font-size: 18px;
          margin-right: 10px;
          cursor: pointer;
        }
        .settleitem:hover {
          color: rgb(30, 208, 161);
        }
        span:nth-of-type(1) {
          color: rgb(255, 106, 106);
        }
      }
      .playControl-warpper {
        // width: 250px;
        flex: 1;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          // color: rgb(219, 219, 219);
          color: rgb(255, 255, 255);
        }
        span:hover {
          color: rgb(30, 208, 161);
        }
        .bofangzanting {
          display: inline-block;
          width: 35px;
          height: 35px;
          line-height: 35px;
          border: 1px solid rgb(30, 207, 159);
          background: rgb(30, 207, 159);
          border-radius: 50%;
          margin-right: 10px;
          .bofang {
            padding-left: 7px;
            font-size: 23px;
            color: rgb(246, 246, 246);
            cursor: pointer;
          }
          .zangting {
            padding-left: 6px;
            font-size: 23px;
            color: rgb(246, 246, 246);
            cursor: pointer;
          }
        }
        .playitem {
          margin-right: 10px;
          font-size: 22px;
          cursor: pointer;
        }
      }
      .timeContainer {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        padding-right: 100px;
        margin-top: 28px;
        font-size: 12px;
        color: rgb(203, 221, 234);
      }
    }
  }
}
// 设置动画，关键帧
@keyframes scan {
  0% {
    background-size: 0% 100%;
  }
  100% {
    background-size: 100% 100%;
  }
}
.transitionLyric-enter,
.transitionLyric-leave-to {
  transform: translateY(100%);
}
.transitionLyric-enter-active,
.transitionLyric-leave-active {
  transition: 0.3s ease-in-out;
}
.transitionLyric-enter-to,
.transitionLyric-leave {
  transform: translateY(0);
}
</style>