import { Message } from "element-ui";
import {
  reqCheckMusicIsUse,
  reqGetSongPlayLink,
  reqGetAlbumMsg,
} from "@/api/index";
const state = {
  musicLyric: "",
  currentTime: "",
  totalTime: "00:00",
  updateTotalTime: "00:00",
  audio: null,
  width: 0,
  link: "",
  duration: 0,
  isPlay: false,
  songmid: "",
  albumurl: "",
  songname: "",
  singername: "",
  albumname: "",
};
const actions = {
  getMusicLyric(context, musicLyric) {
    context.commit("GETMUSICLYRIC", musicLyric);
  },
  getMusicCurrentTime(
    context,
    { currentTime, totalTime, updateTotalTime, audio, width, duration, isPlay }
  ) {
    context.commit("GETMUSICCURRENTTIME", {
      currentTime,
      totalTime,
      updateTotalTime,
      audio,
      width,
      duration,
      isPlay,
    });
  },
  updateData(context, { width, currentTime }) {
    context.commit("UPDATEDATA", { width, currentTime });
  },
  updateAudioStatus(context, isPlay) {
    context.commit("UPDATEAUDIOSTATUS", isPlay);
  },
  async getLinkAndAlbum(
    context,
    { songmid, songname, singername, albumid, albumname }
  ) {
    // 先检查音乐是否可用，有些没有版权无法播放
    let response = await reqCheckMusicIsUse(songmid);
    console.log("是否有版权：" + response["success"]);
    if (response["success"] === true) {
      // 获取播放链接
      let response = await reqGetSongPlayLink(songmid);
      // console.log(response);
      if (response.code === 200) {
        let playlink = response.data[0].url;
        console.log(playlink);
        // 获取专辑信息(专辑封面)
        let albumResponse = await reqGetAlbumMsg(albumid);
        console.log("专辑信息", albumResponse);
        let albumurl = albumResponse.songs[0].al.picUrl;
        // 如果专辑封面为空，则使用默认封面
        if (albumurl === "") {
          albumurl =
            "https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg";
        }
        context.commit("GETLINKANDALBUM", {
          songmid,
          songname,
          singername,
          albumid,
          playlink,
          albumurl,
          albumname,
        });
      } else {
        Message({
          message: `播放链接出现问题了`,
          type: "error",
        });
      }
    } else {
      Message({
        message: `${response["message"]} 或者 登录后使用`,
        type: "error",
      });
    }
  },
};
const mutations = {
  GETMUSICLYRIC(state, musicLyric) {
    state.musicLyric = musicLyric;
  },
  GETMUSICCURRENTTIME(
    state,
    { currentTime, totalTime, updateTotalTime, audio, width, duration, isPlay }
  ) {
    state.currentTime = currentTime.toFixed(3);
    state.totalTime = totalTime;
    state.updateTotalTime = updateTotalTime;
    state.audio = audio;
    state.width = width;
    state.duration = duration;
    state.isPlay = isPlay;
  },
  UPDATEDATA(state, { width, currentTime }) {
    state.width = width;
    state.currentTime = currentTime;
  },
  UPDATEAUDIOSTATUS(state, isPlay) {
    state.isPlay = isPlay;
  },
  GETLINKANDALBUM(
    state,
    { songmid, songname, singername, albumid, playlink, albumurl, albumname }
  ) {
    state.albumid = albumid;
    state.link = playlink;
    state.songname = songname;
    state.singername = singername;
    state.songmid = songmid;
    state.albumurl = albumurl;
    state.albumname = albumname;
  },
};
const getters = {
  newLyricList(state) {
    let lyrics = state.musicLyric.split("\n"); //用换行符拆分获取到的歌词
    let ArrayLyric = new Array(); //定义一个新数组
    lyrics.forEach((item) => {
      // if (item.substring(item.indexOf("]") + 1, item.length) === "") return;
      let t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
      ArrayLyric.push({
        time: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
        words: item.substring(item.indexOf("]") + 1, item.length),
      });
    });
    return ArrayLyric;
  },
  albumImage(state) {
    if (state.albumurl) {
      return state.albumurl;
    } else {
      return "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg";
    }
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
