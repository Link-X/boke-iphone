<template>
  <div class="friend-list">
    <van-tabs :active="active">
      <van-tab title="好友">
      </van-tab>
      <van-tab title="群聊">
      </van-tab>
    </van-tabs>
    <Scroll class="scroll-item"
      :data='friendLIst'>
      <ul class="friend-list_ul">
        <li v-for="item in friendLIst"
          :key="item.friendId"
          @click="friendMess(item)">
          <div class="ul-li_img">
            <img src="../../../static/toxiang.png"
              alt="">
          </div>
          <div class="ul-li_text">
            <div class="text-name">{{item.friendUserName}}</div>
            <div class="text-signature">{{item.signature}}</div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import resource from '@/utils/resource.json'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Scroll from '@/components/scroll.vue'
export default {
  data () {
    return {
      active: 0,
      friendLIst: []
    }
  },
  created () {
    this.getFriendList({ userId: this.user.userId }).then(data => {
      if (data.code === 200) {
        this.friendLIst = data.data
      }
    })
  },
  methods: {
    friendMess (friend) {
      resource.header.addFriend = friend.friendUserName
      let data = {
        userNumber: friend.friendIphone
      }
      this.getFriend(data).then(data => {
        this.SET_FRIEND(data.data[0])
        this.$router.push({
          path: '/addFriend',
          query: { friendId: friend.friendId }
        })
      })
    },
    ...mapActions([
      'getFriendList',
      'getFriend'
    ]),
    ...mapMutations([
      'SET_FRIEND'
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

<style lang='less' scoped>
.friend-list_ul {
  position: relative;
  padding: 50px 0 55px 0;
  li {
    height: 0.5rem;
    padding: 0.1rem 0.15rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
}
.ul-li_img {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  margin-right: 0.15rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.ul-li_text {
  line-height: 0.25rem;
  flex: 1;
}
.text-name {
  font-weight: bold;
}
</style>
