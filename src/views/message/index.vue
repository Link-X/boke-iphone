<template>
  <div class="message">
    <Scroll :data='messNumber'
      class="message-scroll"
      @scroll='scroll'
      @scrollEnd='scrollEnd'>
      <ul class="message-ul"
        @touchstart="touchDom($event, 'add')"
        @touchend="touchDom($event, 'rem')">
        <li class="message-li"
          v-for="item in messList"
          :key="item.toUserId"
          @click="showMsgWin(item.toUserId)">
          <van-cell-swipe :right-width="65">
            <van-cell-group>
              <div class="van-cell_center">
                <div class="cell-center_img">
                  <img :src="item.userImg" />
                </div>
                <div class="cell-center_text">
                  <div class="center-text_title">{{item.userName}}</div>
                  <div>{{item.msgTitle}}</div>
                </div>
                <div class="cell-center_time">{{item.date}}</div>
              </div>
            </van-cell-group>
            <span class="van-cell_right"
              slot="right">删除</span>
          </van-cell-swipe>
        </li>
      </ul>
    </Scroll>
    <van-popup v-model="msgWin"
      position="right"
      :overlay="false">
      <div class="message-win">
        <van-nav-bar :title="msgTest.userName"
          @click-left="msgWinClose">
          <van-icon class="layout-return"
            name="arrow-left"
            slot="left" />
        </van-nav-bar>
        <Scroll :data='msgTest.msgArr'
          class="message-scroll">
          <div class="message-win_center">
            <div class="message-win_another"
              v-for="item in msgTest.msgArr"
              :key="item.id"
              :class="{'message-win_my': item.sign === 'my'}">
              <div class="message-win_img"
                v-if="item.sign === 'he'"><img src="../../../static/toxiang.png" /></div>
              <span class="message-win_text"
                :class="{'message-win_text2' : item.sign === 'my'}">{{item.msg}}</span>
              <div class="message-win_img message-win_myImg"
                v-if="item.sign === 'my'"><img src="../../../static/toux2.jpg" /></div>
            </div>
          </div>
        </Scroll>
        <div class="message-win_send">
          <van-cell-group>
            <van-field v-model="message"
              type="textarea"
              placeholder="请输入留言"
              rows="1"
              autosize />
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
import { touchDoms } from '@/utils/utils.js'
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
          userImg: 'http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg',
          date: '15:30',
          toUserId: '2'
        },
        '1': {
          userName: 'xu',
          msgTitle: '',
          msgArr: [],
          userImg: 'http://f2.topitme.com/2/b9/71/112660598401871b92l.jpg',
          sign: 'private',
          date: '15:30',
          toUserId: '1'
        },
        '123': {
          userName: '系统群',
          msgTitle: '',
          msgArr: [],
          sign: 'room',
          userImg: '../../../static/toxiang.png',
          date: '15:30',
          toUserId: '123'
        },
        '1234': {
          userName: '系统群2',
          msgTitle: '',
          msgArr: [],
          userImg: '../../../static/toxiang.png',
          sign: 'room',
          date: '15:30',
          toUserId: '1234'
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
      console.log(data, '来消息啦')
      this.setMessage(data)
    },
    roomMessage (data) {
      // 群消息
      console.log(data, '群消息来啦')
      this.setMessage(data)
    }
  },
  created () {
    let data = {
      userName: this.user.userName,
      userId: this.user.userId
    }
    this.messNumber = Object.keys(this.messList)
    // 加入socket
    this.$socket.emit('newUser', data)
    this.pageCome()
    // 自动加入2个系统群
    this.enterStatemRoom()
  },
  methods: {
    pageCome () {
      // 从别的页面进入聊天，打开聊天
      if (this.$route.query.id) {
        this.$set(this.messList, this.$route.query.id, {
          userName: this.$route.query.name,
          msgTitle: '',
          msgArr: [],
          sign: this.$route.query.sign,
          userImg: this.$route.query.userImg,
          date: '15:30',
          toUserId: this.$route.query.id
        })
        this.showMsgWin(this.$route.query.id)
      }
    },
    showMsgWin (toUserId) {
      // 打开聊天窗口
      for (let v in this.messList) {
        if (v === toUserId) {
          this.msgTest = JSON.parse(JSON.stringify(this.messList[v]))
        }
      }
      if (this.msgTest.sign === 'room') {
        // 群聊茶窗口
        let data = {
          userName: this.user.userName,
          roomId: this.msgTest.toUserId
        }
        this.enterRoom(data)
      }
      this.msgWin = true
    },
    msgWinClose () {
      // 关闭聊天窗口
      for (let v in this.messList) {
        if (v === this.msgTest.toUserId) {
          this.messList[v].msgArr = []
          this.messList[v].msgArr = this.msgTest.msgArr.concat([])
          if (this.msgTest.msgArr.length) {
            this.messList[v].msgTitle = this.msgTest.msgArr[this.msgTest.msgArr.length - 1].msg
          }
        }
      }
      this.msgTest = {
        userName: '',
        msgTitle: '',
        msgArr: [],
        sign: '',
        date: '',
        toUserId: ''
      }
      this.msgWin = false
    },
    sendMessage () {
      // 发送消息
      let msgData = {
        userName: this.msgTest.userName,
        sendName: this.user.userName,
        msg: this.message,
        sign: this.msgTest.sign,
        userId: this.user.userId,
        toUserId: this.msgTest.toUserId,
        roomId: this.msgTest.toUserId
      }
      this.msgTest.msgArr.push({
        msg: this.message,
        sign: 'my',
        id: Math.random() * 1000 + 'iphone'
      })
      this.message = ''
      if (this.msgTest.sign === 'private') {
        debugger
        // 私聊
        this.$socket.emit('sendPrivateChat', msgData)
        return
      }
      // 群聊
      msgData.sign = 'room'
      msgData.userId = this.msgTest.toUserId
      this.$socket.emit('sendRoomChat', msgData)
    },
    enterRoom (data) {
      // 加入群聊
      let senddData = {
        roomId: data.roomId,
        userName: data.userName
      }
      this.$socket.emit('join', senddData)
    },
    setMessage (data) {
      // 如果发送消息人或群 已经被打开，则直接加入聊天页数据
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

      // 如果消息有记录则 直接加入聊天记录
      if (this.messList[data.userId]) {
        this.messList[data.userId].msgArr.push({
          msg: data.msg,
          sign: 'he',
          id: Math.random() * 1000 + 'iphone'
        })
        this.messList[data.userId].msgTitle = data.msg
      } else {
        // 否则添加新对话
        let obj = {
          userName: data.sendName,
          msgTitle: data.msg,
          msgArr: [{
            msg: data.msg,
            sign: 'he',
            id: Math.random() * 1000 + 'iphone'
          }],
          sign: data.sign,
          date: '15:30',
          toUserId: data.userId,
          roomId: data.roomId
        }
        this.$set(this.messList, data.userId, obj)
        this.messNumber.push(data.userId)
      }
    },
    enterStatemRoom () {
      for (let i in this.messList) {
        if (this.messList[i].sign === 'room') {
          let data = {
            roomId: this.messList[i].toUserId,
            userName: this.user.userName
          }
          this.enterRoom(data)
        }
      }
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
    touchDom (dom, type) {
      touchDoms(dom, type)
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
  font-size: 0.16rem;
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
  height: 0.5rem;
  padding: 0.15rem;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  .cell-center_img {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.15rem;
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
  line-height: 0.25rem;
  width: 65%;
  .center-text_title {
    font-weight: bold;
    font-size: 0.16rem;
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
  right: 0.1rem;
  color: #756a6a;
}

.message-scroll {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: all 0.2s;
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
  width: 0.4rem;
  height: 0.4rem;
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
