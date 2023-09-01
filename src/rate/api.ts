/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '评分',
        icon: 'rate',
        description: '用于对事物进行评级操作。',
    })
    export class VanRate extends VueComponent {

        constructor(options?: Partial<VanRateOptions>) { super(); }
    }

    export class VanRateOptions {
        @Prop({
            title: '当前分值',
            syncMode: 'both',
        })
        value: nasl.core.Decimal;

        @Prop({
            title: '图标总数',
        })
        count: nasl.core.Integer = 5;

        @Prop({
            title: '图标大小(px)',
        })
        size: nasl.core.Decimal = 20;

        @Prop({
            title: '图标间距',
        })
        gutter: nasl.core.Integer = 4;

        @Prop({
            title: '选中时的颜色',
        })
        color: nasl.core.String;

        @Prop({
            title: '未选中时的颜色',
        })
        voidColor: nasl.core.String;

        @Prop({
            title: '禁用时的颜色',
        })
        disabledColor: nasl.core.String;

        @Prop({
            title: '选中时的图标名称或图片链接',
            setter: {
                type: 'iconSelect',
            },
        })
        icon: nasl.core.String;

        @Prop({
            title: '未选中时的图标名称或图片链接',
            setter: {
                type: 'iconSelect',
            },
        })
        voidIcon: nasl.core.String;

        @Prop({
            title: '半选',
        })
        allowHalf: nasl.core.Boolean = false;

        @Prop({
            title: '只读',
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            title: '禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '分值变化时',
            description: '分值变化时',
        })
        onChange: () => void;
    }
}
