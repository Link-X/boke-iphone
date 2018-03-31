<template>
  <div>
    <div class="sing-up_title">
      <span class="sing-up_icon"
        @click="back">
        <van-icon name="arrow-left" />
      </span>
      <span class="sup-title_text">账号注册</span>
    </div>
    <van-cell-group>
      <van-field v-model="singUpData.iphone"
        label="登陆账号"
        placeholder="请输入登陆账号"
        :error-message="singErr.iphone"
        required/>

      <van-field v-model="singUpData.userName"
        label="用户名"
        placeholder="请输入用户名"
        :error-message="singErr.userName"
        required/>

      <van-field v-model="singUpData.password"
        type="passWord"
        label="密码"
        :error-message="singErr.password"
        placeholder="请输入密码"
        required />

      <van-field v-model="singUpData.signature"
        type="textarea"
        label="个性签名"
        rows="3"
        autosize
        placeholder="来一个印象深刻的签名"
        :error-message="singErr.signature"
        required />
    </van-cell-group>

    <div class="sing-up_btn">
      <van-button @click="singUp">立即注册</van-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      singUpData: {
        userName: '',
        password: '',
        iphone: '',
        signature: ''
      },
      singErr: {
        userName: '',
        password: '',
        iphone: '',
        signature: ''
      }
    }
  },
  methods: {
    singUp () {
      this.aganJudeg(() => {
        this.addUser(this.singUpData).then(data => {
          if (data.data.type === 'add') {
            this.$toast('注册成功')
            this.goLogIn()
          } else if (data.data.type === 'exist') {
            this.$toast('登陆账号已存在')
          }
        })
      })
    },
    aganJudeg (callback) {
      // 输入验证
      let reg = /[\u4e00-\u9fa5]/g
      let datas = this.singUpData
      let langJudge = {
        iphone: (datas.iphone.length <= 11 && datas.iphone.length >= 6 && !reg.test(datas.iphone)),
        userName: (datas.userName.length >= 1 && datas.userName.length <= 11),
        password: (datas.password.length <= 11 && datas.password.length >= 6 && !reg.test(datas.password)),
        signature: (datas.signature.length >= 1 && datas.signature.length <= 100)
      }
      let datasName = {
        iphone: '账号需大于6位小于11位不能含有中文',
        userName: '用户名需大于1位小于11位不能含有中文',
        password: '密码必须大于6位小于18位不能含有中文',
        signature: '个性签名必须大于1位小于100位'
      }
      Object.keys(langJudge).forEach(v => {
        if (!langJudge[v]) {
          this.singErr[v] = datasName[v]
        } else {
          this.singErr[v] = ''
        }
      })
      for (let i in this.singErr) {
        if (this.singErr[i]) {
          return
        }
      }
      callback()
    },
    goLogIn () {
      // 登陆
      let logInForm = {
        iphone: this.singUpData.iphone,
        password: this.singUpData.password
      }
      this.logIn(logInForm).then(res => {
        if (res) {
          this.SET_ISLOTIN(true)
          let data = {
            userName: res.data[0].userName,
            userId: String(res.data[0].id)
          }
          this.SET_USER(data)
          this.$router.push({
            path: '/message'
          })
        }
      })
    },
    back () {
      this.$router.back()
    },
    ...mapActions([
      'addUser',
      'logIn'
    ]),
    ...mapMutations([
      'SET_ISLOTIN',
      'SET_USER'
    ])
  }
}
</script>

<style lang='less' scoped>
.sing-up_title {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 0.14rem;
  font-weight: bold;
  position: relative;
}
.sing-up_icon {
  position: absolute;
  left: 15px;
  line-height: 40px;
}
.sing-up_btn {
  width: 95px;
  margin: 0 auto;
  margin-top: 0.2rem;
}
.sup-title_text {
  font-size: 0.14rem;
  text-align: center;
}
</style>
