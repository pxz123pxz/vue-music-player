<template>
  <div class="musicLove-container">
    <h1>我喜欢的音乐</h1>
    <div class="nav-search">
      <div>歌曲</div>
      <div>视频</div>
      <div>专辑</div>
      <div>歌单</div>
      <div>歌词</div>
      <div>歌手</div>
      <div>用户</div>
    </div>
    <div class="tool-bar">
      <div class="tool-item bgcolor">
        <i class="iconfont icon-24gl-play"></i>
        播放全部
      </div>
      <div class="tool-item">
        <i class="iconfont icon-xiazai"></i>
        下载
      </div>
      <div class="tool-item">
        <i class="iconfont icon-ic_batch_default24px"></i>
        批量操作
      </div>
    </div>
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
          v-for="(music, key) in LikeMusicList"
          :key="key"
          :class="{ 'current-music': music.id === songmid ? true : false }"
        >
          <div class="music-name" :title="music.name">
            <i class="iconfont icon-aixin"></i>
            <span>{{ music.name }}</span>
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
                  music.al.id,
                  music.al.name
                )
              "
            >
              <i
                class="iconfont icon-24gl-play"
                v-show="(music.id === songmid ? false : true) || !isPlay"
              ></i>
              <i
                class="iconfont icon-bofangzanting"
                v-show="isPlay && music.id === songmid ? true : false"
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
  </div>
</template>

<script>
import {
  reqGetLikeMusciList,
  reqSongList,
  reqGetMusicLyric,
} from "@/api/index";
import { mapState } from "vuex";
export default {
  name: "MyFavrouiteMusic",
  computed: {
    ...mapState({
      LikeMusicList: (state) => state.userinfo.likeMusicList,
      isPlay: (state) => state.lyric.isPlay,
      songmid: (state) => state.lyric.songmid,
    }),
  },
  methods: {
    async playMusic(songmid, songname, singername, albumid, albumname) {
      // 获取歌词
      let result = await reqGetMusicLyric(songmid);
      console.log(result);
      if (result.code === 200) {
        let musicLyric = result.lrc.lyric;
        // 获取歌词，存储到vuex中
        this.$store.dispatch("getMusicLyric", musicLyric);

        // console.log(typeof(musicLyric));
        this.$store.dispatch("getLinkAndAlbum", {
          songmid: songmid,
          songname: songname,
          singername: singername,
          albumid: albumid,
          albumname: albumname,
        });
        // 路由跳转
        this.$router.push({
          path: "/myfavouritemusic",
          query: {
            musicname: songname,
            musicid: songmid,
          },
        });
      }
    },
    // 将时间格式化为00:00的形式
    getFormatTime(time) {
      time = Math.floor(time / 1000);
      let m =
        Math.floor(time / 60) < 10
          ? "0" + Math.floor(time / 60)
          : Math.floor(time / 60);
      let s =
        Math.floor(time % 60) < 10
          ? "0" + Math.floor(time % 60)
          : Math.floor(time % 60);
      return m + ":" + s;
    },
    // 通过关键词搜索歌曲
    async getMusicList() {
      this.loading = true;
      let response = await reqSongList(this.$route.query.keywords);
      console.log(response);
      if (response.code === 200) {
        this.$store.dispatch("getMusicList", response.result.songs);
        this.loading = false;
      }
    },
    // 获取喜欢的音乐列表
    async getLikeMusicList() {
      let token = localStorage.getItem("token");
      if (token) {
        let LikeMusicResponse = await reqGetLikeMusciList();
        console.log("喜欢的音乐", LikeMusicResponse);
        this.$store.dispatch("getLikeMusicIds", LikeMusicResponse.ids);
      }
    },
  },
  mounted() {
    this.getLikeMusicList();
  },
};
</script>

<style lang="less" scoped>
.musicLove-container {
  flex: 7;
  overflow-y: scroll;
  h1 {
    font-size: 30px;
    margin-left: 30px;
    margin-bottom: 10px;
  }
  .nav-search {
    display: flex;
    align-items: center;
    height: 40px;
    width: 420px;
    margin-left: 16px;
    justify-content: space-around;
    color: rgb(55, 53, 53);
    font-size: 15px;
  }

  .tool-bar {
    width: 450px;
    display: flex;
    font-size: 15px;
    margin-left: 25px;

    .tool-item {
      width: 130px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid rgb(227, 227, 227);
      border-radius: 15px;
      background-color: rgb(227, 227, 227);
      margin-right: 20px;
      font-size: 14px;
      cursor: pointer;
    }
    .tool-item:hover {
      background-color: rgb(219, 219, 219);
    }
    .bgcolor {
      background-color: rgb(31, 211, 172);
      color: rgb(222, 248, 240);
    }
    .bgcolor:hover {
      background-color: rgb(29, 199, 155);
    }
  }
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
        .icon-aixin {
          padding-right: 9px;
          color: rgb(239, 87, 87);
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
    .current-music {
      background-color: rgb(239, 239, 239);
      color: #1fd3ac;
    }
    .music-item:hover {
      background-color: rgb(239, 239, 239);
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
// 当鼠标移入侧边栏时，使滚动条出现
.musicLove-container::-webkit-scrollbar {
  display: block;
}

.musicLove-container::-webkit-scrollbar {
  width: 0.5em;
}

.musicLove-container::-webkit-scrollbar-thumb {
  border-radius: 0.25em;
  background: rgb(202, 177, 164);
}
</style>