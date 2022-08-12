# 音乐播放器
## 此项目是一个音乐播放器的项目，UI页面参考qq音乐桌面端，后端接口使用 网易云音乐接口[https://neteasecloudmusicapi.vercel.app/#/]
 ### 实现的功能有：
- 搜索音乐
- 获取歌曲播放链接并播放歌曲
- 暂停和继续播放
- 歌曲播放的进度条显示、拖动进度条改变音乐播放位置、点击进度条的某个位置实现音乐跳转到对应的播放时间
- 歌词页面的显示，歌词的滚动，歌词背景实现毛玻璃效果
- 获取专辑封面
- 播放歌曲的高亮显示
- 登录(使用验证码登录)
- 退出登录
- 查看用户主页
- 查看喜欢的音乐列表
## 使用技术栈
- vue2 + vue-router + vuex + axios + Element-UI + vue-cli
- 实现了响应式布局，但有最小的尺寸
- 使用vue-cli搭建整个项目结构
- 使用axios发送异步请求，获取音乐数据，并使用其中的请求拦截器与响应拦截器，实现了请求进度的显示
- 使用vuex进行状态管理，共享数据
- 使用vue-router进行路由切换
- 使用Element-UI实现登录成功与退出登录的消息提示
## 项目大致界面展示
- ![image](https://user-images.githubusercontent.com/61072719/184310474-217b4503-425f-47ba-bcc0-0fc8227883b7.png)
- ![image](https://user-images.githubusercontent.com/61072719/184310679-8f47fac5-ff0d-4d2d-93af-5180550617cc.png)
- ![image](https://user-images.githubusercontent.com/61072719/184310678-fcaabfd5-750f-4122-a3b2-ad9f7d112598.png)
- ![image](https://user-images.githubusercontent.com/61072719/184310720-fc527e50-1817-42a4-a802-d793a4bb462a.png)
- 
## 项目依赖安装
```
npm install
```

### 项目运行
```
npm run serve
```

### 项目打包
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
