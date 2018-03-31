<template>
  <div class="room-list">
    <Scroll class="scroll-item"
      :data='group'>
      <ul class="group-list_ul">
        <li v-for="item in group"
          :key="item.friendId"
          @click="groupClick(item)">
          <div class="ul-li_img">
            <img :src="item.roomImg"
              alt="">
          </div>
          <div class="ul-li_text">
            <div class="text-name">{{item.roomName}}</div>
            <div class="text-signature">创建人：
              <b>{{item.createBy}}</b>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="!group.length"
        class="friend-list_null">
        没有该群号，快去看看吧
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '@/components/scroll.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      groupList: []
    }
  },
  created () {
    if (!this.group.length) {
      this.$router.back()
    }
  },
  methods: {
    groupClick (item) {
      console.log(item)
    }
  },
  computed: {
    ...mapGetters([
      'group'
    ])
  },
  components: {
    Scroll
  }
}
</script>

<style lang='less'>
.group-list_ul {
  position: relative;
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
}
</style>
