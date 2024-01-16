module.exports = {
  name: 'vant',
  build: {
    skipInstall: ['lazyload'],
    site: {
      publicPath: process.env.PUBLIC_PATH || '/vant/',
    },
    vetur: {
      tagPrefix: 'van-',
    },
  },
  site: {
    defaultLang: 'zh-CN',
    versions: [
      { label: 'v1', link: '/vant/v1/' },
      { label: 'v3', link: '/vant/v3/' },
    ],
    baiduAnalytics: {
      seed: 'ad6b5732c36321f2dafed737ac00002da92f',
    },
    htmlPluginOptions: {
      meta: {
        'docsearch:version': 'v2',
      },
    },
    locales: {
      'zh-CN': {
        title: 'Vant',
        description: '轻量、可靠的移动端组件库',
        logo: 'https://img01.yzcdn.cn/vant/logo.png',
        langLabel: '中文',
        links: [
          {
            logo: 'https://b.yzcdn.cn/vant/logo/weapp.svg',
            url: '/vant-weapp',
          },
          {
            logo: 'https://b.yzcdn.cn/vant/logo/github.svg',
            url: 'https://github.com/youzan/vant',
          },
        ],
        searchConfig: {
          apiKey: '90067aecdaa2c85220e2783cd305caac',
          indexName: 'vant',
          placeholder: '搜索文档...',
          algoliaOptions: {
            facetFilters: ['version:v2'],
          },
          transformData(hits) {
            if (location.hostname === 'vant-contrib.gitee.io') {
              hits.forEach((hit) => {
                if (hit.url) {
                  hit.url = hit.url.replace(
                    'youzan.github.io',
                    'vant-contrib.gitee.io'
                  );
                }
              });
            }
          },
        },
        nav: [
          {
            title: '开发指南',
            items: [
              {
                path: 'home',
                title: '介绍',
              },
              {
                path: 'quickstart',
                title: '快速上手',
              },
              {
                path: 'advanced-usage',
                title: '进阶用法',
              },
              {
                path: 'changelog',
                title: '更新日志',
              },
              {
                path: 'theme',
                title: '定制主题',
              },
              {
                path: 'contribution',
                title: '开发指南',
              },
              {
                path: 'design',
                title: '设计资源',
              },
              {
                path: 'style-guide',
                title: '风格指南',
              },
              {
                path: 'locale',
                title: '国际化',
              },
            ],
          },
          {
            title: '基础组件',
            items: [
              {
                path: 'linear-layout',
                title: 'Linear-Layout 线性布局',
              },
              {
                path: 'button',
                title: 'Button 按钮',
              },
              {
                path: 'cell',
                title: 'Cell 单元格',
              },
              {
                path: 'icon',
                title: 'Icon 图标',
              },
              {
                path: 'iconv',
                title: 'Iconv 图标',
              },
              {
                path: 'image',
                title: 'Image 图片',
              },
              {
                path: 'col',
                title: 'Layout 布局',
              },
              {
                path: 'popup',
                title: 'Popup 弹出层',
              },
              {
                path: 'style',
                title: 'Style 内置样式',
              },
              {
                path: 'toast',
                title: 'Toast 轻提示',
              },
              // {
              //   path: 'copy',
              //   title: 'Copy 复制',
              // },
              // {
              //   path: 'link',
              //   title: 'Link 链接',
              // }
            ],
          },
          {
            title: '表单组件',
            items: [
              {
                path: 'calendar',
                title: 'Calendar 日历',
              },
              {
                path: 'cascader',
                title: 'Cascader 级联选择',
                className: 'hide-in-weapp',
              },
              {
                path: 'checkbox',
                title: 'Checkbox 复选框',
              },
              {
                path: 'checkbox-group',
                title: 'CheckboxGroup 复选组',
              },
              {
                path: 'datetime-picker',
                title: 'DatetimePicker 时间选择',
              },
              {
                path: 'field',
                title: 'Field 输入框',
              },
              {
                path: 'fieldinput',
                title: 'FieldInput 输入框',
              },
              {
                path: 'fieldtextarea',
                title: 'fieldtextarea 输入框',
              },
              {
                path: 'form',
                title: 'Form 表单',
                className: 'hide-in-weapp',
              },
              {
                path: 'number-keyboard',
                title: 'NumberKeyboard 数字键盘',
                className: 'hide-in-weapp',
              },
              {
                path: 'password-input',
                title: 'PasswordInput 密码输入框',
                className: 'hide-in-weapp',
              },
              {
                path: 'picker',
                title: 'Picker 选择器',
              },
              {
                path: 'pickerson',
                title: 'Pickerson 选择器',
              },
              {
                path: 'radio',
                title: 'Radio 单选框',
              },
              {
                path: 'rate',
                title: 'Rate 评分',
              },
              {
                path: 'search',
                title: 'Search 搜索',
              },
              {
                path: 'slider',
                title: 'Slider 滑块',
              },
              {
                path: 'stepper-new',
                title: 'StepperNew 步进器',
              },
              {
                path: 'switch',
                title: 'Switch 开关',
              },
              {
                path: 'uploader',
                title: 'Uploader 文件上传',
              },
              {
                path: 'capsules',
                title: 'Capsules 胶囊',
              },
            ],
          },
          {
            title: '反馈组件',
            items: [
              {
                path: 'action-sheet',
                title: 'ActionSheet 动作面板',
              },
              {
                path: 'dialog',
                title: 'Dialog 弹出框',
              },
              {
                path: 'dropdown-menu',
                title: 'DropdownMenu 下拉菜单',
              },
              {
                path: 'loading',
                title: 'Loading 加载',
              },
              {
                path: 'notify',
                title: 'Notify 消息通知',
              },
              {
                path: 'overlay',
                title: 'Overlay 遮罩层',
              },
              {
                path: 'pull-refresh',
                title: 'PullRefresh 下拉刷新',
                className: 'hide-in-weapp',
              },
              {
                path: 'share-sheet',
                title: 'ShareSheet 分享面板',
              },
              {
                path: 'swipe-cell',
                title: 'SwipeCell 滑动单元格',
              },
            ],
          },
          {
            title: '展示组件',
            items: [
              {
                path: 'badge',
                title: 'Badge 徽标',
                className: 'hide-in-weapp',
              },
              {
                path: 'circle',
                title: 'Circle 环形进度条',
              },
              {
                path: 'collapse',
                title: 'Collapse 折叠面板',
              },
              {
                path: 'count-down',
                title: 'CountDown 倒计时',
              },
              {
                path: 'divider',
                title: 'Divider 分割线',
              },
              {
                path: 'empty',
                title: 'Empty 空状态',
              },
              {
                path: 'image-preview',
                title: 'ImagePreview 图片预览',
                className: 'hide-in-weapp',
              },
              {
                path: 'lazyload',
                title: 'Lazyload 懒加载',
                className: 'hide-in-weapp',
              },
              {
                path: 'list',
                title: 'List 列表',
                className: 'hide-in-weapp',
              },
              {
                path: 'list-view',
                title: 'ListView 列表',
              },
              {
                path: 'for-components',
                title: 'ForComponents 组件列表',
              },
              {
                path: 'notice-bar',
                title: 'NoticeBar 通知栏',
              },
              {
                path: 'popover',
                title: 'Popover 气泡弹出框',
                className: 'hide-in-weapp',
              },
              {
                path: 'popover-item',
                title: 'Popover item',
                className: 'hide-in-weapp',
              },
              {
                path: 'progress',
                title: 'Progress 进度条',
              },
              {
                path: 'skeleton',
                title: 'Skeleton 骨架屏',
              },
              {
                path: 'steps',
                title: 'Steps 步骤条',
              },
              {
                path: 'sticky',
                title: 'Sticky 粘性布局',
              },
              {
                path: 'swipe',
                title: 'Swipe 轮播',
                className: 'hide-in-weapp',
              },
              {
                path: 'tag',
                title: 'Tag 标签',
              },
              {
                path: 'gallery',
                title: 'gallery 画廊',
              },
              {
                path: 'cardu',
                title: 'cardu 卡片',
              },
              {
                path: 'grid-view',
                title: 'grid-view 网格',
              },
            ],
          },
          {
            title: '导航组件',
            items: [
              {
                path: 'grid',
                title: 'Grid 宫格',
              },
              {
                path: 'index-bar',
                title: 'IndexBar 索引栏',
              },
              {
                path: 'nav-bar',
                title: 'NavBar 导航栏',
              },
              {
                path: 'pagination',
                title: 'Pagination 分页',
                className: 'hide-in-weapp',
              },
              {
                path: 'sidebar',
                title: 'Sidebar 侧边导航',
              },
              {
                path: 'tab',
                title: 'Tab 标签页',
              },
              {
                path: 'tabbar',
                title: 'Tabbar 标签栏',
              },
              {
                path: 'tree-select',
                title: 'TreeSelect 分类选择',
              },
            ],
          },
          {
            title: '业务组件',
            items: [
              {
                path: 'address-edit',
                title: 'AddressEdit 地址编辑',
                className: 'hide-in-weapp',
              },
              {
                path: 'address-list',
                title: 'AddressList 地址列表',
                className: 'hide-in-weapp',
              },
              {
                path: 'area',
                title: 'Area 省市区选择',
              },
              {
                path: 'card',
                title: 'Card 商品卡片',
              },
              {
                path: 'contact-card',
                title: 'ContactCard 联系人卡片',
                className: 'hide-in-weapp',
              },
              {
                path: 'contact-edit',
                title: 'ContactEdit 联系人编辑',
                className: 'hide-in-weapp',
              },
              {
                path: 'contact-list',
                title: 'ContactList 联系人列表',
                className: 'hide-in-weapp',
              },
              {
                path: 'coupon-list',
                title: 'Coupon 优惠券',
                className: 'hide-in-weapp',
              },
              {
                path: 'goods-action',
                title: 'GoodsAction 商品导航',
              },
              {
                path: 'submit-bar',
                title: 'SubmitBar 提交订单栏',
              },
              {
                path: 'sku',
                title: 'Sku 商品规格',
                className: 'hide-in-weapp',
              },
            ],
          },
          {
            title: '废弃',
            items: [
              {
                path: 'panel',
                title: 'Panel 面板',
              },
              {
                path: 'switch-cell',
                title: 'SwitchCell 开关单元格',
                className: 'hide-in-weapp',
              },
            ],
          },
        ],
      },
    },
  },
};
