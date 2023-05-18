<template>
  <div class="musicLove-container">
    <h1>我喜欢的音乐</h1>
    <div class="nav-search">
      <div class="active navitem"><span>歌曲</span></div>
      <div class="navitem"><span>评论</span></div>
      <div class="navitem"><span>收藏者</span></div>
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
    <PlayList
      :musicList="LikeMusicList"
      :isPlay="isPlay"
      :songmid="songmid"
    ></PlayList>
  </div>
</template>

<script>
import PlayList from '@/pages/PlayList'
import { reqGetLikeMusciList } from "@/api/index";
import { mapState } from "vuex";
export default {
  name: "MyFavrouiteMusic",
  components: {PlayList},
  computed: {
    ...mapState({
      LikeMusicList: (state) => state.userinfo.likeMusicList,
      isPlay: (state) => state.lyric.isPlay,
      songmid: (state) => state.lyric.songmid,
    }),
  },
  methods: {
    // 获取喜欢的音乐列表
    async getLikeMusicList() {
      let token = localStorage.getItem("token");
      if (token) {
        let LikeMusicResponse = await reqGetLikeMusciList();
        // console.log("喜欢的音乐", LikeMusicResponse);
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
    width: 220px;
    margin-left: 16px;
    justify-content: space-around;
    color: rgb(55, 53, 53);
    font-size: 15px;
    margin-bottom: 15px;
    .navitem {
      cursor: pointer;
    }
    .navitem:hover {
      color: rgb(31, 211, 172);
    }
    .active {
      color: rgb(31, 211, 172);
      position: relative;
    }
    .active:after {
      content: "";
      position: absolute;
      top: 20px;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: rgb(31, 211, 172);
      border: 1px solid rgb(31, 211, 172);
      border-radius: 3px;
    }
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