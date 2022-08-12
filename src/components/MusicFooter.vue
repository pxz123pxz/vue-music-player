<template>
  <div class="footer">
    <div class="audio-container">
      <audio
        autoPlay
        preload="metadata"
        :src="link"
        ref="Audio"
        @playing="updatePlay"
        @pause="updatePause"
        @play="getDuration"
        @timeupdate="getCurrentTime"
      ></audio>
      <input
        type="range"
        id="progress"
        step="any"
        v-model.number="width"
        min="0"
        max="100"
        @click="changeProgess"
        @mousedown="MouseDown"
        @mousemove="MouseMove"
        @mouseup="MouseUp"
      />
      <div class="audioContainer">
        <!-- 歌曲小封面部分 -->
        <div class="musiccover">
          <div
            class="coverimage-container"
            @click="controlLyric"
            title="展开查看音乐详情部分"
          >
            <img :src="albumImageUrl" alt="封面" />
          </div>
          <div class="music-settle">
            <div class="music-message" v-show="!link">听音乐-享受生活</div>
            <div class="music-message" v-show="link">
              <span>{{ songname }}-</span>
              <span :title="singername">{{ singername }} </span>
            </div>
            <span class="iconfont icon-aixin aixin iconitem"></span>
            <span class="iconfont icon-xiazai iconitem"></span>
            <span class="iconfont icon-gengduocaozuo iconitem"></span>
            <span class="iconfont icon-pinglun iconitem"></span>
          </div>
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
                @click="playMusic"
              ></span>
              <span
                class="iconfont icon-bofangzanting playitem zangting"
                v-if="isPlay"
                @click="pauseMuisc"
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
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { reqGetMusicLyric } from "@/api/index";
export default {
  name: "MusicFooter",
  data() {
    return {
      isPlay: false,
      // 歌曲总时长
      duration: 0,
      audio: null,
      currentTime: 0,
      width: 0,
      isDrag: false,
    };
  },
  methods: {
    // 暂停音乐
    pauseMuisc() {
      // let audio = this.$refs.Audio;
      this.audio.pause();
      this.isPlay = false;
    },
    // 播放音乐
    playMusic() {
      // let audio = this.$refs.Audio;
      this.audio.play();
      this.isPlay = true;
    },
    // 获取歌曲的长度
    getDuration() {
      // let audio = this.$refs.Audio;
      this.duration = this.audio.duration;
      // console.log(audio.currentTime)
    },
    // 获取歌曲当前的播放时间
    getCurrentTime() {
      this.currentTime = this.audio.currentTime;
    },
    // 点击封面，出现歌词页面,并发送请求，获取歌词
    async controlLyric() {
      this.$bus.$emit("showLyric", true);
    },
    updatePlay() {
      this.isPlay = true;
      this.$store.dispatch("updateAudioStatus", this.isPlay);
    },
    updatePause() {
      this.isPlay = false;
      this.$store.dispatch("updateAudioStatus", this.isPlay);
    },

    MouseDown() {
      this.isDrag = true; //鼠标开始按下
    },
    MouseMove() {
      // 如果鼠标按下了，开始计算播放时间
      if (this.isDrag) {
        this.currentTime = (this.width / 100) * this.duration;
      }
    },
    MouseUp() {
      this.audio.currentTime = (this.width / 100) * this.duration;
      this.isDrag = false;

      // this.audio.play();
    },
    // 点击进度条的某个部分，切换进度
    changeProgess() {
      // console.log(this.width);
      this.currentTime = (this.width / 100) * this.duration;
      this.audio.currentTime = (this.width / 100) * this.duration;
    },
  },
  computed: {
    // 歌曲的总时长
    totalTime() {
      let m =
        Math.floor(this.duration / 60) < 10
          ? "0" + Math.floor(this.duration / 60)
          : Math.floor(this.duration / 60);
      let s =
        Math.floor(this.duration % 60) < 10
          ? "0" + Math.floor(this.duration % 60)
          : Math.floor(this.duration % 60);
      let result = m + ":" + s;
      return result;
    },
    // 歌曲播放中的总时长，随着歌曲的进度该表
    updateTotalTime() {
      let m =
        Math.floor(this.currentTime / 60) < 10
          ? "0" + Math.floor(this.currentTime / 60)
          : Math.floor(this.currentTime / 60);
      let s =
        Math.floor(this.currentTime % 60) < 10
          ? "0" + Math.floor(this.currentTime % 60)
          : Math.floor(this.currentTime % 60);
      let updateresult = m + ":" + s;
      return updateresult;
    },
    ...mapGetters({
      albumImageUrl: "albumImage",
    }),
    ...mapState({
      link: (state) => state.lyric.link,
      songmid: (state) => state.lyric.songmid,
      songname: (state) => state.lyric.songname,
      singername: (state) => state.lyric.singername,
    }),
  },
  watch: {
    // 歌曲自动播放时，监听歌曲播放的位置，并动态更改进度条的位置
    currentTime() {
      let range = (this.currentTime / this.duration) * 100;
      this.width = range;
      // 获取歌曲当前播放的时间，并存储到vuex中
      this.$store.dispatch("getMusicCurrentTime", {
        currentTime: this.currentTime,
        totalTime: this.totalTime,
        updateTotalTime: this.updateTotalTime,
        audio: this.audio,
        width: this.width,
        duration: this.duration,
        isPlay: this.isPlay,
      });
    },
    link() {
      this.isPlay = true;
      //切换歌曲时，将进度条宽度设置为0
      this.width = 0;
    },
  },
  mounted() {
    // 组件挂载，就获取audio元素
    this.audio = this.$refs.Audio;
    // if (this.link) {

    // }
  },
};
</script>

<style lang="less" scoped>
// footer部分
.footer {
  flex: 0.8;
  #progress {
    width: 100%;
    height: 2px;
    cursor: pointer;
  }
  .audioContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .musiccover {
      display: flex;
      flex: 1;
      align-items: center;
      margin-top: 10px;
      margin-left: 20px;
      .coverimage-container {
        width: 40px;
        height: 40px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
      .music-settle {
        margin-left: 20px;
        .music-message {
          font-size: 12px;
          width: 100px;
          height: 20px;
          line-height: 20px;
          margin-bottom: 10px;
          color: rgb(19, 19, 19);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
        }
        .iconitem {
          color: rgba(75, 74, 72, 0.733);
          font-size: 18px;
          margin-right: 10px;
          cursor: pointer;
        }
        .aixin {
          color: rgb(255, 106, 106);
        }
      }
    }
    .playControl-warpper {
      flex: 1;
      // width: 250px;
      margin-top: 10px;
      margin-left: 160px;
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
      padding-right: 60px;
      margin-top: 10px;
      font-size: 12px;
      color: rgb(84, 78, 78);
    }
  }
}
</style>