<template>
  <demo-block :title="t('autosize')">
    <!-- <van-field
      rules="pattern(ooo)"
      v-model="value"
      autosize
      rows="1"
      type="input"
      :label="label"
      :placeholder="placeholder"
    />
    <van-button @click="handleClick">1321</van-button>
    <van-field
      ref="field1"
      :required="true"
      drole="other"
      rules="pattern(/123/)"
    >
      <template #input ref="template1">
        <van-fieldinput
          ref="fieldinput2"
          placeholder="请输入"
          :clearable="true"
        ></van-fieldinput>
      </template>
      <template #title ref="template2">
        <van-text ref="text1" text="名称"></van-text>
      </template>
    </van-field> -->
    <!-- rules="pattern(/123/)" -->
    <van-form ref="form1">
      <!-- <van-field ref="field1" :required="true" drole="other" rules="required">
        <template #input ref="template1">
          <van-fieldinput
            ref="fieldinput2"
            placeholder="请输入"
            :clearable="true"
          ></van-fieldinput>
        </template>
        <template #title ref="template2">
          <van-text ref="text1" text="名称"></van-text>
        </template>
      </van-field> -->
      <!-- rules="maxLength(2)" -->
      <van-field ref="field3" :required="true" drole="other" rules="required">
        <template #input ref="template6">
          <van-fieldinput
            ref="fieldinput1"
            placeholder="请输入"
            :clearable="true"
          ></van-fieldinput>
        </template>
        <template #title ref="template7">
          <van-text ref="text3" text="名称"></van-text>
        </template>
      </van-field>
      <!-- <van-field ref="field2" name="radio" drole="other">
        <template #input ref="template3">
          <van-radio-group ref="radio_group1" direction="horizontal">
            <template #default="scope" ref="template4">
              <van-radio ref="radio1" name="1" title="单选框 1"></van-radio>
              <van-radio ref="radio2" name="2" title="单选框 2"></van-radio>
            </template>
          </van-radio-group>
        </template>
        <template #title ref="template5">
          <van-text ref="text2" text="单选框"></van-text>
        </template>
      </van-field> -->
      <div ref="div2" style="margin: 16px 16px 0">
        <van-button
          ref="button1"
          :round="true"
          block="blockb"
          type="info"
          native-type="submit"
          text="提交"
        ></van-button>
      </div>
    </van-form>
  </demo-block>
</template>

<script>
export default {
  data() {
    return {
      label: 'fafd',
      value: 'fdaf',
      placeholder: 'fda'
    };
  },
  methods: {
    handleClick() {
      console.log(this.$refs.field1, 999);
      this.$refs.field1.runRules();
    }
  }
};
</script>
