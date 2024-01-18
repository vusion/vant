<template>
  <demo-section>
    <demo-block title="基础用法">
      <van-list-view
        :data-source="data"
      >
        <template #item="current">
          <van-cell :is-link="false">
            <template #title>
              <div>{{ current.item }}</div>
            </template>
          </van-cell>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--筛选">
      <van-list-view
        :data-source="data"
        :filterable="true"
      >
        <template #item="current">
          <van-cell :is-link="false">
            <template #title>
              <div>{{ current.item }}</div>
            </template>
          </van-cell>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--下拉刷新">
      <van-list-view
        :data-source="fetchData"
        :pull-refresh="true"
      >
        <template #item="current">
          <van-cell :is-link="false">
            <template #title>
              <div>{{ current.item }}</div>
            </template>
          </van-cell>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--加载更多">
      <van-list-view
        :data-source="fetchData"
        :pull-refresh="true"
        pageable="auto-more"
        :pageSize="20"
      >
        <template #item="current">
          <van-cell :is-link="false">
            <template #title>
              <div>{{ current.item }}</div>
            </template>
          </van-cell>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--斑马纹">
      <van-list-view
        :data-source="data"
        striped
      >
        <template #item="current">
          <van-cell>
            <template #title>
              <div>{{ current.item }}</div>
            </template>
          </van-cell>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--单选">
      <van-list-view
        :data-source="data"
        :value.sync="value"
        selectedIcon="success"
        style="--van-list-view-item-selected-backgroud: red; --van-list-view-item-selected-icon-color: white;"
      >
        <template #item="current">
          <van-cell :is-link="false">
            <template #title>
              <div>{{ current.item }}</div>
            </template>
          </van-cell>
        </template>
      </van-list-view>
    </demo-block>

    <demo-block title="基础用法--多选">
      <van-list-view
        :data-source="data"
        :value.sync="multipleValue"
        multiple
        selectedIcon="success"
        style="--van-list-view-item-selected-backgroud: red; --van-list-view-item-selected-icon-color: white;"
      >
        <template #item="current">
          <van-cell :is-link="false">
            <template #title>
              <div>{{ current.item }}</div>
            </template>
          </van-cell>
        </template>
      </van-list-view>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      data: Array.from({ length: 100 }).map((_, i) => i + 1),
      value: '',
      multipleValue: [],
    }
  },
  methods: {
    fetchData(params) {
      const { page, size } = params;
      console.log('params', params);
      const data = Array.from({ length: 100 }).map((_, i) => i + 1);
      const len = data.length;

      const result = {
        total: len,
        list: data.slice((page - 1) * size, page * size),
      }
      console.log('result', result);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([])
        }, 1000)
      })
    }
  }
}
</script>
