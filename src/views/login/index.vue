<style lang='less' scoped>
  .login {
    width: 100%;
    height: 100%;
    background-color: #1c85c8;
    border: 1px solid #1c85c8;
  }

  .login-header {
    width: 100%;
    height: 1rem;
    text-align: center;
    font-size: 0.25rem;
    color: #fff;
    margin-top: 0.3rem;
  }

  .login-from {
    width: 80%;
    margin: 0 auto;
    border: 1px solid #fff;
    border-radius: 0.1rem;
  }

  .login-from_submit {
    display: block;
    width: 80%;
    height: 0.5rem;
    margin: 0 auto;
    margin-top: 0.3rem;
    border: 1px solid #fff;
    border-radius: 0.1rem;
    background-color: transparent;
    font-size: 0.2rem;
    color: #fff;
  }

  .from-userName-inp {
    background-color: transparent;
  }

  .login-from_ul {
    li {
      height: 0.5rem;
      padding: 0.1rem 0.04rem;
      position: relative;
      display: flex;
      align-items: center;
      input {
        width: 100%;
        height: 100%;
        background-color: transparent;
        padding-left: 0.51rem;
        font-size: 0.2rem;
        color: #fff;
      }
      i {
        position: absolute;
        left: 0.17rem;
        font-size: 0.25rem;
        color: #fff;
      }
    }
  }

  .login-from_userName {
    border-bottom: 1px solid #fff;
  }

  .login-bottom {
    width: 75%;
    height: 0.1rem;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0.5rem;
    margin: 0 auto;
    color: #fff;
    font-size: 0.2rem;
    .login-bottom_link {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin-right: 0.1rem;
      }
      i {
        font-size: 0.25rem;
      }
    }
  }

  .login-achieved {
    // animation: myfirst 5s infinite;
    i {
      font-size: 0.45rem;
      color: #fff;
    }
  }

  @keyframes myfirst {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .login-singIn {
    width: 60%;
    margin: 0 auto;
    margin-top: 2rem;
  }

  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #fff;
    opacity: 1;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #fff;
    opacity: 1;
  }

  input:-ms-input-placeholder {
    color: #fff;
    opacity: 1;
  }

  input::-webkit-input-placeholder {
    color: #fff;
    opacity: 1;
  }
</style>

<template>
  <div class="login">
    <div class="login-header">登录</div>
    <div class="login-from">
      <ul class="login-from_ul">
        <li class="login-from_userName">
          <van-icon name="contact" />
          <input class="from-inp"
                 autocomplete='off'
                 placeholder="输入手机号"
                 v-model="from.iphone" />
        </li>
        <li>
          <van-icon :name="passIcon"
                    @touchstart.native="showPass('10')"
                    @touchend.native="showPass('20')" />
          <input :type="inpType"
                 autocomplete='off'
                 placeholder="输入密码"
                 class="from-inp"
                 v-model="from.password" />
        </li>
      </ul>
    </div>
    <van-button class="login-from_submit"
                type="default"
                @click.native="submit">登录</van-button>

    <div class="login-singIn">
      <van-button class="login-from_submit"
                  @click="singUp">立即注册</van-button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  export default {
    data () {
      return {
        from: {
          iphone: '15555537368',
          password: '12345'
        },
        passIcon: 'password-not-view',
        inpType: 'password'
      }
    },
    methods: {
      submit () {
        let datas = {
          iphone: '登陆账号',
          password: '密码'
        }
        for (let i in this.from) {
          if (!this.from[i]) {
            this.$toast(`${datas[i]} 不能为空`)
          }
        }
        this.logIn(this.from).then(res => {
          if (res) {
            this.SET_ISLOTIN(true)
            let data = {
              userName: res.data[0].userName,
              userId: String(res.data[0].id)
            }
            this.SET_USER(data)
          }
        })
        // this.SET_ISLOTIN(true)
        // this.SET_USER({userName: 'xu', userId: '1'})
      },
      showPass (type) {
        if (type === '10') {
          this.inpType = 'text'
          this.passIcon = 'password-view'
        } else {
          this.inpType = 'password'
          this.passIcon = 'password-not-view'
        }
      },
      singUp () {
        this.$router.push({
          path: '/singUp'
        })
      },
      ...mapActions([
        'logIn'
      ]),
      ...mapMutations([
        'SET_ISLOTIN',
        'SET_USER'
      ])
    }
  }

</script>
