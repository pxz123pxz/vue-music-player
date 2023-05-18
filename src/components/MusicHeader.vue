<template>
  <Header class="header">
    <!-- 搜索框部分 -->
    <div class="search-music">
      <!-- 回退与前进按钮 -->
      <div class="backforward">
        <span class="iconfont icon-icon-jiantou2"></span>
        <span class="iconfont icon-icon-jiantou1"></span>
      </div>
      <!-- 搜索栏 -->
      <div class="input-search">
        <input
          type="text"
          class="custom-input-box"
          placeholder="搜索音乐"
          ref="search"
          v-on:focus="changePlaceholderDisappear"
          v-on:blur="changePlaceholderAppear"
          v-model="inputKey"
          @keyup.enter="searchSong"
        />
      </div>
      <div class="listen-song">
        <span class="iconfont icon-tinggeshiqu1"></span>
      </div>
    </div>
    <div class="login-tool">
      <!-- 登录状态 -->
      <div class="alreadylogin" v-if="isLogin">
        <div class="avatar" @click="goToHomePage" title="点击头像查看用户主页">
          <img :src="Profile.avatarUrl" alt="" />
        </div>
        <div class="nickname">{{ Profile.nickname }}</div>
        <span
          class="downArrow iconfont icon-down_arrow"
          @click="quitLogin = !quitLogin"
        ></span>
        <div class="quitLogin" v-show="quitLogin" @click="exit">
          <span>退出登录</span>
        </div>
      </div>

      <!-- 未登录状态 -->
      <div class="unlogin" v-if="!isLogin">
        <div class="avatar">
          <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.touxiangzhan.com%2Fupload%2Fimage%2F6a3584291326n2706035469t26.jpg&refer=http%3A%2F%2Fimg.touxiangzhan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662177522&t=4ebf4684dbdbcb0cfe241411fcd5fc20"
            alt="头像"
          />
        </div>
        <div class="nickname" @click="Login">点击登录</div>
      </div>
      <!-- 工具部分 -->
      <span class="iconfont icon-pifu"></span>
      <span class="iconfont icon-caidan"></span>
      <span class="line"></span>
      <span class="iconfont icon-jingjianmoshi"></span>
      <span class="iconfont icon-suoxiao"></span>
      <span class="iconfont icon-zuidahua"></span>
      <span class="iconfont icon-guanbi"></span>
    </div>
  </Header>
</template>

<script>
import { logoutAccount } from "@/api/index";
export default {
  name: "MusicHeader",
  data() {
    return {
      inputKey: "", //搜索的关键字
      isLogin: false,
      quitLogin: false,
    };
  },
  computed: {
    Profile() {
      // console.log(JSON.parse(localStorage.getItem("profile")));
      let profile = JSON.parse(localStorage.getItem("profile"));
      return profile || {};
    },
  },
  methods: {
    changePlaceholderDisappear() {
      let input = this.$refs.search;
      input.placeholder = "";
    },
    changePlaceholderAppear() {
      let input = this.$refs.search;
      input.placeholder = "搜索音乐";
    },

    // 退出登录
    async exit() {
      // 点击退出登录后
      // 改变登录区的状态
      let result = await logoutAccount();
      // console.log(result);
      if (result.code === 200) {
        this.isLogin = false;
        this.quitLogin = false;
        // 清除本地缓存
        localStorage.clear();
        this.$message({
          message: "你已退出登录！",
          type: "success",
        });
        this.$bus.$emit("changeLoginStaus", false);
      }
    },
    // 点击登录，弹出登录框
    Login() {
      // console.log("Login");
      this.$bus.$emit("startLogin", true);
    },
    // 获取搜索内容，跳转路由
    async searchSong() {
      if (!this.inputKey) {
        alert("输入内容不能为空");
      } else {
        this.$router.push({
          path: "/search",
          query: {
            keywords: this.inputKey,
            type: 1,
          },
        });
      }
    },
    // 转向用户主页
    goToHomePage() {
      this.$router.push({
        path: "/userhomepage",
      });
    },
  },
  mounted() {
    this.$bus.$on("changeLoginStaus", (data) => {
      this.isLogin = data;
    });
    // 查看登录状态

    let token = localStorage.getItem("token");
    // 如果存在token，说明用户还处于登录状态
    if (token) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  },
};
</script>

<style lang="less" scoped>
// header部分
.header {
  flex: 1;
  display: flex;
  // 搜索框部分
  .search-music {
    // width: 300px;
    flex: 2;
    display: flex;
    align-items: center;

    // 前进后退按钮
    .backforward {
      margin: 0 17px 0 22px;

      span {
        margin: 0 8px;
      }
      span:nth-of-type(2) {
        padding-left: 5px;
      }
    }

    // 输入框
    .input-search {
      width: 25%;
      // 自定义input样式
      .custom-input-box {
        outline: none;
        box-sizing: border-box;
        border: 1px solid transparent;
        // width: 160px;
        width: 100%;
        height: 35px;
        border-radius: 15px;
        background-color: rgb(227, 227, 227);
        padding: 0 15px;
      }

      // 自定义聚焦样式
      .custom-input-box:focus {
        border-color: transparent;
      }

      ::-webkit-input-placeholder {
        color: rgb(168, 168, 168);
        font-size: 10px;
      }
    }

    .listen-song {
      margin-left: 15px;
      cursor: pointer;
    }
    .listen-song:hover {
      color: #31c27c;
    }
  }

  // 登录部分
  .login-tool {
    // width: 200px;
    width: 403px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 20px;

    position: relative;

    .alreadylogin,
    .unlogin {
      min-width: 116px;
      display: flex;
      // 头像
      .avatar {
        width: 25px;
        height: 25px;
        margin-right: 10px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      // 昵称
      .nickname {
        line-height: 25px;
        font-size: 12px;
        color: rgb(131, 131, 131);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      .downArrow {
        margin-top: 3px;
        margin-left: 5px;
        color: rgb(157, 157, 157);
        cursor: pointer;
      }
      .downArrow:hover {
        color: #31c27c;
      }
    }
    .unlogin {
      margin-left: 100px;
    }
    .quitLogin {
      position: absolute;
      z-index: 999;
      width: 100px;
      height: 30px;
      line-height: 30px;
      border: 1px solid rgb(193, 193, 193);
      border-radius: 5px;
      box-shadow: 0 0 5px rgb(193, 193, 193);
      text-align: center;
      font-size: 12px;
      top: 60px;
      left: 160px;
      span {
        cursor: pointer;
      }
    }
    span {
      margin-left: 15px;
      cursor: pointer;
      color: rgb(157, 157, 157);
    }
    span:hover {
      color: #31c27c;
    }
    .line {
      width: 2px;
      height: 18px;
      background-color: rgb(159, 135, 134);
    }
  }
}
</style>