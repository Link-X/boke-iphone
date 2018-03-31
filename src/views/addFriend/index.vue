<template>
  <div class="add-friend">
    <div class="add-friend_title">
      <div class="friend-title_left">
        <p>账号:
          <span class="title-left_span">{{friend.iphone}}</span>
        </p>
        <p>用户名:
          <span class="title-left_span">{{friend.userName}}</span>
        </p>
      </div>
      <div class="friend-title_img">
        <img :src="friend.userImg">
      </div>
    </div>
    <div class="add-friend_center">
      <p>创建时间:
        <span class="title-left_span">{{createDate}}</span>
      </p>
      <div>个性签名:
        <div class="friend-center_text">
          <span class="title-left_span">{{friend.signature}}</span>
        </div>
      </div>
    </div>
    <div class="add-friend_btn">
      <van-button size='large'
        type="primary"
        @click="addFrien"
        v-if="!friendId">添加好友</van-button>
      <van-button size='large'
        @click="sendMess"
        v-else>发送消息</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      friendId: ''
    }
  },
  created () {
    if (!this.friend.iphone || !this.user.userId) {
      this.$router.back()
    }
    console.log(this.$route.query.friendId)
    this.friendId = this.$route.query.friendId
  },
  methods: {
    addFrien () {
      let data = {
        friendIphone: this.friend.iphone,
        friendUserName: this.friend.userName,
        userName: this.user.userName,
        userId: this.user.userId,
        friendId: this.friend.id,
        signature: this.friend.signature,
        userImg: this.friend.userImg
      }
      this.addFriend(data).then(data => {
        let jude = {
          'add': () => {
            this.$toast({
              position: 'top',
              message: '添加成功'
            })
          },
          'exist': () => {
            this.$toast({
              position: 'top',
              message: 'ta已经是您的好友啦'
            })
          }
        }
        jude[data.data.type]()
      })
    },
    sendMess () {
      this.$router.push({
        path: '/message',
        query: {
          id: String(this.friendId),
          name: this.friend.userName,
          userImg: this.friend.userImg,
          sign: 'private'
        }
      })
    },
    ...mapActions([
      'addFriend'
    ])
  },
  computed: {
    ...mapGetters([
      'friend',
      'user'
    ]),
    createDate () {
      return new Date(this.friend.createDate).toLocaleString()
    }
  }
}
</script>

<style lang='less'>
.add-friend {
  background-color: #fff;
  position: absolute;
  width: 100%;
  top: 46px;
  bottom: 0;
}
.friend-title_left {
  line-height: 0.5rem;
}
.add-friend_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5% 10%;
  padding-bottom: 0;
}
.add-friend_center {
  padding: 5% 10%;
  padding-top: 0;
  p {
    line-height: 0.8rem;
  }
}
.friend-title_img {
  float: right;
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
.friend-center_text {
  border: 1px solid #ddd;
  padding: 0.2rem;
  border-radius: 6px;
  margin-top: 0.1rem;
}
.add-friend_btn {
  padding: 0 0.3rem;
  margin-top: 0.35rem;
}
.title-left_span {
  font-weight: bold;
}
</style>
