<template>
  <div class="content">
    <div class="nav-search">
      <div class="active navitem">
        <span>单曲</span>
      </div>
      <div class="navitem">
        <span>歌手</span>
      </div>
      <div class="navitem"><span>专辑</span></div>
      <div class="navitem"><span>视频</span></div>
      <div class="navitem"><span>歌单</span></div>
      <div class="navitem"><span>用户</span></div>
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
      :musicList="musicList"
      :isPlay="isPlay"
      :songmid="songmid"
    ></PlayList>
  </div>
</template>

<script>
import PlayList from "@/pages/PlayList";
import { Loading } from "element-ui";
import { reqSongList } from "@/api/index";
import { mapState } from "vuex";
export default {
  name: "Search",

  components: { PlayList },
  computed: {
    ...mapState({
      musicList: (state) => state.search.List,
      isPlay: (state) => state.lyric.isPlay,
      songmid: (state) => state.lyric.songmid,
    }),
  },

  methods: {
    // 通过关键词搜索歌曲
    async getMusicList() {
      this.loading = true;
      let loadingInstance = Loading.service({
        lock: true,
        text: "拼命给你加载中",
        spinner: "el-icon-loading",
        background: "rgba(0,0,0,0.7)",
      });
      // 获取歌曲信息
      let response = await reqSongList(this.$route.query.keywords);
      // console.log("搜索结果", response);
      if (response["code"] === 200) {
        this.$store.dispatch("getMusicList", response["result"]["songs"]);
        loadingInstance.close();
        // this.loading = false;
      }
    },
  },
  created() {
    // 监听路由的参数，以便再次获取数据
    this.$watch(
      () => this.$route.query.keywords,
      () => {
        this.getMusicList();
      },
      { immediate: true }
    );
  },
};
</script>

<style lang="less" scoped>
// content部分
.content {
  flex: 7;
  overflow-y: scroll;
  .nav-search {
    display: flex;
    align-items: center;
    height: 40px;
    width: 420px;
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
  .loading {
    width: 100px;
    height: 100px;
    margin: 100px auto;
  }
}
// 自定义设置content部分的滚动条
// 平常状态隐藏滚动条
// .content::-webkit-scrollbar {
//     display: none;
// }

// 当鼠标移入侧边栏时，使滚动条出现
.content:hover::-webkit-scrollbar {
  display: block;
}

.content::-webkit-scrollbar {
  width: 0.5em;
}

.content::-webkit-scrollbar-thumb {
  border-radius: 0.25em;
  background: rgb(211, 211, 211);
}
</style>