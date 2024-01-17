<template>
  <demo-section>
    <demo-block title="基础用法">
      <van-list-view
        :data-source="data"
      >
        <template #item="current">
          <div style="height: 100px;">{{ current.item }}</div>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--筛选">
      <van-list-view
        :data-source="data"
        :filterable="true"
      >
        <template #item="current">
          <div style="height: 100px;">{{ current.item }}</div>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--下拉刷新">
      <van-list-view
        :data-source="fetchData"
        :pull-refresh="true"
      >
        <template #item="current">
          <div style="height: 100px;">{{ current.item }}</div>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--加载更多">
      <van-list-view
        :data-source="fetchData"
        :pull-refresh="true"
        pageable="auto-more"
        :pageSize="5"
      >
        <template #item="current">
          <div style="height: 100px;">{{ current.item }}</div>
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
  },
  methods: {
    fetchData(params) {
      const { page, size } = params;
      console.log('params', params);
      const data = [1,2,3,4,5,6,7,8,9,10];
      const len = data.length;

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            total: len,
            list: data.slice((page - 1) * size, page * size),
          })
        }, 1000)
      })
    }
  }
}
</script>
