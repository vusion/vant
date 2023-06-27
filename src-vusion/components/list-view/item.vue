<template>
  <div :class="[$style.root, 'list-view-item']"
      :selected="parentVM.multiple ? currentSelected : isSelected"
      :readonly="parentVM.readonly" :readonly-mode="parentVM.readonlyMode"
      :disabled="disabled || parentVM.disabled"
      @click="select"
      v-ellipsis-title="ellipsisTitle"
      :designer="$env.VUE_APP_DESIGNER"
      vusion-slot-name="item">

      <div :class="$style.icon">
        <iconv
          v-if="parentVM.multiple ? currentSelected : isSelected"
          :name="parentVM.selectedIcon" />
        <iconv
          v-else
          :name="parentVM.unselectedIcon" />
      </div>

      <slot>{{ text }}</slot>
  </div>
</template>

<script>
import UListViewItem from 'cloud-ui.vusion/src/components/u-list-view.vue/item.vue';
import Iconv from '../../../src/iconv';

export default {
    name: 'van-list-view-item',
    parentName: 'van-list-view',
    groupName: 'van-list-view-group',
    components: {
      Iconv
    },
    extends: UListViewItem,
}
</script>

<style module>
/* @import 'cloud-ui.vusion/src/components/u-list-view.vue/item.css'; */

.root {
  position: relative;
}

.root:hover {
    /* background: none; */
}

.root .icon {
  position: absolute;
  z-index: 9;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
}
</style>
