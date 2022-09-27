# 大杂烩。。。RainyMusic网页端音乐播放器
***
使用在线访问：http://120.77.248.105  
一些问题：可能只能使用登录、注册以及查看网页功能，无法搜索音乐。这是由于我使用的NeteaseCloudMusicApi不稳定，处于402，导致有时无法使用获取网易云歌曲的功能  
  
正在解决中！！  
  
无法部署到Vercel，继续寻找办法！！！
***
建议的方式：  
本地部署我的项目（https://github.com/user17278/RainyMusic)  
运行服务器，在service文件夹中  
再部署来自Binaryify的（https://github.com/Binaryify/NeteaseCloudMusicApi)  的服务器就能正常运行，体验完整的网站。
## 安装

```shell
$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install
```

或者

```shell
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install
```

## 运行
调用前务必阅读文档的`调用前须知`

```shell
$ node app.js
```

服务器启动默认端口为 3000,若不想使用 3000 端口,可使用以下命令: Mac/Linux

```shell
$ PORT=4000 node app.js
```

windows 下使用 git-bash 或者 cmder 等终端执行以下命令:

```shell
$ set PORT=4000 && node app.js
```
