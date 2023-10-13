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
      { group: 'Container', show: true, name: 'router-view', alias: '子页面' },
      {
        group: 'Container',
        show: false,
        name: 'iframe',
        alias: 'Iframe',
        vusion: true,
      },
      { group: 'Container', show: true, name: 'popup', alias: '弹出层' },
      { group: 'Container', show: true, name: 'collapse', alias: '折叠面板' },
      { group: 'Container', show: true, name: 'cardu', alias: '卡片' },
      {
        group: 'Layout',
        show: true,
        name: 'linear-layout',
        alias: '线性布局',
      },
      {
        group: 'Layout',
        show: true,
        name: 'absolute-layout',
        alias: '自由布局',
        vusion: true,
      },
      { group: 'Layout', show: true, name: 'divider', alias: '分割线' },
      { group: 'Layout', show: true, name: 'cell-group', alias: '单元格' },
      { group: 'Layout', show: true, name: 'row', alias: '栅格' },
      {
        group: 'Navigation',
        show: true,
        name: 'dropdown-menu',
        alias: '下拉菜单',
      },
      { group: 'Navigation', show: true, name: 'sidebar', alias: '侧边导航' },
      { group: 'Navigation', show: true, name: 'tabbar', alias: '标签栏' },
      { group: 'Display', show: true, name: 'button', alias: '按钮' },
      { group: 'Display', show: true, name: 'image', alias: '图片' },
      { group: 'Display', show: true, name: 'swipe', alias: '幻灯片' },
      { group: 'Display', show: true, name: 'tabs', alias: '选项卡' },
      { group: 'Display', show: true, name: 'text', alias: '文本' },
      {
        group: 'Display',
        show: true,
        name: 'link',
        alias: '链接',
        vusion: true,
      },
      { group: 'Display', show: true, name: 'badge', alias: '徽标' },
      { group: 'Display', show: true, name: 'notice-bar', alias: '通知栏' },
      { group: 'Display', show: true, name: 'steps', alias: '步骤条' },
      // { group: 'Display', show: true, name: 'count-down', alias: '倒计时' },
      { group: 'Display', show: true, name: 'count-down-new', alias: '计时器' },
      { group: 'Display', show: true, name: 'iconv', alias: '图标' },
      { group: 'Display', show: true, name: 'tag', alias: '标签' },
      { group: 'Display', show: true, name: 'circle', alias: '环形进度条' },
      { group: 'Display', show: true, name: 'progress', alias: '进度条' },
      { group: 'Effects', show: true, name: 'copy', alias: '复制' },
      {
        group: 'Data',
        show: true,
        name: 'list-view',
        alias: '数据列表',
        vusion: true,
      },
      { group: 'Data', show: true, name: 'for-components', alias: '组件列表' },
      {
        group: 'Data',
        show: true,
        name: 'grid-view',
        alias: '数据网格',
        vusion: true,
      },
      { group: 'Data', show: true, name: 'gallery', alias: '画廊' },
      { group: 'Form', show: true, name: 'form', alias: '表单' },
      { group: 'Form', show: true, name: 'fieldinput', alias: '单行输入' },
      // { group: 'Form', show: true, name: 'u-number-input', alias: '数字输入' },
      { group: 'Form', show: true, name: 'fieldtextarea', alias: '多行输入' },
      { group: 'Form', show: true, name: 'search', alias: '搜索框' },
      { group: 'Form', show: true, name: 'radio-group', alias: '单选组' },
      { group: 'Form', show: true, name: 'switch', alias: '开关' },
      { group: 'Form', show: true, name: 'checkbox-group', alias: '多选组' },
      { group: 'Form', show: true, name: 'stepper', alias: '步进器' },
      { group: 'Form', show: true, name: 'stepper-new', alias: '数字输入' },
      // { group: 'Form', show: true, name: 'number-keyboard', alias: '数字键盘' },
      // { group: 'Form', show: true, name: 'u-capsules', alias: '胶囊' },
      // { group: 'Form', show: true, name: 'u-select', alias: '选择框' },
      { group: 'Form', show: true, name: 'rate', alias: '评分' },
      { group: 'Form', show: true, name: 'slider', alias: '滑块' },
      { group: 'Form', show: true, name: 'uploader', alias: '文件上传' },
      {
        group: 'Selector',
        show: true,
        name: 'pickerson',
        alias: 'picker选择器',
      },
      { group: 'Selector', show: true, name: 'area', alias: '地区选择' },
      { group: 'Selector', show: true, name: 'cascader', alias: '级联选择' },
      {
        group: 'Selector',
        show: true,
        name: 'datetime-picker',
        alias: '时间选择',
      },
      { group: 'Selector', show: true, name: 'calendar', alias: '日期选择' },
      { group: 'Feedback', show: true, name: 'popover', alias: '气泡弹出框' },
      // { group: 'Feedback', show: true, name: 'popover-combination', alias: '气泡弹出框' },
      {
        group: 'Feedback',
        show: true,
        name: 'popup-combination',
        alias: '气泡弹出框',
        vusion: true,
      },
      { group: 'Feedback', show: true, name: 'dialog', alias: '弹出框' },
      {
        group: 'Feedback',
        show: true,
        name: 'swipe-cell',
        alias: '滑动单元格',
      },
      {
        group: 'Feedback',
        show: true,
        name: 'toast',
        alias: '轻提示',
      },
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
          require('./postcss-plugins/px2vw')({
            unitToConvert: 'px',
            viewportWidth: 375,
            propList: ['*'],
            selectorBlackList: ['nov', /^m401$/, /^m404$/],

            landscape: true,
            landscapeUnit: 'vw',
            landscapeWidth: 812,
            // exclude: [/node_modules/],
          }),
        ],
};
