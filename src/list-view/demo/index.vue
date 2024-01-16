<template>
  <demo-section>
    <demo-block title="基础用法">
      <van-list-view :data-source="data">
        <template #item="current">
          <div style="height: 100px;">item</div>
        </template>
      </van-list-view>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      data: [1,2,3,4,5,6,7,8,9,10]
    }
  }
}
</script>
