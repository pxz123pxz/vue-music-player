<template>
  <div class="logininterface" v-show="showLoginPlatform">
    <span
      class="iconfont icon-guanbi closebtn"
      @click="showLoginPlatform = !showLoginPlatform"
    ></span>
    <h1>登录账号</h1>
    <input
      type="text"
      class="inputlogin"
      placeholder="请输入手机号"
      v-model="phone"
    />
    <input
      type="password"
      class="inputlogin"
      placeholder="请输入验证码"
      v-model="captcha"
    />
    <button class="btn" v-if="isSend">{{ times }}s后重新发送</button>
    <button class="btn" @click="getCaptcha" v-if="!isSend">获取验证码</button>
    <button class="btn" @click="goToLogin">登录</button>
    <div class="footarea">
      <span>找回密码</span>
      <span>注册账号</span>
      <span>意见反馈</span>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { sendCaptcha, verifyCaptcha, loginAccount } from "@/api/index";
export default {
  name: "LoginInterface",
  data() {
    return {
      phone: "",
      captcha: "",
      showLoginPlatform: false,
      isSend: false, //是否发送验证码，发送为true，未发送为false
      times: 60,
    };
  },
  methods: {
    // 登录账号
    async goToLogin() {
      if (this.phone === "" && this.captcha === "") {
        Message({
          message: "请输入账号和验证码",
          type: "warning",
        });
      } else {
        // 先验证账号与验证码是否正确
        let result = await verifyCaptcha(this.phone, this.captcha);
        // 如果验证码正确，再进行登录
        if (result.code == 200) {
          let result2 = await loginAccount(this.phone, this.captcha);
          console.log("登录：", result2);
          // 如果登录成功
          if (result2.code == 200) {
            // 修改登录框的状态
            this.$bus.$emit("startLogin", false);
            this.$bus.$emit("changeLoginStaus", true);
            localStorage.setItem("profile", JSON.stringify(result2.profile));
            localStorage.setItem("account", JSON.stringify(result2.account));
            localStorage.setItem("token", result2.token);
            // 弹出登录成功的提示
            Message({
              message: "恭喜你，登录成功",
              type: "success",
            });
          }
        } else {
          Message({
            message: "验证码和账号有误，请重新检查账号和验证码",
            type: "error",
          });
        }
      }
    },
    // 获取验证码
    async getCaptcha() {
      if (this.phone) {
        let result = await sendCaptcha(this.phone);
        console.log("发送验证码：", result);
        // 如果发送成功
        if (result.code == 200) {
          this.isSend = true;
          this.times = 60; //如果有多次发送验证码，则重置倒计时
          // 发送成功，显示倒计时重新发送
          setInterval(() => {
            this.times--;
            if (this.times < 0) {
              this.times = 0;
              // 重新显示发送验证码按钮
              this.isSend = false;
            }
          }, 1000);
        }
      } else {
        alert("请输入手机号");
      }
    },
  },
  mounted() {
    this.$bus.$on("startLogin", (data) => {
      // console.log(this.showLoginPlatform, data);
      this.showLoginPlatform = data;
    });
  },
};
</script>

<style lang="less" scoped>
.logininterface {
  width: 500px;
  height: 400px;
  background-color: white;
  border-radius: 15px;
  position: absolute;
  top: 21.5%;
  left: 33.75%;
  box-shadow: 5px 5px 4px rgb(228, 223, 223), -5px -2px 4px rgb(231, 227, 227);
  .closebtn {
    display: inline-block;
    margin-top: 10px;
    margin-left: 470px;
    cursor: pointer;
  }
  h1 {
    margin: 20px auto;
    text-align: center;
    font-size: 24px;
  }
  .inputlogin {
    width: 200px;
    height: 35px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: block;
    margin: 10px 160px;
    padding: 0 15px;
  }
  .btn {
    width: 200px;
    height: 35px;
    margin: 10px 160px;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: rgb(59, 146, 223);
    color: #fff;
    cursor: pointer;
  }
  .btn:hover {
    background-color: rgb(31, 125, 208);
  }
  .footarea {
    width: 300px;
    margin-left: 150px;
    margin-top: 35px;
    font-size: 12px;
    span {
      padding-right: 40px;
      cursor: pointer;
      color: rgb(45, 43, 43);
    }
  }
}
</style>