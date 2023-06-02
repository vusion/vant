const pkg = require('./package.json');

module.exports = {
  version: '>=0.1.1',
  type: 'library',
  name: '@lcap/mobile-ui',
  CamelName: 'vant',
  srcPath: './src-vusion',
  docsPath: './docs-vusion',
  docs: {
    title: '@lcap/mobile-ui组件库',
    logo: '组件库',
    github: 'https://github.com/vusion/vant',
    package: pkg,
    navbar: [
      // { text: '设计语言', to: '/design' },
      { text: '基础组件', to: '/components' },
      { text: '指令和工具', to: '/misc' },
      { text: '布局', to: '/layouts' },
    ],
    components: [
      { group: 'Layout', name: 'linear-layout', alias: '线性布局', vusion: true },
      { group: 'Layout', name: 'row', alias: '栅格布局' },

      { group: 'Navigation', name: 'dropdown-menu', alias: '下拉菜单' },
      { group: 'Navigation', name: 'sidebar', alias: '侧边导航' },
      { group: 'Navigation', name: 'tabbar', alias: '标签栏' },
      
      { group: 'Container', name: 'router-view', alias: '子页面容器' },
      { group: 'Container', name: 'popup', alias: '弹出层' },
      { group: 'Container', name: 'collapse', alias: '折叠面板' },
      { group: 'Container', name: 'cardu', alias: '卡片' },
      { group: 'Container', name: 'swipe-cell', alias: '滑动条' },
      // { group: 'Container', name: 'iframe', alias: 'Iframe', vusion: true },
      
      { group: 'Display', name: 'divider', alias: '分割线' },
      { group: 'Display', name: 'cell-group', alias: '单元格组' },
      { group: 'Display', name: 'button', alias: '按钮' },
      { group: 'Display', name: 'image', alias: '图片展示' },
      { group: 'Display', name: 'swipe', alias: '幻灯片' },
      { group: 'Display', name: 'text', alias: '文本' },
      { group: 'Display', name: 'link', alias: '链接', vusion: true },
      { group: 'Display', name: 'badge', alias: '徽标' },
      { group: 'Display', name: 'notice-bar', alias: '通知栏' },
      { group: 'Display', name: 'steps', alias: '步骤条' },
      // { group: 'Display', name: 'count-down', alias: '倒计时' },
      { group: 'Display', name: 'count-down-new', alias: '计时器' },
      { group: 'Display', name: 'iconv', alias: '图标' },
      { group: 'Display', name: 'tag', alias: '标签' },
      { group: 'Display', name: 'circle', alias: '环形进度条' },
      { group: 'Display', name: 'progress', alias: '进度条' },
      { group: 'Display', name: 'gallery', alias: '画廊' },
      { group: 'Display', name: 'rate', alias: '评分' },
      { group: 'Display', name: 'slider', alias: '滑块' },
      { group: 'Display', name: 'list-view', alias: '数据列表', vusion: true },
      { group: 'Display', name: 'for-components', alias: '组件列表' },
      { group: 'Display', name: 'grid-view', alias: '数据网格', vusion: true },
      
      
      { group: 'Form', name: 'form', alias: '表单' },
      { group: 'Form', name: 'fieldinput', alias: '单行输入' },
      { group: 'Form', name: 'fieldtextarea', alias: '多行输入' },
      { group: 'Form', name: 'search', alias: '搜索框' },
      { group: 'Form', name: 'radio-group', alias: '单选组' },
      { group: 'Form', name: 'switch', alias: '开关' },
      { group: 'Form', name: 'checkbox-group', alias: '多选组' },
      // { group: 'Form', name: 'u-number-input', alias: '数字输入' },
      { group: 'Form', name: 'stepper-new', alias: '数字输入' },
      { group: 'Form', name: 'uploader', alias: '文件上传' },
      
      // { group: 'Form', name: 'number-keyboard', alias: '数字键盘' },
      // { group: 'Form', name: 'u-capsules', alias: '胶囊' },
      // { group: 'Form', name: 'u-select', alias: '选择框' },
      // { group: 'Form', name: 'stepper', alias: '步进器' },
      { group: 'Selector', name: 'tabs', alias: '选项卡' },
      { group: 'Selector', name: 'pickerson', alias: '选择器' },
      { group: 'Selector', name: 'area', alias: '地区选择器' },
      { group: 'Selector', name: 'cascader', alias: '级联选择器' },
      { group: 'Selector', name: 'datetime-picker', alias: '时间选择器' },
      { group: 'Selector', name: 'calendar', alias: '日期选择器' },

      // { group: 'Feedback', name: 'popover', alias: '气泡弹出框' },
      // { group: 'Feedback', name: 'popover-combination', alias: '气泡弹出框' },
      { group: 'Feedback', name: 'popup-combination', alias: '气泡弹出框', vusion: true },
      { group: 'Feedback', name: 'dialog', alias: '弹出框' },

      { group: 'Effects', name: 'copy', alias: '复制' },
      
    ],
    blocks: [],
    directives: [
      // { group: 'Directive', name: 'v-repeat-click' },
      // // { group: 'Directive', name: 'v-click-outside' },
      // { group: 'Directive', name: 'v-ellipsis-title' },
      // { group: 'Directive', name: 'v-focus' },
    ],
    filters: [],
    utils: [
      // { group: 'Utils', name: 'DataSource', alias: '数据源' },
      // { group: 'Utils', name: 'Formatters', alias: '格式器' },
      { group: 'Utils', name: 'dom', alias: 'DOM 相关' },
      { group: 'Utils', name: 'edit', alias: '编辑相关' },
    ],
    layouts: [
      { group: 'Layout', name: 'l-dashboard', alias: '仪表盘布局' },
      { group: 'Layout', name: 'l-document', alias: '文档布局' },
      { group: 'Layout', name: 'l-page', alias: '通用页面布局' },
      { group: 'Layout', name: 'l-side-main', alias: '左侧栏固定布局' },
      { group: 'Layout', name: 'l-left-middle-right', alias: '左中右布局' },
      { group: 'Layout', name: 'l-wrapper', alias: '透传页' },
      { group: 'Layout', name: 'l-root', alias: '界面根节点' },
    ],
  },
  postcss:
    process.env.scene === 'desktop'
      ? []
      : [
          // eslint-disable-next-line global-require
          require('postcss-px-to-viewport')({
            viewportWidth: 375,
            propList: ['*'],
            // propList: ["*"],
            selectorBlackList: ['nov', /^m401$/, /^m404$/],
          }),
        ],
};
