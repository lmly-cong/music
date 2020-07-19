<template>
  <div class="container">
    <div class="list">
      <el-dropdown @command= "musicItem" >
        <span class="el-dropdown-link">
        歌曲列表
         <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
       
        <el-dropdown-menu>
          <div class="musicInfo">
            <el-dropdown-item v-for="(item, index) in musicList" :key="index" :command="item">
              <span style=" color: blue; padding-right: 10px">{{index+1}}</span>
              <span style=" color: black">{{item.name}}</span>
              <span style=" color: red; float: right; text-float: right">{{item.artist}}</span>
            </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

    </div>

    <div class="music-picture" :style="{backgroundImage: 'url('+ picture +')'}">
    </div>
    <div class="music-container">
      <div class="name">{{name}}</div>
      <div class="artist">{{artist}}</div>
      <hr>
    </div>
    <audio
    id="music1"
    :src="musicUrl"
    controls="controls"
    loop="loop"
    ref="audio"
    class="myaudio"
    autoplay="false"
    hidden
    >
    </audio>

    <div class="music-button">
      <div class="music-button-p">
        <el-button @click="start" :icon="icon" circle></el-button>
        <el-button @click="refresh" icon="el-icon-refresh" circle></el-button>
      </div>

      <div class="music-play-info">
        <!-- 进度条 -->
        <div class="music-progress">
          <el-progress
          :percentage="percentage"
          v-if="percentage"
          :show-text="false"
          color="#8e71c7">
          </el-progress>
        </div>
      </div>
    </div>
    <!-- 背景 -->
    <div class="music-bgimg" :style="{backgroundImage: 'url(' + picture + ')'}"></div>
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: 'Music',
  data() {
    return {
      musicList: [],
      artist: '',
      picture: '',
      name: '',
      musicUrl: '',
      icon: 'el-icon-video-play',
      percentage: 0
    }
  },
  created() {
    const that = this
    const url = "/music.json"

    //读取数据
    axios.get(url).then(res => {
      that.musicList = res.data
      // console.log(res.data);
      that.picture = res.data[0].cover
      that.artist = res.data[0].artist
      that.name = res.data[0].name
      that.musicUrl= res.data[0].url
    });
    that.runTime();
  },
  methods: {
    musicItem(command) {
      // console.log(command);
      this.$message({
        message: "开始播放歌曲：《" + command.name + "》--演唱者：" + command.artist,
        type: 'success',
        duration: 1800,
        center: true
      });
      this.picture = command.cover
      // console.log(this.picture);
      this.name = command.name
      this.artist = command.artist
      this.musicUrl = command.url
    },
    //重放
    refresh() {
      let audio = document.getElementById("music1")
      audio.currentTime = 0
    },
    //播放或暂停
    start() {
      // console.log(11);
      let audio = document.getElementById("music1")
      audio.volume = 1
      if (audio !== null) {
        if (audio.paused) {
          this.icon = "el-icon-video-play"
          audio.play()
        }
        else {
          this.icon = "el-icon-video-pause"
          audio.pause()
        }
      }
    },
    runTime() {
      let that = this
      let timer = setInterval(() => {
        let audio = document.getElementById("music1")
        that.percentage = Math.round(
          (parseInt(audio.currentTime) / parseInt(audio.duration)) * 100
        );
      }, 100)
    }
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
  }

  .list {
    position: absolute;
    margin-left: 4%;
    margin-top: 40px;
    z-index: 1;
    text-align: center;
  }

  .music-bgimg {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center 40%;
    background-repeat: no-repeat;
    filter: blur(20px);
    display: block;
  }
  .music-picture {
    background-color: #fff;
    position: absolute;
    margin-left: 18%;
    margin-top: 5%;
    height: 300px;
    width: 300px;
    border-radius: 150px;
    z-index: 1;
    animation: rotate 15s linear infinite;
  }

  .el-dropdown-link {
    padding: 10px;
    background-color: rgb(61, 238, 229, 0.6);
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    color: black;
    font-weight: bold;
  }
  
  .el-icon-arrow-down {
    font-size: 12px;
  }

  span {
    font: bold;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
  }

  .musicInfo {
    padding: 3px;
    width: 300px;
    height: 400px;
    font-size: 10px;
    line-height: 20px;
    overflow-y: scroll;
  }

  .music-container {
    position: absolute;
    margin-left: 45%;
    height: 500px;
    width: 680px;
    margin-top: 4%;
    z-index: 1;
  }

  hr {
    height: 3px;
   background: rgb(41, 167, 146);
  }

  .name {
  position: relative;
  padding: 10px;
  height: 20px;
  line-height: 20px;
  font-size: 30px;
  text-align: left;
  font-weight: bold;
  color: rgb(7, 54, 95);
  }

  .artist {
    position: relative;
    padding: 10px;
    color: rgb(30, 173, 118);
  }

  .myaudio {
    width: 100%;
    height: 40px;
    outline: none;
    background-color: beige;
  }

  .music-button {
    background: rgb(212, 212, 212);
    bottom: 0;
    position: absolute;
    width: 50%;
    z-index: 1;
    border-radius: 20px;
    margin-bottom: 10px;
    margin-left: 20%;
  }

  .music-button .music-button-p,
  .music-button .music-play-info {
    display: table-cell;
  }

  .music-button-p {
    /* 播放按钮 */
    padding: 10px 0px 10px 10px;
  }
  .music-music-play-info {
    background-color: rgb(266, 147, 147);
    padding: 10px 0px 10px 10px;
  }
  .music-progress {
   width: 75%;
   background: rgb(100, 255, 255);
   position: absolute;
   bottom: 25px;
   margin-left: 50px;
  }
</style>