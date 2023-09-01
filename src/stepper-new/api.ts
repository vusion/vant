/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '数字输入',
        icon: 'numberh5',
        description: '开关',
    })
    export class VanStepperNew extends VueComponent {

        constructor(options?: Partial<VanStepperNewOptions>) { super(); }
    }

    export class VanStepperNewOptions {
        @Prop({
            title: '值',
            description: '值',
            syncMode: 'both',
        })
        value: nasl.core.Decimal;

        @Prop({
            title: '最小值',
            description: '最小值',
        })
        min: nasl.core.String | nasl.core.Decimal;

        @Prop({
            title: '最大值',
            description: '最大值',
        })
        max: nasl.core.String | nasl.core.Decimal;

        @Prop({
            title: '精度',
            description: '固定显示的小数位数',
        })
        decimalLength: nasl.core.String | nasl.core.Decimal;

        @Prop({
            title: '占位符',
            description: '为空时的占位文本',
        })
        placeholder: nasl.core.String = '请输入';

        @Prop({
            title: '是否显示增加按钮',
            description: '是否显示增加按钮',
        })
        showPlus: nasl.core.Boolean = true;

        @Prop({
            title: '是否显示减少按钮',
            description: '是否显示减少按钮',
        })
        showMinus: nasl.core.Boolean = true;

        @Prop({
            title: '是否禁用增加按钮',
            description: '是否禁用增加按钮',
        })
        disablePlus: nasl.core.Boolean = false;

        @Prop({
            title: '是否禁用减少按钮',
            description: '是否禁用减少按钮',
        })
        disableMinus: nasl.core.Boolean = false;

        @Prop({
            title: '样式风格',
            description: '样式风格',
            setter: {
                type: 'enumSelect',
                titles: ['默认', '圆角'],
            },
        })
        theme: 'fang' | 'round' = 'fang';

        @Prop({
            title: '步长',
            description: '每次点击时改变的值',
        })
        step: nasl.core.String | nasl.core.Decimal = 1;

        @Prop({
            title: '只读',
            description: '是否只读',
        })
        disableInput: nasl.core.Boolean = false;

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '对齐方式',
            description: '样式风格',
            setter: {
                type: 'enumSelect',
                titles: ['左对齐', '居中对齐', '右对齐'],
            },
        })
        align: 'left' | 'center' | 'right' = 'center';

        @Event({
            title: '点击',
            description: '点击时触发',
        })
        onClick: () => void;

        @Event({
            title: '状态切换',
            description: '开关状态切换时触发',
        })
        onChange: () => void;
    }
}
