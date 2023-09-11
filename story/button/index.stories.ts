import type { Meta, StoryObj } from '@storybook/vue';
import type { Component } from 'vue';
import { parseApiYaml } from '../utils/parseYaml';
// 样式
import '@/button/index.less';
// 组件
import Button from '@/button/index';
import api from '@/button/api.yaml';


const info = parseApiYaml(api);

const buttonTypeMapping = {
  '主要按钮': 'info',
  '次要按钮': 'info_secondary',
  '普通按钮': 'default',
  '警告操作按钮': 'warning',
  '次要警告操作按钮': 'warning_secondary',
  '危险操作按钮': 'danger',
  '次要危险操作按钮': 'danger_secondary'
};

const meta = {
  title: '按钮',
  component: Button as Component,
  tags: ['autodocs'],
  argTypes: {
    text: {
      name: '文本',
      description: '按钮文字',
      table: {
        type: {
          summary: 'string',
        }
      }
    },
    type: {
      description: '按钮类型',
      control: { 
        type: 'select',
      },
      options: Object.keys(buttonTypeMapping),
      mapping: buttonTypeMapping,
      table: {
        defaultValue: {
          summary: 'info',
        },
        type: {
          summary: 'string',
        }
      }
    },
    hairline: {
      description: '细边框',
      control: {
        type: 'boolean'
      },
      table: {
        defaultValue: {
          summary: 'false',
        },
        type: {
          summary: 'boolean',
        }
      }
    },
    size: {
      description: '尺寸',
      
    }
  },
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
    text: '按钮',
    type: '主要按钮',
    hairline: false,
  }
};
