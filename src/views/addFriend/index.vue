<template>
  <div></div>
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

<style>

</style>
