<template>
  <demo-section>
    <demo-block title="数字格式化">
        <div>value: {{ value.number }}</div>
        <van-text
          :text="value.number"
          :format="{ type: 'number', options: { 'decimal': { 'places': '', 'omit': true }, 'thousandths': false, 'percentage': false, 'unit': { 'type': 'prefix', 'value': '' } } }"></van-text>
    </demo-block>
    <demo-block title="日期格式化">
        <div>value: {{ value.date }}</div>
        <van-text
          :text="value.date"
          :format="{ type: 'date', options: { date: 'YYYY-MM-DD' } }"></van-text>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  data() {
    return {
      value: {
        number: '123213123.001223',
        date: '2023-09-20T07:41:45.174Z',
      }
    }
  },
}
</script>
