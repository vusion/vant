import type { Meta, StoryObj } from '@storybook/vue';
import type { Component } from 'vue';
import { parseApiYaml } from '../utils/parseYaml';
// 样式
import '@/col/index.less';
// 组件
import Col from '@/col/index';
import api from '@/col/api.yaml';

const { argTypes, args } = parseApiYaml(api);

const meta = {
  title: '布局/栅格列',
  component: Col as Component,
  tags: ['autodocs'],
  argTypes,
} satisfies Meta<typeof Col>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: '全部配置',
  render: (args, { argTypes }) => ({
    components: { Col },
    props: Object.keys(argTypes),
    template: '<Col v-bind="$props"></Col>',
  }),
  args: {
    ...args,
  }
};
