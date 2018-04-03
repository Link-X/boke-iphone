<template>
  <div class="friend-list">
    <van-tabs :active="active"
      @click="onClick">
      <van-tab title="好友">
      </van-tab>
      <van-tab title="群聊">
      </van-tab>
    </van-tabs>
    <Scroll class="scroll-item"
      v-show="isList === 'getFriendList'"
      :data='friendList'>
      <ul class="friend-list_ul"
        @touchstart="touchDom($event, 'add')"
        @touchend="touchDom($event, 'rem')">
        <li v-for="item in friendList"
          :key="item.friendId"
          @click="friendMess(item)">
          <div class="ul-li_img">
            <img :src="item.userImg"
              alt="">
          </div>
          <div class="ul-li_text">
            <div class="text-name">{{item.friendUserName}}</div>
            <div class="text-signature">{{item.signature}}</div>
          </div>
        </li>
      </ul>
      <div v-if="!friendList.length"
        class="friend-list_null">
        没有好友，快去看看吧
      </div>
    </Scroll>
    <Scroll class="scroll-item"
      v-show="isList === 'getGroupList'"
      :data='groupList'>
      <ul class="friend-list_ul"
        @touchstart="touchDom($event, 'add')"
        @touchend="touchDom($event, 'rem')">
        <li v-for="item in groupList"
          :key="item.id"
          @click="groupMsg(item)">
          <div class="ul-li_img">
            <img :src="item.friendGroupImg"
              alt="">
          </div>
          <div class="ul-li_text">
            <div class="text-name">{{item.friendGroupName}}</div>
            <div class="text-signature">{{item.signature}}</div>
          </div>
        </li>
      </ul>
      <div v-if="!groupList.length"
        class="friend-list_null">
        没有群聊，快去看看吧
      </div>
    </Scroll>
  </div>
</template>

<script>
import resource from '@/utils/resource.json'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Scroll from '@/components/scroll.vue'
import { touchDoms } from '@/utils/utils.js'
export default {
  data () {
    return {
      active: 0,
      friendList: [],
      groupList: [],
      isList: 'getFriendList'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    friendMess (friend) {
      // 进入好友资料讲resource的header对应改成好友的名字
      resource.header.addFriend = friend.friendUserName

      let data = {
        iphone: friend.friendIphone
      }
      this.getFriend(data).then(data => {
        // 获取好友资料
        this.SET_FRIEND(data.data[0])
        this.$router.push({
          path: '/addFriend',
          query: {
            friendId: friend.friendId
          }
        })
      })
    },
    groupMsg (group) {
      resource.header.addFriend = group.friendGroupName
      let data = {
        id: group.addAccountId
      }
      this.getGroupData(data).then(data => {
        this.SET_GROUP(data.data)
        this.$router.push({
          path: '/roomlist',
          query: {
            roomId: group.friendGroupId
          }
        })
      })
    },
    onClick (index, title) {
      let titles = ['getFriendList', 'getGroupList']
      this.isList = titles[index]
    },
    getData () {
      this.pageGetFriendList()
      this.pageGetGroupList()
    },
    pageGetFriendList () {
      this.getFriendList({ userId: this.user.userId }).then(data => {
        if (data.code === 200) {
          this.friendList = data.data
        }
      })
    },
    pageGetGroupList () {
      this.getGroupList({ addAccountId: this.user.userId }).then(data => {
        if (data.code === 200) {
          this.groupList = data.data
        }
      })
    },
    ...mapActions([
      'getFriendList',
      'getFriend',
      'getGroupList',
      'getGroupData'
    ]),
    touchDom (dom, type) {
      touchDoms(dom, type)
    },
    ...mapMutations([
      'SET_FRIEND',
      'SET_GROUP'
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
.friend-list_null {
  text-align: center;
  color: #988b8b;
  font-size: 14px;
}
</style>
