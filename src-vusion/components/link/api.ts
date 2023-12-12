/// <reference types="nasl" />

namespace nasl.ui {
  @Component({
    title: '链接',
    icon: 'link',
    description: '文字超链接'
  })
  export class VanLink extends ViewComponent {
    constructor(options?: Partial<VanLinkOptions>) {
      super();
    }
  }
  export class VanLinkOptions {
    @Prop({
      title: '路由链接',
      description: '需要 vue-router，与`<router-link>`的`to`属性相同。可以是一个字符串或者是描述目标位置的对象。'
    })
    private to: nasl.core.String;
    @Prop({
      title: '替换',
      description: '需要 vue-router，与`<router-link>`的`replace`属性相同。如果为`true`，当点击时，会调用`router.replace()`而不是`router.push()`，于是导航后不会留下`history `记录。',
      setter: {
        type: 'switch'
      }
    })
    private replace: nasl.core.Boolean = false;
    @Prop({
      title: '追加路径',
      description: '需要 vue-router，与`<router-link>`的`append`属性相同。如果为`true`，则在当前路径后追加`to`的路径。',
      setter: {
        type: 'switch'
      }
    })
    private append: nasl.core.Boolean = false;
    @Prop({
      title: '下划线',
      description: '是否显示下划线',
      setter: {
        type: 'switch'
      }
    })
    private decoration: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '文本',
      description: '默认文本显示内容'
    })
    text: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '主题颜色',
      description: '设置链接主题颜色',
      setter: {
        type: 'enumSelect',
        options: [{
          title: '默认'
        }, {
          title: '浅色'
        }, {
          title: '成功色'
        }, {
          title: '警告色'
        }, {
          title: '危险色'
        }]
      }
    })
    color: 'default' | 'light' | 'success' | 'warning' | 'danger' = 'default';
    @Prop({
      group: '主要属性',
      title: '展示方式',
      description: '选择行内或块级展示',
      setter: {
        type: 'enumSelect',
        options: [{
          title: '行内展示'
        }, {
          title: '块级展示，宽度会充满父元素'
        }]
      }
    })
    display: 'inline' | 'block' = 'inline';
    @Prop({
      group: '交互属性',
      title: '链接类型',
      setter: {
        type: 'enumSelect',
        options: [{
          title: '页面跳转'
        }, {
          title: '下载链接'
        }]
      }
    })
    linkType: 'destination' | 'download' = 'destination';
    @Prop({
      group: '交互属性',
      title: '链接地址'
    })
    hrefAndTo: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '打开方式',
      description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
      setter: {
        type: 'enumSelect',
        options: [{
          title: '新窗口'
        }, {
          title: '当前窗口'
        }, {
          title: '父级窗口'
        }, {
          title: '顶级窗口'
        }]
      }
    })
    target: '_blank' | '_self' | '_parent' | '_top' = '_self';
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        type: 'switch'
      }
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '点击后',
      description: '点击某一项后触发'
    })
    onClick: (event: {
      stopPropagation: () => void;
      preventDefault: () => void;
    }) => void;
  }
}