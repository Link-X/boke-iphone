<template>
  <div class="add-friend">
    <div class="add-friend_title">
      <div class="friend-title_left">
        <span>账号:</span>
        <span>用户名:</span>
      </div>
      <div class="friend-title_img">
        <img src="../../../static/toxiang.png">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    created () {
      console.log(this.friend, 111)
    },
    ...mapGetters([
      'friend'
    ])
  }
}
</script>

<style lang='less'>
  .add-friend {

  }
</style>
