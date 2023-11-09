<template>
  <van-link color="success" text="普通链接" @click="onTap"></van-link>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    onTap() {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    },
  },
};
</script>
