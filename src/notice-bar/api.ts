/// <reference types="nasl" />

namespace nasl.ui {
  @Component({
    title: '通知栏',
    icon: 'notice-bar',
    description: '用于循环播放展示一组消息通知。'
  })
  export class VanNoticeBar extends ViewComponent {
    constructor(options?: Partial<VanNoticeBarOptions>) {
      super();
    }
  }
  export class VanNoticeBarOptions {
    @Prop({
      title: '通知文本内容',
      description: '通知文本内'
    })
    private text: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '类型',
      description: '设置通知栏类型',
      setter: {
        type: 'enumSelect',
        options: [{
          title: '可关闭'
        }, {
          title: '链接'
        }, {
          title: '普通'
        }]
      }
    })
    mode: 'closeable' | 'link' | 'normal' = 'normal';
    @Prop({
      group: '主要属性',
      title: '开启滚动播放',
      setter: {
        type: 'switch'
      }
    })
    scrollable: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '开启文本换行',
      description: '关闭滚动播放时该属性即可生效',
      setter: {
        type: 'switch'
      }
    })
    wrapable: nasl.core.Boolean = false;
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
    @Event({
      title: '点击通知栏时触发',
      description: '点击通知栏时触发'
    })
    onClick: (event: {
      stopPropagation: () => void;
      preventDefault: () => void;
    }) => void;
    @Event({
      title: '关闭通知栏时触发',
      description: '关闭通知栏时触发'
    })
    onClose: () => void;
    @Event({
      title: '点击链接',
      description: '点击链接'
    })
    onRout: () => void;
    @Slot({
      title: 'undefined',
      description: '文本插槽'
    })
    slotDefault: () => Array<ViewComponent>;
  }
}