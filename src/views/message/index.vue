<template>
  <div class="message">
    <ul class="message-ul">
      <li class="message-li">
        <van-cell-swipe :right-width="65">
          <van-cell-group>
            <van-cell title="单元格" value="内容" />
          </van-cell-group>
          <span slot="right">删除</span>
        </van-cell-swipe>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
