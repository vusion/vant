/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '按钮',
        icon: 'button',
        description: '按钮用于触发一个操作，如提交表单。',
    })
    export class VanButton extends VueComponent {

        constructor(options?: Partial<VanButtonOptions>) { super(); }
    }

    export class VanButtonOptions {
        @Prop({
            title: '文本',
            description: '按钮文字',
        })
        text: nasl.core.String;

        @Prop({
            title: '颜色类型',
            description: '设置按钮颜色类型',
            setter: {
                type: 'enumSelect',
                titles: ['主要按钮', '次要按钮', '普通按钮', '警告操作按钮', '次要警告操作按钮', '危险操作按钮', '次要危险操作按钮'],
            },
        })
        type: 'info' | 'info_secondary' | 'default' | 'warning' | 'warning_secondary' | 'danger' | 'danger_secondary' = 'info';

        @Prop({
            group: '样式属性',
            title: '细边框',
            description: '边框是否是细边框。',
        })
        hairline: nasl.core.Boolean = false;

        @Prop({
            group: '样式属性',
            title: '尺寸',
            description: '设置尺寸',
            setter: {
                type: 'enumSelect',
                titles: ['大', '中型', '正常', '小', '迷你'],
            },
        })
        size: 'large' | 'middle' | 'normal' | 'small' | 'mini' = 'middle';

        @Prop({
            group: '样式属性',
            title: '形状',
            description: '设置方形形状',
            setter: {
                type: 'enumSelect',
                titles: ['方形', '圆形'],
            },
        })
        squareroud: 'square' | 'round' = 'round';

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '是否禁用。禁用后不会响应点击事件。',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '展示方式',
            description: '展示方式',
            setter: {
                type: 'enumSelect',
                titles: ['行内展示', '块级展示'],
            },
        })
        block: 'spanb' | 'blockb' = 'spanb';

        @Prop({
            title: '图标',
            description: '图标',
            setter: {
                type: 'iconSelect',
            },
        })
        icon: nasl.core.String = '';

        @Prop({
            title: '图标位置',
            description: '设置图标居左或居右显示',
            setter: {
                type: 'enumSelect',
                titles: ['左', '右'],
            },
        })
        iconPosition: 'left' | 'right' = 'left';

        @Prop({
            group: '状态属性',
            title: '加载中',
            description: '是否为加载中。',
        })
        loading: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '加载中文案',
            description: '加载中文案',
        })
        loadingText: nasl.core.String = '';

        @Prop({
            group: '交互属性',
            title: '链接类型',
            description: '链接类型',
            setter: {
                type: 'enumSelect',
                titles: ['页面跳转', '下载链接'],
            },
        })
        linkType: 'destination' | 'download' = 'destination';

        @Prop({
            group: '交互属性',
            title: '链接地址',
            description: '链接地址',
        })
        hrefAndTo: nasl.core.String;

        @Prop({
            group: '交互属性',
            title: '链接打开方式',
            description: '父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
            setter: {
                type: 'enumSelect',
                titles: ['新窗口', '当前窗口', '父级窗口', '顶级窗口'],
            },
        })
        target: '_blank' | '_self' | '_parent' | '_top' = '_self';

        @Prop({
            title: '路由链接',
            description: '需要 vue-router，与`<router-link>`的`to`属性相同。可以是一个字符串或者是描述目标位置的对象。',
        })
        private to: nasl.core.String;

        @Prop({
            title: '替换',
            description: '需要 vue-router，与`<router-link>`的`replace`属性相同。如果为`true`，当点击时，会调用`router.replace()`而不是`router.push()`，于是导航后不会留下`history `记录。',
        })
        private replace: nasl.core.Boolean = false;

        @Prop({
            title: '追加路径',
            description: '需要 vue-router，与`<router-link>`的`append`属性相同。如果为`true`，则在当前路径后追加`to`的路径。',
        })
        private append: nasl.core.Boolean = false;

        @Event({
            title: '点击后',
            description: '点击事件',
        })
        onClick: () => void;
    }
}
