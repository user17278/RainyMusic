# 大杂烩。。。RainyMusic网页端音乐播放器
***
```shell
使用在线访问：http://120.77.248.105  
一些问题：可能只能使用登录、注册以及查看网页功能，无法搜索音乐。
这是由于我使用的NeteaseCloudMusicApi不稳定，处于402，导致有时无法使用获取网易云歌曲的功能  
  
正在解决中！！  
  
无法部署到Vercel，继续寻找办法！！！
```

```shell
建议的方式：  
本地部署我的项目（https://github.com/user17278/RainyMusic)  
运行服务器，在service文件夹中  
再部署来自Binaryify的（https://github.com/Binaryify/NeteaseCloudMusicApi)  的服务器就能正常运行，体验完整的网站。
```
### 按照以下步骤本地部署我的项目

```shell
$ git clone https://github.com/user17278/RainyMusic.git
OR
$ git clone git@github.com:user17278/RainyMusic.git

$ cd RainyMusic
$ npm install
```

### 运行

```shell
$ npm run serve
```
```shell
$ cd service
$ node app.js
```
服务器启动默认端口为 3307

现在已经能够实现登录，注册等等，以及查看网页的功能
### 部署获取音乐的服务器
```shell
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ cd RainyMusic
$ npm install
```

```shell
$ node app.js
```

现在可以体验完整的功能了！
