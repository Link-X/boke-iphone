<template>
  <div class="add-friend">
    <div class="add-friend_title">
      <div class="friend-title_left">
        <p>账号:{{friend.iphone}}</p>
        <p>用户名:{{friend.userName}}</p>
      </div>
      <div class="friend-title_img">
        <img src="../../../static/toxiang.png">
      </div>
    </div>
    <div class="add-friend_center">
      <p>创建时间:{{createDate}}</p>
      <div>个性签名:
        <div class="friend-center_text">{{friend.signature}}</div>
      </div>
    </div>
    <div class="add-friend_btn">
      <van-button size='large'
        type="primary"
        @click="addFrien">添加好友</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  created () {
    if (!this.friend.iphone || !this.user.userId) {
      this.$router.back()
    }
  },
  methods: {
    addFrien () {
      let data = {
        friendIphone: this.friend.iphone,
        friendUserName: this.friend.userName,
        userName: this.user.userName,
        userId: this.user.userId,
        friendId: this.friend.id
      }
      this.addFriend(data).then(data => {
        let jude = {
          'add': () => {
            this.$toast('添加成功')
          },
          'exist': () => {
            this.$toast('ta已经是您的好友啦')
          }
        }
        jude[data.data.type]()
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
  height: 100%;
  background-color: #fff;
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
</style>
