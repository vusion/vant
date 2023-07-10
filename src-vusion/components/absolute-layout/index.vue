<template>
    <div :class="$style.root" v-on="$listeners" vusion-slot-name="default">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'van-absolute-layout',
};
</script>

<style module>
.root {
    position: relative;
    width: 100%;
    height: 300px;
}

.root>* {
    position: absolute !important;
}
/* 在编辑器里禁用 transition，防止位置尺寸变化时候出现延迟 */
.root>[vusion-node-path]{
    transition: none !important;
}
</style>

