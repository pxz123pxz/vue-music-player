<template>
  <div class="aside">
    <div class="logo">
      <div class="logo-text">
        <span>开源音乐</span>
      </div>
    </div>
    <div class="aside-content">
      <div class="online-music">
        <div class="online-title title">
          <span>在线音乐</span>
        </div>
        <ul class="online-list music">
          <li @click="goToFindMusic" :class="{ change: ischange }">
            <i class="iconfont icon-tuijian"></i>
            <span>发现</span>
          </li>
          <li>
            <i class="iconfont icon-yinle"></i>
            <span>音乐馆</span>
          </li>
          <li>
            <i class="iconfont icon-shipinbofang"></i>
            <span>视频</span>
          </li>
          <li>
            <i class="iconfont icon-diantai"></i>
            <span>电台</span>
          </li>
        </ul>
      </div>
      <div class="my-music">
        <div class="mymusic-title title">
          <span>我的音乐</span>
        </div>
        <ul class="my-list music">
          <li>
            <i class="iconfont icon-bendi"></i>
            <span>本地和下载</span>
          </li>
          <li>
            <i class="iconfont icon-shouye_zuijinbofang_"></i>
            <span>最近播放</span>
          </li>
          <li>
            <i class="iconfont icon-yigouyinle40"></i>
            <span>已购音乐</span>
          </li>
        </ul>
      </div>
      <div class="created-list">
        <div class="title">
          <span>创建的歌单</span>
        </div>
        <ul class="year-list music">
          <li @click="goToMyLikeMusic" :class="{ change: ischange }">
            <i class="iconfont icon-3aixin"></i>
            <span title="我喜欢的音乐">我喜欢的音乐</span>
          </li>
        </ul>
      </div>
      <div class="collect-list">
        <div class="title">
          <span>收藏的歌单</span>
        </div>
        <ul class="year-list music">
          <li>
            <i class="iconfont icon-shitingliebiao"></i>
            <span title="秋风扫落叶的年度歌单">慵懒R&B 一个人时的随性浪漫</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicAside",
  data() {
    return {
      ischange: false, //是否跳转路由
    };
  },
  methods: {
    goToMyLikeMusic() {
      this.$router.push({
        path: "/myfavouritemusic",
      });
    },
    goToFindMusic() {
      this.$router.push({
        path: "/findmusic",
      });
    },
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
  },
  watch: {
    // 监听路由路径，如果路径不等于我喜欢界面的路径，则将我喜欢的高亮样式取消
    routePath(value) {
      if (value === "/myfavouritemusic" || value === "/findmusic") {
        this.ischange = true;
      } else {
        this.ischange = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  // flex: 1;
  width: 206px;
  background: rgb(240, 240, 240);
  opacity: 0.8;
  //设置为弹性容器
  display: flex;
  flex-direction: column;
  .logo {
    flex: 1;

    .logo-text {
      margin: 30px 60px;
      color: rgb(0, 0, 0);
      // font-family: cursive;
      font-size: 20px;
    }
  }

  .aside-content {
    overflow-y: scroll;
    flex: 7;

    .title {
      color: rgb(0, 0, 0);
      // font-family: cursive;
      font-size: 14px;
      margin: 20px 30px;
    }

    .music {
      span {
        text-decoration: none;
        color: rgb(0, 0, 0);
        // font-family: cursive;
        font-size: 16px;
      }

      li {
        width: 180px;
        height: 30px;
        margin: 10px 13px;
        line-height: 30px;
        border-radius: 5px;
        white-space: nowrap;
        overflow: hidden; //隐藏溢出的部分
        text-overflow: ellipsis; //显示省略号来代表隐藏的文本
        cursor: pointer;
      }

      li:hover {
        background: rgb(216, 216, 216);
      }
      .change {
        background: rgb(216, 216, 216);
      }
      i {
        padding-left: 15px;
        padding-right: 5px;
      }
    }
  }

  // 自定义设置滚动条
  // 平常状态隐藏滚动条
  .aside-content::-webkit-scrollbar {
    display: none;
  }

  // 当鼠标移入侧边栏时，使滚动条出现
  .aside-content:hover::-webkit-scrollbar {
    display: block;
  }

  .aside-content::-webkit-scrollbar {
    width: 0.5em;
  }

  .aside-content::-webkit-scrollbar-thumb {
    border-radius: 0.25em;
    background: rgb(216, 216, 216);
  }
}
</style>