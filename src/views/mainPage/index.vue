<template>
  <div class="main-page">
    <component class="main-page_com" :is="manView"></component>
  </div>
</template>

<script>
import layout from '@/views/layout'
import login from '@/views/login'
import { mapGetters } from 'vuex'
export default {
  components: {
    layout,
    login
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ]),
    manView () {
      return this.isLogin ? 'layout' : 'login'
    }
  }
}
</script>

<style lang='less' scoped>
  .main-page, .main-page_com {
    height: 100%;
  }
</style>
