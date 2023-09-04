<template>
  <demo-section>
    <demo-block>
      <div>单行排布</div>

      <van-linear-layout ref="linear1" direction="horizontal" mode="flex" justify="start" alignment="start">
          <van-text :ref="`text2`" text="普通文本"></van-text>
          <van-button :ref="`button1`" type="default" size="middle" text="确定" squareroud="round"></van-button>
      </van-linear-layout>
    </demo-block>

    <demo-block>
      <div>多行排布</div>
      <van-linear-layout direction="vertical">
          <van-linear-layout>
          </van-linear-layout>
          <van-linear-layout>
          </van-linear-layout>
      </van-linear-layout>
    </demo-block>

    <demo-block>
      <div>两端排布</div>

      <van-linear-layout justify="space-between">
        <van-linear-layout>
        </van-linear-layout>
        <van-linear-layout>
        </van-linear-layout>
      </van-linear-layout>
    </demo-block>

  </demo-section>

</template>

<script>
export default {
  mounted() {
    this.$refs.linear1.openLoading()
  }
}
</script>
