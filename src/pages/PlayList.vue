<template>
  <div class="music-list-container">
    <div class="music-list-title">
      <div class="title-item">歌曲</div>
      <div class="title-item">歌手</div>
      <div class="title-item">专辑</div>
      <div class="title-item">时长</div>
    </div>

    <div class="music-list">
      <div
        class="music-item"
        v-for="(music, index) in musicList"
        :key="index"
        :class="{ 'current-music': music.id === songmid ? true : false }"
      >
        <div
          class="music-name"
          :title="music.al.length !== 0 ? music.al[0] : undefined"
        >
          <i class="iconfont icon-3aixin"></i>
          <span>{{ music.name }}</span>
          <span>{{ music.al.length !== 0 ? music.al[0] : undefined }}</span>
        </div>
        <div class="music-mod-menu">
          <a
            href="javascript:;"
            title="播放"
            @click="
              playMusic(
                music.id,
                music.name,
                music.ar.map((songer) => songer.name).join('/'),
                music.al.picUrl,
                music.al.name
              )
            "
          >
            <i
              class="iconfont icon-24gl-play"
              v-if="(music.id === songmid ? false : true) || !isPlay"
            ></i>
            <i
              class="iconfont icon-bofangzanting"
              v-if="isPlay && music.id === songmid ? true : false"
            ></i>
          </a>
          <a href="#" title="添加到">
            <i class="iconfont icon-tianjiadao"></i>
          </a>
          <a href="#" title="下载">
            <i class="iconfont icon-xiazai"></i>
          </a>
          <a href="#" title="更多操作">
            <i class="iconfont icon-gengduocaozuo"></i>
          </a>
        </div>
        <div
          class="music-songer"
          :title="music.ar.map((songer) => songer.name).join('/')"
        >
          <span>{{ music.ar.map((songer) => songer.name).join("/") }} </span>
        </div>
        <div class="music-ablum">
          <span :title="music.al.name">{{ music.al.name }}</span>
        </div>
        <div class="music-time">
          <span>{{ getFormatTime(music.dt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatTime from "@/tools/formatTime";
import { reqGetMusicLyric } from "@/api/index";
export default {
  name: "PlayList",
  props: {
    musicList: Array,
    isPlay: Boolean,
    songmid: Number,
  },
  methods: {
    async playMusic(songmid, songname, singername, albumurl, albumname) {
      // 获取歌词
      let result = await reqGetMusicLyric(songmid);
      // console.log("歌词结果", result);
      if (result.code === 200) {
        let musicLyric = result.lrc.lyric;
        // 获取歌词，存储到vuex中
        this.$store.dispatch("getMusicLyric", musicLyric);

        // console.log(typeof(musicLyric));
        // 将歌曲信息存储到vuex中
        this.$store.dispatch("getLinkAndAlbum", {
          songmid: songmid,
          songname: songname,
          singername: singername,
          albumurl: albumurl,
          albumname: albumname,
        });
      }
    },
    // 将时间格式化为00:00的形式
    getFormatTime(time) {
      time = Math.floor(time / 1000);
      return formatTime(time);
    },
  },
};
</script>

<style lang='less' scoped>
.music-list-container {
  .music-list-title {
    display: flex;
    margin-top: 20px;
    margin-left: 36px;
    margin-right: 36px;
    margin-bottom: 20px;
    align-items: center;
    font-size: 12px;
    color: rgb(51, 45, 45);
    .title-item:first-child {
      // width: 360px;
      width: 45%;
    }

    .title-item:nth-child(2) {
      // width: 150px;
      width: 18.75%;
    }

    .title-item:nth-child(3) {
      // width: 190px;
      width: 23.75%;
    }
    .title-item:nth-child(4) {
      // width: 100px;
      width: 12.5%;
    }
  }

  .music-list {
    .music-item {
      margin: 0 32.5px;
      display: flex;
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      color: rgba(36, 35, 33, 0.868);
      .music-name {
        // width: 312px;
        // width: 39%;
        width: 45%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .icon-3aixin {
          padding-right: 9px;
          cursor: pointer;
          font-size: 14px;
        }
        span:nth-of-type(2) {
          padding-left: 4px;
        }
      }

      .music-mod-menu {
        // visibility: hidden;
        display: none;
        // width: 148px;
        width: 18.5%;
        text-align: center;

        a {
          text-decoration: none;
          color: rgb(109, 99, 99);
          padding: 3px;
        }
      }

      .music-songer {
        // width: 150px;
        width: 18.75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .music-ablum {
        // width: 190px;
        width: 23.75%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .music-time {
        width: 12.5%;
      }
    }
    .music-item:hover {
      background-color: rgb(239, 239, 239);
    }
    .current-music {
      background-color: rgb(239, 239, 239);
      color: #1fd3ac;
    }
    .music-item:hover .music-mod-menu {
      display: block;
    }
    .music-item:hover .music-name {
      // width: 164px;
      width: 26.5%;
    }
  }
}
</style>