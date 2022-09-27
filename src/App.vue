<template>
  <div id="main">
    <div class="explore-tip" ref="exploreTip" v-if="checkExplore">
      当前浏览器非Google浏览器，使用Google浏览器提高浏览体验
    </div>
    <div class="tips" v-on:click="clickClose" ref="tips">
      <div class="close">点击任意区域关闭提示</div>
      <div class="top">
        <div class="log">登录</div>
        <div class="search">搜索</div>
      </div>
      <div class="center">
        <div class="leftbtn">调界面</div>
        <div class="rightbtn">调界面</div>
      </div>
      <div class="bottom">
        <div class="playbtn">播放按钮</div>
        <div class="list">播放列表</div>
      </div>
    </div>
    <MusicTop :cookie="cookie"></MusicTop>
    <MusicCenter :cookie="cookie"></MusicCenter>
    <MusicBottom :cookie="cookie"></MusicBottom>
  </div>
</template>

<script>
import MusicTop from "./components/MusicTop.vue";
import MusicCenter from "./components/MusicCenter.vue";
import MusicBottom from "./components/MusicBottom.vue";
import checkExplore from "./commom/checkExplore";
export default {
  name: "App",
  components: {
    MusicTop,
    MusicCenter,
    MusicBottom,
  },
  data() {
    return {
      //游客cookie,测试用
      cookie:
        "MUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fwapi%2Fclientlog%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fapi%2Fclientlog%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fneapi%2Fclientlog%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fweapi%2Ffeedback%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fneapi%2Ffeedback%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fweapi%2Fclientlog%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fneapi%2Fclientlog%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fopenapi%2Fclientlog%3B%3BMUSIC_SNS%3D%3B%20Max-Age%3D0%3B%20Expires%3DThu%2C%2015%20Sep%202022%2008%3A38%3A50%20GMT%3B%20Path%3D%2F%3B__csrf%3D4555dd49d4693b94ceb81a4b486a6a62%3B%20Max-Age%3D1296010%3B%20Expires%3DFri%2C%2030%20Sep%202022%2008%3A39%3A00%20GMT%3B%20Path%3D%2F%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fwapi%2Ffeedback%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fapi%2Ffeedback%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fwapi%2Fclientlog%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fwapi%2Ffeedback%3B%3BMUSIC_A%3Dbf8bfeabb1aa84f9c8c3906c04a04fb864322804c83f5d607e91a04eae463c9436bd1a17ec353cf7e3ee7b945bc240ddf03b13b00afc1464993166e004087dd3010f83680ea5036b750a9dbb5682b721c7d5c198250968580b12c1b8817e3f5c807e650dd04abd3fb8130b7ae43fcc5b%3B%20Max-Age%3D1296000%3B%20Expires%3DFri%2C%2030%20Sep%202022%2008%3A38%3A50%20GMT%3B%20Path%3D%2F%3B%3BNMTID%3D00OY2LSF8DzG--_LEYRoD2kHvgZK7MAAAGDQEz8ug%3B%20Max-Age%3D315360000%3B%20Expires%3DSun%2C%2012%20Sep%202032%2008%3A38%3A50%20GMT%3B%20Path%3D%2F%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Feapi%2Ffeedback%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Feapi%2Fclientlog%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fapi%2Ffeedback%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fneapi%2Ffeedback%3B%3BMUSIC_A_T%3D1662826838020%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fweapi%2Fclientlog%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Feapi%2Ffeedback%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fweapi%2Ffeedback%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fopenapi%2Fclientlog%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Feapi%2Fclientlog%3B%3BMUSIC_R_T%3D0%3B%20Max-Age%3D2147483647%3B%20Expires%3DTue%2C%2003%20Oct%202090%2011%3A52%3A57%20GMT%3B%20Path%3D%2Fapi%2Fclientlog%3B",
      checkExplore: false,
    };
  },
  methods: {
    clickClose() {
      this.$refs.tips.style.display = "none";
    },
  },
  created() {
    if (!checkExplore()) {
      this.checkExplore = true;
      setTimeout(() => {
        this.$refs.exploreTip.style.animation =
          "moving-out 1s ease-in-out forwards";
      }, 5000);
    }
  },
};
</script>
<style scoped lang="scss">
.tips {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.359);
  font-weight: 900;
  color: white;
  z-index: 9999;
  .close {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%);
  }
  .top {
    position: relative;
    height: 45px;
    padding-top: 10px;
    .log {
      position: absolute;
      margin-left: 20px;
    }
    .search {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .center {
    position: relative;
    height: 850px;
    .leftbtn {
      top: 50%;
      left: 25%;
      position: absolute;
    }
    .rightbtn {
      top: 50%;
      left: 70%;
      position: absolute;
    }
  }
  .bottom {
    height: 45px;
    .playbtn {
      position: absolute;
      left: 10%;
    }
    .list {
      position: absolute;
      left: 70%;
    }
  }
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: "SF Pro SC";
}

body {
  overflow: hidden;
}

input {
  box-sizing: border-box;
}

input:focus {
  outline: none;
}

#main {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.explore-tip {
  position: absolute;
  z-index: 99999;
  top: -21px;
  left: 50%;
  padding: 0px 10px;
  transform: translateX(-50%);
  border-radius: 10px;
  background-color: white;
  font-size: 16px;
  color: #626262;
  transition: 1s;
  animation: moving 1s ease-in-out forwards;
}
@keyframes moving {
  0% {
    top: -21px;
  }
  100% {
    top: 50px;
  }
}
@keyframes moving-out {
  0% {
    top: 50px;
  }
  100% {
    top: -21px;
  }
}
</style>
