<template>
  <div class="room-list">
    <Scroll class="scroll-item"
      :data='groupList'>
      <ul class="group-list_ul">
        <li v-for="item in groupList"
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
      <div v-if="!groupList.length"
        class="friend-list_null">
        没有该群号，快去看看吧
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll.vue'
export default {
  data () {
    return {
      groupList: []
    }
  },
  components: {
    Scroll
  }
}
</script>

<style lang='less'>
.group-list_ul {
  position: relative;
  padding: 50px 0 55px 0;
}
.friend-list_null {
  text-align: center;
}
</style>
