<template>
  <div class="message">
    <Scroll :data='messNumber' class="message-scroll" @scroll='scroll' @scrollEnd='scrollEnd'>
      <ul class="message-ul">
        <li class="message-li" v-for="item in messList" :key="item.toUserId" @click="showMsgWin(item.toUserId)">
          <van-cell-swipe :right-width="65">
            <van-cell-group>
              <div class="van-cell_center" @click="enterRoom">
                <div class="cell-center_img">
                  <img src="../../../static/toxiang.png" />
                </div>
                <div class="cell-center_text">
                  <div class="center-text_title">{{item.userName}}</div>
                  <div>{{item.msgTitle}}</div>
                </div>
                <div class="cell-center_time">{{item.date}}</div>
              </div>
            </van-cell-group>
            <span class="van-cell_right" slot="right">删除</span>
          </van-cell-swipe>
        </li>
      </ul>
    </Scroll>
    <van-popup v-model="msgWin" position="right" :overlay="false">
      <div class="message-win">
        <van-nav-bar :title="msgTest.userName" @click-left="msgWinClose">
          <van-icon class="layout-return" name="arrow-left" slot="left" />
        </van-nav-bar>
        <Scroll :data='msgTest.msgArr' class="message-scroll">
          <div class="message-win_center">
            <div class="message-win_another" v-for="item in msgTest.msgArr" :key="item.id" :class="{'message-win_my': item.sign === 'my'}">
              <div class="message-win_img" v-if="item.sign === 'he'"><img src="../../../static/toxiang.png" /></div>
              <span class="message-win_text" :class="{'message-win_text2' : item.sign === 'my'}">{{item.msg}}</span>
              <div class="message-win_img message-win_myImg" v-if="item.sign === 'my'"><img src="../../../static/toux2.jpg" /></div>
            </div>
          </div>
        </Scroll>
        <div class="message-win_send">
          <van-cell-group>
            <van-field v-model="message" type="textarea" placeholder="请输入留言" rows="1" autosize />
          </van-cell-group>
          <van-button @click="sendMessage">发送</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Scroll from '@/components/scroll.vue'
