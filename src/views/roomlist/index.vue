<template>
  <div class="room-list">
    <Scroll class="scroll-item"
      :data='group'>
      <ul class="group-list_ul">
        <li v-for="item in group"
          :key="item.id"
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
    <van-popup v-model="show"
      position="right"
      :overlay="false">
      <div class="room-list_popup">
        <van-nav-bar :title="groupData.roomName"
          @click-left="groupBack">
          <van-icon class="layout-return"
            name="arrow-left"
            slot="left" />
        </van-nav-bar>
        <div class="list-poput_box">
          <div class="ul-li_img list-poput_img">
            <img :src="groupData.roomImg">
          </div>
          <div class="list-poput_item">
            <span>群号:</span>
            {{groupData.roomName}}
          </div>
          <div class="list-poput_item">
            <span>创建人:</span>
            {{groupData.createBy}}
          </div>
          <div class="list-poput_item">
            <span>创建时间:</span>
            {{groupData.createDate}}
          </div>
        </div>
        <div class="list-poput_btn">
          <van-button size='large'
            type="primary"
            @click="addGroup">添加好友</van-button>
          </div>
        </div>
    </van-popup>
    </div>
</template>

<script>
import Scroll from '@/components/scroll.vue'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      groupList: [],
      show: false,
      groupData: {}
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
      this.show = true
      item.createData = new Date(item.createData).toLocaleString()
      this.groupData = item
    },
    groupBack () {
      this.show = false
    },
    addGroup () {

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

<style lang='less' scoped>
.van-popup--right,
.oom-list_popup {
  width: 100%;
  height: 100%;
}
.list-poput_box {
  justify-content: center;
}
.list-poput_item {
  padding: 0 0.3rem;
  line-height: 0.5rem;
  font-size: 0.15rem;
}
.list-poput_btn {
  padding: 0 0.3rem;
  margin-top: 0.3rem;
}
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
.list-poput_img {
  width: 0.6rem;
  height: 0.6rem;
  margin: 0 auto;
  margin-top: 0.25rem;
  margin-bottom: 0.1rem;
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
