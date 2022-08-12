<template>
  <div class="homePage">
    <div class="info">
      <div class="info-avatar">
        <img :src="profile.avatarUrl" alt="" />
      </div>
      <div class="info-introduce">
        <div class="nickname">{{ profile.nickname }}</div>
        <div class="level">
          <img
            src="https://p6.music.126.net/obj/wovDmcKXw6PCn2_CmsOk/4189722246/9124/a83c/7eb7/6d7d81b608bfb56d7fb286bd8eb72346.png"
            alt=""
          />
          <span>Lv{{ accountInfo.level }}</span>
          <span>{{ profile.gender === 1 ? "男" : "女" }}</span>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <div class="playlist">
      <div class="created-list">
        <span>我创建的歌单</span>
        <div
          class="mylike-music music-list"
          @click="$router.push('/myfavouritemusic')"
          title="查看我喜欢的音乐列表"
        >
          <img class="bg-cover" :src="likeList.coverImgUrl" alt="" />
          <img
            class="icon-play"
            src="https://y.qq.com/ryqq/static/media/cover_play.56974e6f.png?max_age=2592000"
            alt=""
          />
        </div>
        <div class="text">{{ likeList.name }}</div>
      </div>
      <div class="collected-list">
        <span>我收藏的歌单</span>
        <div class="mycollected-music music-list">
          <img class="bg-cover" :src="collectedList.coverImgUrl" alt="" />
          <img
            class="icon-play"
            src="https://y.qq.com/ryqq/static/media/cover_play.56974e6f.png?max_age=2592000"
            alt=""
          />
        </div>
        <div class="text">{{ collectedList.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetUserInfo, reqGetUserPlayList } from "@/api/index";
import { mapState, mapGetters } from "vuex";
export default {
  name: "UserHomePage",
  computed: {
    ...mapState({
      accountInfo: (state) => state.userinfo.accountInfo,
      playList: (state) => state.userinfo.playList,
    }),
    ...mapGetters({
      profile: "Profile",
      likeList: "LikeList", //喜欢的音乐
      collectedList: "CollectList", //收藏的歌单
    }),
  },
  async mounted() {
    // 组件挂载时获取用户详情
    let account = JSON.parse(localStorage.getItem("account"));
    let response = await reqGetUserInfo(account.id);
    console.log("用户详情", response);
    this.$store.dispatch("getUserInfo", response);
    // 获取歌单信息
    let playlistResponse = await reqGetUserPlayList(account.id);
    console.log("歌单信息", playlistResponse);
    this.$store.dispatch("getPlayList", playlistResponse.playlist);
  },
};
</script>

<style lang="less" scoped>
.homePage {
  flex: 7;
  overflow-y: auto;
  .info {
    display: flex;
    height: 220px;
    margin: 15px 20px 15px 20px;
    .info-avatar {
      width: 200px;
      height: 190px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info-introduce {
      margin-left: 20px;
      width: 85%;
      .nickname {
        font-weight: bold;
        font-size: 24px;
      }
      .level {
        margin-top: 10px;
        img {
          height: 15px;
          margin-right: 10px;
          vertical-align: bottom; //图片底部对齐
        }
        span {
          margin-right: 10px;
          font-size: 12px;
        }
      }
      .line {
        width: 100%;
        height: 2px;
        background-color: rgb(209, 209, 209);
        margin: 15px auto;
      }
    }
  }
  // 歌单部分
  .playlist {
    margin-left: 20px;
    span {
      font-weight: bold;
    }
    .created-list,
    .collected-list {
      height: 300px;
      .music-list {
        width: 200px;
        height: 200px;
        margin-top: 20px;
        position: relative;
        overflow: hidden;
        .bg-cover {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          transform: scale(1);
          transition: all 0.5s;
        }
        .icon-play {
          width: 50px;
          height: 50px;
          position: absolute;
          right: 10px;
          bottom: 10px;
          cursor: pointer;
          opacity: 0;
          transition: all 0.8s;
        }
      }
      .text {
        margin-top: 10px;
      }
      .music-list:hover .icon-play {
        opacity: 1;
      }
      .music-list:hover .bg-cover {
        transform: scale(1.1);
      }
    }
    .collected-list {
      height: 300px;
    }
  }

  // 当鼠标移入侧边栏时，使滚动条出现
}
.homePage:hover::-webkit-scrollbar {
  display: block;
}

.homePage::-webkit-scrollbar {
  width: 0.5em;
}

.homePage::-webkit-scrollbar-thumb {
  border-radius: 0.25em;
  background: rgb(221, 215, 212);
}
</style>