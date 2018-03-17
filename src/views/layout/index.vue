<template>
  <div class="layout" @click="layoutClick">
    <van-nav-bar class="layout-title" :title="headerTitle" @click-left="pageClose" @click-right='onClickRight'>
      <van-icon v-if="!navVar" class="layout-return" name="arrow-left" slot="left" />
      <van-icon v-if="navVar" class="layout-add" name="add-o" slot="right" />
    </van-nav-bar>
    <transition name="van-fade">
      <div class="add-socket" v-show="addSocket" id="add-socket_div">
        <ul>
          <van-button bottom-action>添加好友</van-button>
          <van-button bottom-action>添加群聊</van-button>
        </ul>
      </div>
    </transition>
    <router-view></router-view>
    <van-tabbar v-model="active" @change='tabChange'>
      <van-tabbar-item icon="chat">
        <span>消息</span>
      </van-tabbar-item>
      <van-tabbar-item icon="contact">
        <span>好友</span>
      </van-tabbar-item>
      <van-tabbar-item icon="pending-orders">
        <span>博文</span>
      </van-tabbar-item>
      <van-tabbar-item icon="edit">
        <span>动态</span>
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import resource from '@/utils/resource.json'
export default {
  data () {
    return {
      active: 0,
      addSocket: false,
      navData: ['message', 'friend', 'blog', 'activity']
    }
  },
  methods: {
    onClickLeft () {
      console.log(11)
    },
    onClickRight () {
      this.addSocket = true
    },
    layoutClick (e) {
      console.log('add-socket_div')
      console.log(event.path)
    },
    tabChange (val) {
      this.$router.push({
        path: `/${this.navData[val]}`
      })
    },
    pageClose () {
      console.log(11)
    }
  },
  computed: {
    headerTitle () {
      return resource.header[this.$route.name]
    },
    navVar () {
      let data = ['占位符', '消息', '好友', '博文', '动态']
      return data.indexOf(this.headerTitle)
    }
  }
}
</script>

<style lang='less'>
.layout {
  .van-nav-bar__title {
    color: #fff;
    background: linear-gradient(left, #2aacf9, #59d7f5)
  }

  .layout-add,
  .layout-return {
    font-size: .22rem;
    color: #fff!important;
  }

  .van-button--bottom-action {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 0;
    border-radius: 0;
    font-size: 16px;
    color: #333;
    background-color: #fff;
  }
}
</style>

<style lang='less' scoped>
.layout-title {
  position: relative;
}

.add-socket {
  position: absolute;
  z-index: 2;
  width: 110px;
  right: 8px;
  top: 40px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 2px 15px #ddd;
  ul {
    background-color: #fff;
    padding: 10px 0;
  }
  li {
    padding: 8px;
    padding-left: 16px;
    font-size: 14px;
    text-align: left;
  }
}
</style>
