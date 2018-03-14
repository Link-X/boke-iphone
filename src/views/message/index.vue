<template>
  <div class="message">
    <Scroll :data='messList' class="message-scroll" @scroll='scroll' @scrollEnd='scrollEnd'>
      <ul class="message-ul">
        <!-- <van-popup v-model="show" position="top" :overlay="false">
          对话msg
        </van-popup> -->
        <li class="message-li" v-for="item in messList" :key="item.id">
          <van-cell-swipe :right-width="65">
            <van-cell-group>
              <div class="van-cell_center" @click="enterRoom">
                <div class="cell-center_img">
                  <img src="../../../static/toxiang.png" />
                </div>
                <div class="cell-center_text">
                  <div class="center-text_title">{{item.userName}}</div>
                  <div>{{item.msg}}</div>
                </div>
                <div class="cell-center_time">{{item.date}}</div>
              </div>
            </van-cell-group>
            <span class="van-cell_right" slot="right">删除</span>
          </van-cell-swipe>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Scroll from '@/components/scroll.vue'
export default {
  data () {
    return {
      messList: [
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '123'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '1234'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '1235'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '1236'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '1237'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '1238'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '1239'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '1223'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '12223'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '12333'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '133323'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '121233'
        },
        {
          userName: '安妮海瑟薇',
          msg: '今晚去哪吃',
          date: '15:30',
          id: '1212343'
        }
      ]
    }
  },
  sockets: {
    connect: () => {
      console.log(this.$socket)
    },
    sys (data) {
      console.log(data)
    },
    roomMessage (data) {
      console.log(data)
    }
  },
  created () {
    let data = {
      userName: this.user.userName,
      userId: this.user.userId
    }
    this.$socket.emit('newUser', data)
  },
  methods: {
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
.van-cell_center {
  height: .5rem;
  padding: .1rem;
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
</style>
