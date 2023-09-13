import type { Meta, StoryObj } from '@storybook/vue';
import type { Component } from 'vue';
import { parseApiYaml } from '../utils/parseYaml';
// 样式
import '@/row/index.less';
// 组件
import Row from '@/row/index';
import Col from '@/col/index';

import api from '@/row/api.yaml';

// import { Primary as PrimaryCol } from '../col/index.stories';

const { argTypes, args } = parseApiYaml(api);

const meta = {
  title: '布局/栅格布局',
  // component: Row as Component,
  tags: ['autodocs'],
  argTypes,
} satisfies Meta<typeof Row>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  name: '全部配置',
  render: (args, { argTypes }) => ({
    components: { Row, Col },
    props: Object.keys(argTypes),
    template: `<Row v-bind="$props">
      <Col span="12" style="height: 50px; background: green;">
      </Col>
      <Col span="12" style="height: 50px; background: red;">
      </Col>
    </Row>`,
  }),
  args: {
    ...args,
  }
};
