/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '多行输入',
        icon: 'textarea',
        description: '多行输入组件',
    })
    export class VanFieldtextarea extends VueComponent {


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
        constructor(options?: Partial<VanFieldtextareaOptions>) { super(); }
    }

    export class VanFieldtextareaOptions {
        @Prop({
            title: '值',
            description: '输入框的值',
            syncMode: 'both',
        })
        value: nasl.core.String;

        @Prop({
            title: '清除按钮',
            description: '开启并在输入框有内容时会显示清除按钮。',
        })
        clearable: nasl.core.Boolean;

        @Prop({
            title: '占位符',
            description: '原生属性',
        })
        placeholder: nasl.core.String;

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

        @Prop<VanFieldtextareaOptions, 'maxlength'>({
            title: '可输入最大字符数',
            description: '输入框内可输入的最大字符数，超过时不支持输入',
            setter: {
                type: 'numberInput',
                placeholder: '不限制',
            },
            onToggle: [
                { update: {'show-word-limit':false}, if: _ => _ === '' },
            ],
        })
        maxlength: nasl.core.Decimal;

        @Prop<VanFieldtextareaOptions, 'showWordLimit'>({
            title: '显示字数统计',
            description: '设置是否显示「可输入最大字符数」的字数统计',
            if: _ => _.maxlength !== '',
        })
        showWordLimit: nasl.core.Boolean;

        @Prop({
            title: '自适应内容高度',
            description: '可输入如{maxHeight:100,minHeight:50}，单位默认为px',
            setter: {
                type: 'input',
                placeholder: '不设置则根据输入内容自适应',
            },
        })
        autosize: nasl.core.Boolean | object;

        @Prop({
            title: '只读',
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            title: '禁用',
        })
        disabled: nasl.core.Boolean = false;

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


    }
}
