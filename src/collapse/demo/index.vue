<template>
  <demo-section>
  <demo-block :title="t('')">
    <van-collapse :ref="`collapse1`" :value.sync="variable1" :accordion="true">
          <van-collapse-item name="ssss">
              <template #title>
                  <van-text :ref="`text8`" text="标题1"></van-text>
            </template>
              <van-text :ref="`text9`" text="代码是写出来给人看的，附带能在机器上运行"></van-text>
        </van-collapse-item>
          <van-collapse-item :ref="`collapse_item2`" :name="`bbbbbbbbbbbbbbb`">
              <template #title>
                  <van-text :ref="`text10`" text="标题2"></van-text>
            </template>
              <van-text :ref="`text11`" text="代码是写出来给人看的，附带能在机器上运行"></van-text>
        </van-collapse-item>
          <van-collapse-item :ref="`collapse_item3`">
              <template #title>
                  <van-text :ref="`text12`" text="标题3"></van-text>
            </template>
              <van-text :ref="`text13`" text="代码是写出来给人看的，附带能在机器上运行"></van-text>
        </van-collapse-item>
    </van-collapse>
  </demo-block>

  <div>{{ variable1 }}</div>

    <!-- <demo-block :title="t('basicUsage')">
      <van-collapse v-model="active1">
        <van-collapse-item :title="t('title') + 1">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 2">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 3">
          {{ t('text') }}
        </van-collapse-item>
      </van-collapse>
    </demo-block>

    <demo-block :title="t('accordion')">
      <van-collapse v-model="active2" accordion>
        <van-collapse-item :title="t('title') + 1">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 2">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 3">
          {{ t('text') }}
        </van-collapse-item>
      </van-collapse>
    </demo-block>

    <demo-block :title="t('disabled')">
      <van-collapse v-model="active3">
        <van-collapse-item :title="t('title') + 1">
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 2" disabled>
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item :title="t('title') + 3" disabled>
          {{ t('text') }}
        </van-collapse-item>
      </van-collapse>
    </demo-block>

    <demo-block :title="t('titleSlot')">
      <van-collapse v-model="active4">
        <van-collapse-item>
          <template #title>
            {{ t('title') + 1 }}<van-icon name="question-o" />
          </template>
          {{ t('text') }}
        </van-collapse-item>
        <van-collapse-item
          :title="t('title') + 2"
          :value="t('content')"
          icon="shop-o"
        >
          {{ t('text') }}
        </van-collapse-item>
      </van-collapse>
    </demo-block> -->
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      accordion: '手风琴',
      titleSlot: '自定义标题内容',
      text: '代码是写出来给人看的，附带能在机器上运行',
    },
    'en-US': {
      accordion: 'Accordion',
      titleSlot: 'Custom title',
      text: 'Content',
    },
  },

  data() {
    return {
      variable1: 'asfsa',
      active1: [0],
      active2: 0,
      active3: [],
      active4: [],
    };
  },
};
</script>

<style lang="less">
@import '../../style/var';

.demo-collapse {
  .van-icon-question-o {
    margin-left: 5px;
    color: @blue;
    font-size: 15px;
    vertical-align: -3px;
  }
}
</style>
