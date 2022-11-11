module.exports = [
  {
    id: 0,
    title: '主题样式设置',
    toPosition: 'quickSetting',
    items: [
      {
        id: 1,
        title: '主题颜色',
        name: 'color-style',
        toPosition: 'colorStyle',
        type: [],
        cssProperty: {},
        preview: {
          template:
            '<div style="height:100%;background: #F7F8FA;">\n<u-text :class="[$style.areaTitle, $style.base]">主题颜色预览</u-text><br>\n        <div :class="[$style.sectionTitle, $style.base]" style="margin: 16px 0;">以按钮组件为例</div>\n<van-button style="margin: 10px;" type="info">确定</van-button><van-button style="margin: 10px;" type="primary">确定</van-button><van-button style="margin: 10px;" type="danger">确定</van-button><van-button type="warning" style="margin: 10px;">确定</van-button><van-button disabled type="default" style="background-color: var(--brand-disabled);margin: 10px;">确定</van-button>\n',
        },
      },
      {
        id: 2,
        title: '导航',
        name: 'nav-bar',
        toPosition: 'navBar',
        type: [],
        cssProperty: {},
        preview: {
          template:
            ' <div style="height:100%;background: #F7F8FA;">\n        <u-text :class="[$style.areaTitle, $style.base]">视觉风格预览</u-text><br>\n        <div>\n            <div :class="[$style.sectionTitle, $style.base]" style="margin: 16px 0;">顶部导航</div>\n            <u-navbar style="margin-bottom: 16px;">\n                <u-navbar-item slot="left">应用名称</u-navbar-item>\n                <u-navbar-item>菜单项 1</u-navbar-item>\n                <u-navbar-item>菜单项 2</u-navbar-item>\n            </u-navbar>\n        </div>\n        <div>\n            <div :class="[$style.sectionTitle, $style.base]" style="margin: 16px 0;">侧边导航</div>\n            <u-sidebar value="1" :router="false">\n                <u-sidebar-item value="1">菜单项 1</u-sidebar-item>\n                <u-sidebar-item value="2">菜单项 2</u-sidebar-item>\n                <u-sidebar-item value="3">菜单项 3</u-sidebar-item>\n            </u-sidebar>\n        </div>\n        <div :class="$style.table">\n            <div :class="[$style.sectionTitle, $style.base]" style="margin: 0 0 16px;">表单</div>\n            <u-form layout="inline" label-size="auto" style="background:white;padding: 8px;">\n                <u-grid-layout>\n                    <u-grid-layout-row :repeat="1">\n                        <u-grid-layout-column>\n                            <div style="height: 36px;line-height:36px;background: var(--background-color-base);text-indent: 15px;">标题</div>\n                        </u-grid-layout-column>\n                    </u-grid-layout-row>\n                </u-grid-layout>\n                <u-grid-layout gap="normal none">\n                    <u-grid-layout-row :repeat="2">\n                        <u-grid-layout-column style="padding-right: 12px;">\n                            <u-form-item label="名称" style="margin-bottom: var(--space-base);width: 100%;">\n                                <u-input maxlength="20" placeholder="请输入" style="border-radius: var(--border-radius-base);border-color: var(--border-color-base);"></u-input>\n                            </u-form-item>\n                        </u-grid-layout-column>\n                        <u-grid-layout-column style="padding-left: 12px;">\n                            <u-form-item label="名称" style="margin-bottom: var(--space-base);width: 100%;">\n                                <u-input maxlength="20" placeholder="请输入" style="border-radius: var(--border-radius-base);border-color: var(--border-color-base);"></u-input>\n                            </u-form-item>\n                        </u-grid-layout-column>\n                    </u-grid-layout-row>\n                </u-grid-layout>\n            </u-form>\n        </div>\n    </div>',
          style:
            '.base {\n    font-family: PingFang SC;\n    font-style: normal;\n    font-weight: normal;\n}\n\n.areaTitle {\n    width: 108px;\n    height: 18px;\n    font-size: 18px;\n    line-height: 18px;\n    color: #333333;\n}\n\n.sectionTitle {\n    width: 320px;\n    height: 24px;\n    font-size: 14px;\n    line-height: 24px;\n    color: #666666;\n}\n\n.table {\n    margin-top: 16px;\n}\n\n.table [class^="u-form_item_label"] {\n    padding-right: 12px !important;\n    height: 14px;\n    font-family: PingFang SC;\n    font-style: normal;\n    font-weight: normal;\n    font-size: 14px;\n    line-height: 14px;\n    color: #999999;\n}\n\n.table [class^="u-form_item_field__"] {\n    width: calc(100% - 40px);\n}',
        },
      },
      {
        id: 3,
        title: '字体',
        name: 'font',
        toPosition: 'font',
        type: [],
        cssProperty: {},
        preview: {
          template:
            '<div style="height:100%;background: #F7F8FA;">\n    <u-text :class="[$style.areaTitle, $style.base]">字体预览\n        <u-icon-tooltip placement="right" style="font-size:12px;vertical-align: 2px;">若您未安装对应字体，则无法预览、使用</u-icon-tooltip>\n    </u-text><br>\n    <div :class="$style.section">\n        <van-text :class="[$style.sectionTitle, $style.base]" style="margin-bottom:4px;">文本</van-text><br>\n        <u-text :class="$style.base" style="font-family: var(--font-family-zh-CN);font-size: var(--font-size-base);line-height: 22px;color: var(--color-base);">\n                您可以在此看到字体预览效果。\n        </u-text>\n        <u-link>超链接</u-link>\n        <u-text :class="[$style.sectionTitle, $style.base]" style="margin-bottom:4px;margin-top:16px;">Text</u-text><br>\n        <u-text :class="$style.base" style="font-family: var(--font-family-zh-CN);font-size: var(--font-size-base);line-height: 22px;color: var(--color-base);">\n                You can preview the font here.\n        </u-text>\n        <van-link>Link</van-link>\n    </div>\n</div>',
          style:
            '.base {\n    font-family: PingFang SC;\n    font-style: normal;\n    font-weight: normal;\n}\n\n.areaTitle {\n    width: 108px;\n    height: 18px;\n    font-size: 18px;\n    line-height: 18px;\n    color: #333333;\n}\n\n.section {\n    margin: 16px 0 32px 0;\n}\n\n.sectionTitle {\n    display: inline-block;\n    width: 320px;\n    height: 24px;\n    margin-bottom: 16px;\n    font-size: 14px;\n    line-height: 24px;\n    color: #666666;\n}',
        },
      },
    ],
  },
  {
    id: 0.1,
    title: '高级设置',
    toPosition: 'highLevelSetting',
    items: [],
  },
  {
    id: 0.2,
    title: '标签页设置',
    toPosition: 'tabStyle',
    items: [],
  },
];
