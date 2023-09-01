/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '标签',
        icon: 'label',
        description: '用于标记关键词和概括主要内容。',
    })
    export class VanTag extends VueComponent {

        constructor(options?: Partial<VanTagOptions>) { super(); }
    }

    export class VanTagOptions {
        @Prop({
            title: '主题颜色',
            setter: {
                type: 'enumSelect',
                titles: ['默认', '成功', '危险', '警告'],
            },
        })
        type: 'primary' | 'success' | 'danger' | 'warning' = 'primary';

        @Prop({
            group: '样式属性',
            title: '尺寸',
            setter: {
                type: 'enumSelect',
                titles: ['大型', '中型', '小型'],
            },
        })
        size: 'large' | 'medium' | 'small' = 'medium';

        @Prop({
            title: '空心',
        })
        plain: nasl.core.Boolean = false;

        @Prop({
            group: '样式属性',
            title: '圆角',
        })
        round: nasl.core.Boolean = false;

        @Prop({
            title: '标记样式',
        })
        mark: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '可关闭',
        })
        closeable: nasl.core.Boolean = false;

        @Event({
            title: '点击时',
            description: '点击时触发',
        })
        onClick: () => void;

        @Event({
            title: '关闭前',
            description: '点击标签删除图标前触发，使用event.preventDefault可以阻止删除事件触发',
        })
        onBeforeClose: () => void;

        @Event({
            title: '关闭时',
            description: '点击标签删除图标时触发',
        })
        onClose: () => void;
    }
}
