<template>
  <div :class="$style.root"
      :selected="parentVM.multiple ? currentSelected : isSelected"
      :readonly="parentVM.readonly" :readonly-mode="parentVM.readonlyMode"
      :disabled="disabled || parentVM.disabled"
      :checkbox="parentVM.multiple && parentVM.checkbox"
      @click="select"
      v-ellipsis-title="ellipsisTitle"
      :designer="$env.VUE_APP_DESIGNER"
      vusion-slot-name="item">
      <u-checkbox v-if="parentVM.multiple && parentVM.checkbox"
          :readonly="parentVM.readonly"
          :disabled="disabled || parentVM.disabled"
          :value="currentSelected"
      ></u-checkbox>
      <slot>{{ text }}</slot>
  </div>
</template>

<script>
import UListViewItem from 'cloud-ui.vusion/src/components/u-list-view.vue/item.vue';

export default {
    name: 'van-list-view-item',
    parentName: 'van-list-view',
    groupName: 'van-list-view-group',
    extends: UListViewItem,
}
</script>

<style module>
/* @import 'cloud-ui.vusion/src/components/u-list-view.vue/item.css'; */

.root:hover {
    background: none;;
}
</style>
