<template>
  <div>
    <van-nav-bar :title="headerTitle" @click-left="pageClose">
      <van-icon v-if="!navVar" class="layout-return" name="arrow-left" slot="left" />
      <van-icon v-if="navVar" class="layout-add" name="add-o" slot="right" />
    </van-nav-bar>
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
      navData: ['message', 'friend', 'blog', 'activity']
    }
  },
  methods: {
    onClickLeft () {
      console.log(11)
    },
    onClickRight () {
      console.log(22)
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

<style>
  .van-nav-bar__title {
    color: #fff;
    background: linear-gradient(left,#2aacf9,#59d7f5)
  }
  .layout-add, .layout-return {
    font-size: .22rem;
    color: #fff!important;
  }
</style>
