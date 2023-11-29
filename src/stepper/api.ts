/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '步进器',
        icon: 'stepper',
        description: '开关',
    })
    export class VanStepper extends VueComponent {

        constructor(options?: Partial<VanStepperOptions>) { super(); }
    }

    export class VanStepperOptions {
        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识步进器的值',
            syncMode: 'both',
            setter: {
                type: 'numberInput',
            },
        })
        value: nasl.core.Decimal = 1;

        @Prop({
            group: '数据属性',
            title: '最小值',
        })
        min: nasl.core.String, nasl.core.Decimal = 1;

        @Prop({
            group: '数据属性',
            title: '最大值',
        })
        max: nasl.core.String, nasl.core.Decimal;

        @Prop({
            group: '主要属性',
            title: '样式风格',
            description: '设置样式风格',
            setter: {
                type: 'enumSelect',
                titles: ['默认', '圆角'],
            },
        })
        theme: 'fang' | 'round' = 'fang';

        @Prop({
            group: '交互属性',
            title: '禁用增加按钮',
            description: '是否禁用增加按钮',
            setter: {
                type: 'switch',
            },
        })
        disablePlus: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '禁用减少按钮',
            description: '是否禁用减少按钮',
            setter: {
                type: 'switch',
            },
        })
        disableMinus: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '只读',
            description: '正常显示，但禁止选择/输入',
            setter: {
                type: 'switch',
            },
        })
        disableInput: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

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
