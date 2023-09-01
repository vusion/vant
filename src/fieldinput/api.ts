/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '单行输入',
        icon: 'input',
        description: '基本的表单输入组件',
    })
    export class VanFieldinput extends VueComponent {


        @Method({
            title: 'undefined',
            description: '让输入框获取焦点。',
        })
        focus(): void {}

        @Method({
            title: 'undefined',
            description: '让输入框失去焦点。',
        })
        blur(): void {}

        @Method({
            title: 'undefined',
            description: '清空输入框。',
        })
        clear(): void {}
        constructor(options?: Partial<VanFieldinputOptions>) { super(); }
    }

    export class VanFieldinputOptions {
        @Prop({
            title: '类型',
            description: '输入框的类型',
            setter: {
                type: 'enumSelect',
                titles: ['文本', '密码', '整数', '随机整数', '小数', '身份证'],
            },
        })
        type: 'text' | 'password' | 'integer' | 'rndinteger' | 'point' | 'card' = 'text';

        @Prop({
            title: '值',
            description: '输入框的值',
            syncMode: 'both',
        })
        value: nasl.core.String;

        @Prop<VanFieldinputOptions, 'inputstyle'>({
            title: '输入框样式',
            description: '输入框样式',
            setter: {
                type: 'enumSelect',
                titles: ['默认', '格子'],
            },
            onToggle: [
                { update: {maxlength:10000}, if: _ => _ === 'input' },
                { update: {clearable:false,maxlength:6}, if: _ => _ === 'password' },
            ],
        })
        inputstyle: 'input' | 'password' = 'input';

        @Prop<VanFieldinputOptions, 'clearable'>({
            title: '清除按钮',
            description: '开启并在输入框有内容时会显示清除按钮。',
            if: _ => _.inputstyle === 'input',
        })
        clearable: nasl.core.Boolean;

        @Prop<VanFieldinputOptions, 'placeholder'>({
            title: '占位符',
            description: '原生属性',
            if: _ => _.inputstyle === 'input',
        })
        placeholder: nasl.core.String;

        @Prop({
            title: '只读',
            description: '是否只读',
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop<VanFieldinputOptions, 'maxlength'>({
            title: '输入长度',
            description: '为展示美观，可输入的最大长度限制为6',
            setter: {
                type: 'numberInput',
                min: 1,
                max: 6,
            },
            if: _ => _.inputstyle === 'password',
        })
        maxlength: nasl.core.Decimal = 6;

        @Prop({
            title: '键盘样式',
            description: '键盘样式',
            setter: {
                type: 'enumSelect',
                titles: ['默认键盘', '定制键盘'],
            },
        })
        keytheme: 'native' | 'custom' = 'native';

        @Prop<VanFieldinputOptions, 'keyboardTitle'>({
            title: '键盘标题',
            description: '键盘标题',
            if: _ => _.keytheme === 'custom',
        })
        keyboardTitle: nasl.core.String;

        @Prop<VanFieldinputOptions, 'keyboardTheme'>({
            title: '定制键盘布局',
            description: '定制键盘布局',
            setter: {
                type: 'enumSelect',
                titles: ['默认', '右侧栏'],
            },
            if: _ => _.keytheme === 'custom',
        })
        keyboardTheme: 'default' | 'custom' = 'default';

        @Prop<VanFieldinputOptions, 'confirmText'>({
            title: '完成按钮内容',
            description: '设置完成按钮文字内容',
            if: _ => _.keytheme === 'custom',
        })
        confirmText: nasl.core.String = '完成';

        @Prop<VanFieldinputOptions, 'confirmSize'>({
            title: '完成按钮尺寸',
            description: '设置完成按钮大小',
            setter: {
                type: 'enumSelect',
                titles: ['默认', '大号'],
            },
            if: _ => _.keytheme === 'custom' && _.keyboardTheme === 'custom',
        })
        confirmSize: 'default' | 'large' = 'default';

        @Prop({
            title: '前缀图标',
            description: '前缀图标',
            setter: {
                type: 'enumSelect',
                titles: ['搜索', '暂无'],
            },
        })
        private prefix: 'search' | '' = '';

        @Prop({
            title: '后缀图标',
            description: '后缀图标',
            setter: {
                type: 'enumSelect',
                titles: ['搜索', '暂无'],
            },
        })
        private suffix: 'search' | '' = '';

        @Event({
            title: '输入时',
            description: '输入时触发。',
        })
        onInput: () => void;

        @Event({
            title: '改变后',
            description: '值变化时触发。（注意：与原生事件不同）',
        })
        onChange: () => void;

        @Event({
            title: '获得焦点',
            description: '获得焦点时触发。',
        })
        onFocus: () => void;

        @Event({
            title: '失去焦点',
            description: '失去焦点时触发。',
        })
        onBlur: () => void;

        @Event({
            title: '清空后',
            description: '清空后触发。',
        })
        onClear: () => void;

        @Event({
            title: '输入完成时',
            description: '输入完成时后触发。',
        })
        onEnoughkey: () => void;

        @Event({
            title: '点击完成按钮时',
            description: '点击定制键盘完成按钮时触发。',
        })
        onClickConfirm: () => void;


    }
}
