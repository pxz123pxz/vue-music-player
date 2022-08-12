// 当前这个模块：API统一管理
import requests from "./aiax";

// 搜索音乐
export const reqSongList = (keyword) =>
  requests({
    url: `/search`,
    method: "post",
    params: { keywords: keyword, timestamp: new Date().getTime() },
  });

// 获取歌曲链接
export const reqGetSongPlayLink = (songid) =>
  requests({
    url: `/song/url`,
    method: "post",
    params: { id: songid, timestamp: new Date().getTime() },
  });

//获取歌词
export const reqGetMusicLyric = (songid) =>
  requests({ url: `/lyric`, method: "get", params: { id: songid } });

// 检查音乐是否可用
export const reqCheckMusicIsUse = (songid) =>
  requests({ url: `/check/music`, method: "get", params: { id: songid } });

// 获取专辑信息，主要是封面
export const reqGetAlbumMsg = (albumid) =>
  requests({ url: `album`, method: "get", params: { id: albumid } });

// 获取登录状态
export const reqLoginStatus = () =>
  requests({
    url: `/login/status`,
    method: "get",
    timestamp: new Date().getTime(),
  });

// 发送验证码
export const sendCaptcha = (phone) =>
  requests({ url: `/captcha/sent`, method: "get", params: { phone: phone } });

// 验证验证码是否正确
export const verifyCaptcha = (phone, captcha) =>
  requests({
    url: `/captcha/verify`,
    method: "get",
    params: { phone: phone, captcha: captcha },
  });

// 手机登录
export const loginAccount = (phone, captcha) =>
  requests({
    url: `/login/cellphone`,
    method: "get",
    params: { phone: phone, captcha: captcha, timestamp: new Date().getTime() },
  });

// 退出登录
export const logoutAccount = () =>
  requests({
    url: `/logout`,
    method: "get",
    params: { timestamp: new Date().getTime() },
  });

// 获取用户详情
export const reqGetUserInfo = (uid) =>
  requests({ url: "/user/detail", method: "get", params: { uid: uid } });

// 获取用户歌单
export const reqGetUserPlayList = (uid) =>
  requests({ url: "/user/playlist", method: "get", params: { uid: uid } });

// 获取喜欢音乐列表
export const reqGetLikeMusciList = (uid) =>
  requests({ url: "/likelist", method: "get", params: { uid: uid } });

// 获取歌曲详情
export const reqGetMusicInfo = (ids) =>
  requests({ url: "/song/detail", method: "get", params: { ids: ids } });
