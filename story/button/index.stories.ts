import type { Meta, StoryObj } from '@storybook/vue';
import type { Component } from 'vue';
import { parseApiYaml } from '../utils/parseYaml';
// 样式
import '@/button/index.less';
// 组件
import Button from '@/button/index';
import api from '@/button/api.yaml';


const { argTypes, args } = parseApiYaml(api);

const meta = {
  title: '展示/按钮',
  component: Button as Component,
  tags: ['autodocs'],
  argTypes,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: '全部配置',
  render: (args, { argTypes }) => ({
    components: {  Button },
    props: Object.keys(argTypes),
    template: '<Button v-bind="$props"></Button>',
  }),
  args: {
    ...args,
    text: '按钮',
    type: '主要按钮',
    hairline: false,
  }
};
