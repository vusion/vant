/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '文本',
        icon: 'text',
        description: '用于展示文字或表达式',
    })
    export class VanText extends VueComponent {

        constructor(options?: Partial<VanTextOptions>) { super(); }
    }

    export class VanTextOptions {
        @Prop({
            title: '文本',
            description: '文本内容',
        })
        text: nasl.core.String;

        @Prop({
            title: '颜色',
            description: '设置颜色',
            setter: {
                type: 'enumSelect',
                titles: ['默认', '主要色', '辅助色', '成功色', '警告色', '错误色', '禁用色'],
            },
        })
        color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'disabled' = 'default';

        @Prop({
            title: '尺寸',
            description: '尺寸设置',
            setter: {
                type: 'enumSelect',
                titles: ['小', '正常', '大', '巨大'],
            },
        })
        size: 'small' | 'normal' | 'large' | 'huge' = 'normal';

        @Prop({
            title: '展示方式',
            description: '展示方式',
            setter: {
                type: 'enumSelect',
                titles: ['行内', '块级'],
            },
        })
        display: 'inline' | 'block' = 'inline';

        @Prop({
            title: '隐藏处理',
            description: '文本过长的处理方式',
            setter: {
                type: 'enumSelect',
                titles: ['默认不处理', '多余的文本省略', '强制换行且英文自动添加换行符', '始终不换行'],
            },
        })
        overflow: 'normal' | 'ellipsis' | 'break' | 'nowrap' = 'normal';

        @Event({
            title: '点击后',
            description: '点击此项时触发',
        })
        onClick: () => void;
    }
}
