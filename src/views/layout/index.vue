<template>
  <div class="layout"
       @click="layoutClick">
    <van-nav-bar class="layout-title"
                 :title="headerTitle"
                 @click-left="pageClose"
                 @click-right='onClickRight'>
      <van-icon v-if="navVar < 0"
                class="layout-return"
                name="arrow-left"
                slot="left" />
      <van-icon v-if="navVar >= 0"
                class="layout-add"
                name="add-o"
                slot="right" />
    </van-nav-bar>
    <transition name="van-fade">
      <div class="add-socket"
           v-show="addSocket"
           id="add-socket_div">
        <ul>
          <van-button bottom-action
                      @click="showWin('addFriend')">添加好友</van-button>
          <van-button bottom-action
                      @click="showWin('addFlock')">添加群聊</van-button>
        </ul>
      </div>
    </transition>
    <router-view></router-view>
    <van-tabbar v-model="active"
                @change='tabChange'>
      <van-tabbar-item icon="chat">
        <span>消息</span>
      </van-tabbar-item>
      <van-tabbar-item icon="contact">
        <span>好友</span>
      </van-tabbar-item>
      <van-tabbar-item icon="pending-orders">
        <span>博文</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting">
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
    <van-popup v-model="addPoput"
               class="layout-add_poput"
               position="top">
      <h2 class="add-poput_title">请输入{{poputName}}</h2>
      <van-cell-group>
        <van-field v-model="userNumber"
                   :label="poputName + ':'"
                   icon="clear"
                   placeholder="请输入账号"
                   required
                   @click-icon="userNumber = ''" />
      </van-cell-group>
      <div class="poput-btn_box">
        <div class="btn-box_div">
          <van-button type="primary"
                      v-if="poputName === '好友账号'"
                      @click="getAccount">查找</van-button>
          <van-button type="primary"
                      v-else
                      @click="getGroup">查找</van-button>
          <van-button @click="addPoput = false">取消</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import resource from '@/utils/resource.json'
  import { mapActions, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        active: 0,
        poputName: '好友账号',
        userNumber: '1555555',
        addPoput: false,
        addSocket: false,
        navData: ['message', 'friend', 'blog', 'myPage']
      }
    },
    methods: {
      onClickLeft () {
        console.log(11)
      },
      onClickRight () {
        this.addSocket = !this.addSocket
      },
      layoutClick (e) {
        // console.log('add-socket_div')
        // console.log(event.path)
      },
      showWin (name) {
        this.poputName = name === 'addFriend' ? '好友账号' : '群账号或群名称'
        this.addPoput = true
      },
      getAccount () {
        let data = {
          iphone: this.userNumber
        }
        this.getFriend(data).then(data => {
          // 查找账号信息
          if (!data.data.length) {
            this.$toast.fail({
              position: 'top',
              message: '账号不存在'
            })
            return
          }
          this.addPoput = false
          this.addSocket = false
          this.SET_FRIEND(data.data[0])
          resource.header.addFriend = '添加好友'
          this.$router.push({
            path: '/addFriend'
          })
        })
      },
      getGroup () {
        let paramsData = {
          roomName: this.userNumber
        }
        this.getRoom(paramsData).then(data => {
          // 查找群
          if (!data.data.length) {
            this.$toast.fail({
              position: 'top',
              message: '群名称不存在'
            })
            return
          }
          this.addPoput = false
          this.addSocket = false
          this.SET_GROUP(data.data)
          this.$router.push({
            path: '/roomlist'
          })
        })
      },
      tabChange (val) {
        this.$router.push({
          path: `/${this.navData[val]}`
        })
      },
      pageClose () {
        this.$router.back()
      },
      ...mapMutations([
        'SET_FRIEND',
        'SET_GROUP'
      ]),
      ...mapActions([
        'getFriend',
        'getRoom'
      ])
    },
    computed: {
      headerTitle () {
        // 头部header文字
        return resource.header[this.$route.name]
      },
      navVar () {
        // 判断是否一级页面
        let data = ['消息', '好友', '博文', '我的']
        return data.indexOf(this.headerTitle)
      }
    },
    watch: {
      headerTitle () {
        // 路由跳转 van-nav-bar 组件对应 active
        this.active = this.navData.indexOf(this.$route.name)
        this.addSocket = false
      }
    }
  }
</script>

<style lang='less'>
  .layout {
    .van-nav-bar__title {
      color: #fff;
      background: linear-gradient(left, #2aacf9, #59d7f5);
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#2aacf9),
        to(#59d7f5)
      );
    }

    .layout-add,
    .layout-return {
      font-size: 0.22rem;
      color: #fff !important;
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
    .layout-add_poput {
      top: 20%;
    }
  }
</style>

<style lang='less' scoped>
  .layout-title {
    position: relative;
  }

  .add-socket {
    position: absolute;
    z-index: 112;
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
  .poput-btn_box {
    display: flex;
    justify-content: center;
  }
  .btn-box_div {
    margin-top: 15px;
    margin: 0.2rem 0;
  }
  .add-poput_title {
    text-align: center;
    line-height: 0.5rem;
    margin-bottom: 0.2rem;
  }
</style>
