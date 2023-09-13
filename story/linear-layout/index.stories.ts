import type { Meta, StoryObj } from '@storybook/vue';
import type { Component } from 'vue';
import { parseApiYaml } from '../utils/parseYaml';
// 样式
import '@/linear-layout/index.less';
// 组件
import LinearLayout from '@/linear-layout/index';
import api from '@/linear-layout/api.yaml';


const { argTypes, args } = parseApiYaml(api);

const meta = {
  title: '布局/线性布局',
  component: LinearLayout as Component,
  tags: ['autodocs'],
  argTypes,
} satisfies Meta<typeof LinearLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: '全部配置',
  render: (args, { argTypes }) => ({
    components: {  LinearLayout },
    props: Object.keys(argTypes),
    template: `<LinearLayout v-bind="$props">
      <LinearLayout style="width: 100px; height: 50px; background: green;">
      </LinearLayout>
      <LinearLayout style="width: 100px; height: 50px; background: red;">
      </LinearLayout>
    </LinearLayout>`,
  }),
  args: {
    ...args,
  }
};
