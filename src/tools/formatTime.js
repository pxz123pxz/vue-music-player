export default function formatTime(time) {
    let minute =
        Math.floor(time / 60) < 10
          ? "0" + Math.floor(time / 60)
          : Math.floor(time / 60);
      let seconds =
        Math.floor(time % 60) < 10
          ? "0" + Math.floor(time % 60)
          : Math.floor(time % 60);
      let result = minute + ":" + seconds;
      return result;
}