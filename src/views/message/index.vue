<template>
  <div class="message">
    <ul class="message-ul">
      <li class="message-li">
        <van-cell-swipe :right-width="65">
          <van-cell-group>
            <div class="van-cell_center" @click="enterRoom">
              <div class="cell-center_img">
                <img src="../../../static/toxiang.png" />
              </div>
              <div class="cell-center_text">
                <div class="center-text_title">安妮海瑟薇</div>
                <div>今晚我们去那吃饭</div>
              </div>
              <div class="cell-center_time">15:30</div>
            </div>
          </van-cell-group>
          <span class="van-cell_right" slot="right">删除</span>
        </van-cell-swipe>
      </li>
      <li class="message-li">
        <van-cell-swipe :right-width="65">
          <van-cell-group>
            <div class="van-cell_center" @click="sendRoomChat">
              <div class="cell-center_img">
                <img src="../../../static/toxiang.png" />
              </div>
              <div class="cell-center_text">
                <div class="center-text_title">安妮海瑟薇</div>
                <div>今晚我们去那吃饭</div>
              </div>
              <div class="cell-center_time">15:30</div>
            </div>
          </van-cell-group>
          <span class="van-cell_right" slot="right">删除</span>
        </van-cell-swipe>
      </li>
      <li class="message-li">
        <van-cell-swipe :right-width="65">
          <van-cell-group>
            <div class="van-cell_center">
              <div class="cell-center_img">
                <img src="../../../static/toxiang.png" />
              </div>
              <div class="cell-center_text">
                <div class="center-text_title">安妮海瑟薇</div>
                <div>今晚我们去那吃饭</div>
              </div>
              <div class="cell-center_time">15:30</div>
            </div>
          </van-cell-group>
          <span class="van-cell_right" slot="right">删除</span>
        </van-cell-swipe>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
      this.$socket.emit('join', {roomId: 123, userName: this.user.userName})
    },
    sendRoomChat () {
      this.$socket.emit('sendRoomChat', {roomId: 123, msg: `我是${this.user.userName}`})
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
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
    margin-right: .1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.cell-center_text {
  line-height: .21rem;
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
</style>
