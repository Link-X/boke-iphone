<template>
  <div class="message">
    <Scroll :data='messList' class="message-scroll" @scroll='scroll' @scrollEnd='scrollEnd'>
      <ul class="message-ul">
        <li class="message-li" v-for="item in messList" :key="item.userId" @click="showMsgWin(item.userId)">
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
        <div class="message-win_center">
          <div class="message-win_another" v-for="item in msgTest.msgArr" :key="item.id" :class="{'message-win_my': item.sign === 'my'}">
            <div class="message-win_img" v-if="item.sign === 'he'"><img src="../../../static/toxiang.png" /></div>
            <span class="message-win_text">{{item.msg}}</span>
            <div class="message-win_img message-win_myImg" v-if="item.sign === 'my'"><img src="../../../static/toux2.jpg" /></div>
          </div>
        </div>
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
import { mapGetters } from 'vuex'
import Scroll from '@/components/scroll.vue'
export default {
  data () {
    return {
      msgWin: false,
      message: '',
      messList: [
        {
          userName: '安妮海瑟薇',
          msgTitle: '今晚去哪吃',
          msgArr: [
            {
              msg: '今天好冷',
              sign: 'he',
              id: Math.random() * 1000 + 'iphone'
            },
            {
              msg: '下雪了',
              sign: 'he',
              id: Math.random() * 1000 + 'iphone'
            },
            {
              msg: '好大的风啊',
              sign: 'my',
              id: Math.random() * 1000 + 'iphone'
            },
            {
              msg: '是啊',
              sign: 'he',
              id: Math.random() * 1000 + 'iphone'
            }
          ],
          sign: 'private',
          date: '15:30',
          userId: '123'
        },
        {
          userName: 'xu',
          msgTitle: '',
          msgArr: [],
          sign: 'private',
          date: '15:30',
          userId: '1'
        },
        {
          userName: '许道斌',
          msgTitle: '',
          msgArr: [],
          sign: 'private',
          date: '15:30',
          userId: '2'
        }
      ],
      msgTest: {
        userName: '安妮海瑟薇',
        msgTitle: '今晚去哪吃',
        msgArr: [],
        date: '15:30',
        userId: '123'
      }
    }
  },
  sockets: {
    connect: () => {
      console.log(this.$socket)
    },
    sys (data) {
      console.log(data)
    },
    privatChat (data) {
      // 监听私聊信息
      // 如果当前在聊天则直接将数据加入渲染聊天页的对象中
      console.log(data)
      if (data.userId === this.msgTest.userId) {
        this.msgTest.msgArr.push({
          msg: data.msg,
          sign: 'he',
          id: Math.random() * 1000 + 'iphone'
        })
        this.msgTest.date = data.date
        return
      }
      for (let v of this.messList) {
        if (v.userId === data.userId) {
          v.msgTitle = data.msg
          v.msgArr.push({
            msg: data.msg,
            sign: 'he',
            id: Math.random() * 1000 + 'iphone'
          })
          // v.date = data.date
        } else {
          this.messList.push(data)
        }
      }
    }
  },
  created () {
    let data = {
      userName: this.user.userName,
      userId: this.user.userId
    }
    console.log(data)
    // 加入socket
    this.$socket.emit('newUser', data)
  },
  methods: {
    showMsgWin (userId) {
      // 打开聊天
      for (let v of this.messList) {
        if (v.userId === userId) {
          this.msgTest = JSON.parse(JSON.stringify(v))
        }
      }
      this.msgWin = true
    },
    msgWinClose () {
      this.messList = this.messList.map(v => {
        if (v.userId === this.msgTest.userId) {
          v.msgArr = []
          v.msgArr = this.msgTest.msgArr.concat([])
        }
        return v
      })
      this.msgTest = {
        userName: '',
        msgTitle: '',
        msgArr: [],
        date: '',
        userId: ''
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
        userId: this.user.userId
      }
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
    }
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
  height: 100%;
  padding-top: 20px;
  overflow-y: scroll;
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
  margin-left: 5px;
  height: 100%;
  background-color: rgb(229, 229, 229)
}

.message-win_myImg {
  margin-left: 5px;
}

.message-win_text2 {
  display: inline-block;
  margin-right: 5px;
  height: 100%;
  background-color: rgb(18, 183, 245)
}

.message-win_send {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