export default {
  data () {
    return {
      msgWin: false,
      message: '',
      messList: {
        '2': {
          userName: '许道斌',
          msgTitle: '今晚去哪吃',
          msgArr: [],
          sign: 'private',
          date: '15:30',
          toUserId: '2'
        },
        '1': {
          userName: 'xu',
          msgTitle: '',
          msgArr: [],
          sign: 'private',
          date: '15:30',
          toUserId: '1'
        }
      },
      msgTest: {},
      messNumber: []
    }
  },
  sockets: {
    connect: () => {
      console.log(this.$socket)
    },
    yesEnter (data) {
      this.SET_USER({
        userName: this.user.userName,
        userId: this.user.userId
      })
    },
    sys (data) {
      console.log(data)
    },
    privatChat (data) {
      // 监听私聊信息
      console.log(data)
      // 如果发送消息人 已经被打开，则直接加入聊天页数据
      if (data.userId === this.msgTest.toUserId) {
        this.msgTest.msgArr.push({
          msg: data.msg,
          sign: 'he',
          id: Math.random() * 1000 + 'iphone'
        })
        this.msgTest.date = data.date
        this.messList[data.userId].msgTitle = data.msg
        return
      }

      // 如果消息也有记录则 直接加入聊天记录
      if (this.messList[data.userId]) {
        this.messList[data.userId].msgArr.push({
          msg: data.msg,
          sign: 'he',
          id: Math.random() * 1000 + 'iphone'
        })
        this.messList[data.userId].msgTitle = data.msg
      } else {
        let obj = {
          userName: data.userName,
          msgTitle: data.msg,
          msgArr: [{
            msg: data.msg,
            sign: 'he',
            id: Math.random() * 1000 + 'iphone'
          }],
          sign: 'private',
          date: '15:30',
          toUserId: data.userId
        }
        this.$set(this.messList, data.userId, obj)
        this.messNumber.push(data.userId)
        // this.messList[data.userId] = {
        //   userName: data.userName,
        //   msgTitle: data.msg,
        //   msgArr: [{
        //     msg: data.msg,
        //     sign: 'he',
        //     id: Math.random() * 1000 + 'iphone'
        //   }],
        //   sign: 'private',
        //   date: '15:30',
        //   toUserId: data.userId
        // }
      }
    }
  },
  created () {
    let data = {
      userName: this.user.userName,
      userId: this.user.userId
    }
    console.log(data)
    this.messNumber = Object.keys(this.messList)
    // 加入socket
    this.$socket.emit('newUser', data)
  },
  methods: {
    showMsgWin (toUserId) {
      // 打开聊天
      for (let v in this.messList) {
        if (v === toUserId) {
          this.msgTest = JSON.parse(JSON.stringify(this.messList[v]))
          console.log(this.msgTest)
        }
      }
      this.msgWin = true
    },
    msgWinClose () {
      for (let v in this.messList) {
        if (v === this.msgTest.toUserId) {
          this.messList[v].msgArr = []
          this.messList[v].msgArr = this.msgTest.msgArr.concat([])
        }
      }
      this.msgTest = {
        userName: '',
        msgTitle: '',
        msgArr: [],
        date: '',
        toUserId: ''
      }
      this.msgWin = false
    },
    sendMessage () {
      // 发送消息
      if (!this.msgTest.userName) {
        return
      }
      let msgData = {
        userName: this.msgTest.userName,
        sendName: this.user.userName,
        msg: this.message,
        userId: this.user.userId,
        toUserId: this.msgTest.toUserId
      }
      this.msgTest.msgArr.push({
        msg: this.message,
        sign: 'my',
        id: Math.random() * 1000 + 'iphone'
      })
      this.$socket.emit('sendPrivateChat', msgData)
    },
    enterRoom (data) {
      this.$socket.emit('join', { roomId: 123, userName: this.user.userName })
    },
    sendRoomChat () {
      this.$socket.emit('sendRoomChat', { roomId: 123, msg: `我是${this.user.userName}` })
    },
    scroll (pos) {
      console.log(pos)
    },
    scrollEnd () {
      console.log(1)
    },
    ...mapMutations([
      'SET_USER'
    ])
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  components: {
    Scroll
  }
}
</script>

<style lang='less'>
.van-field--has-textarea .van-field__control {
  max-height: 96px;
}
</style>

<style lang='less' scoped>
.van-cell_right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65px;
  height: 100%;
  font-size: .16rem;
  background-color: red;
  color: #fff;
}

.message-win,
.van-popup--right {
  width: 100%;
  height: 100%;
}

.message-win_center {
  padding: 20px 15px 50px 15px;
}

.van-cell_center {
  height: .5rem;
  padding: .15rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  .cell-center_img {
    width: .5rem;
    height: .5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: .15rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.message-ul {
  position: relative;
  padding-bottom: 55px;
}

.cell-center_text {
  line-height: .25rem;
  width: 65%;
  .center-text_title {
    font-weight: bold;
    font-size: .16rem;
  }
  div {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.cell-center_time {
  position: absolute;
  right: .1rem;
  color: #756a6a;
}

.message-scroll {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: all .2s;
  overflow: hidden;
}

.message-win_my {
  justify-content: flex-end; // flex-direction: row-reverse
}

.message-win_another {
  display: flex;
  align-items: center;
  flex-wrap: row-reverse;
  margin-bottom: 10px;
}

.message-win_img {
  width: .4rem;
  height: .4rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.message-win_text {
  display: inline-block;
  max-width: 284px;
  padding: 6px;
  margin-left: 5px;
  background-color: rgb(229, 229, 229);
  word-break: break-all;
  white-space: pre-wrap;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #ddd;
}

.message-win_myImg {
  margin-left: 5px;
}

.message-win_text2 {
  background-color: rgb(18, 183, 245);
  box-shadow: 2px 2px 2px #c7c3c3;
}

.message-win_send {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-height: 116px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ddd;
  background-color: #fff;
  .van-cell-group {
    flex-grow: 1;
  }
}
</style>
