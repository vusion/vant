/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '表单',
        icon: 'form',
        description: '具有数据收集、校验和提交功能的表单，包含输入框、选择框、复选框、单选框等元素。',
    })
    export class VanForm extends VueComponent {


        @Method({
            title: 'undefined',
            description: '验证表单，支持传入 name 来验证单个或部分表单项',
        })
        validate(): void {}
        constructor(options?: Partial<VanFormOptions>) { super(); }
    }

    export class VanFormOptions {
        @Prop({
            title: '标签对齐方式',
            description: '标签对齐方式',
            setter: {
                type: 'enumSelect',
                titles: ['左', '中', '右'],
            },
        })
        private labelAlign: 'left' | 'center' | 'right' = 'left';

        @Prop({
            title: '输入框对齐方式',
            description: '输入框对齐方式',
            setter: {
                type: 'enumSelect',
                titles: ['左', '中', '右'],
            },
        })
        private inputAlign: 'left' | 'center' | 'right' = 'left';

        @Event({
            title: '验证通过',
            description: '提交表单且验证通过后触发',
        })
        onSubmit: () => void;

        @Event({
            title: '验证不通过',
            description: '提交表单且验证不通过后触发',
        })
        onFailed: () => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-field>`子组件。',
            emptyBackground: 'add-sub-large',
            snippets: [
                {
                    title: '表单项',
                    code: '<van-field drole="other"><template #title><van-text text="表单项"><van-text></template><template #input></template></van-field>',
                },
            ],
        })
        slotDefault: () => Array<VanField>;
    }

    @Component({
        title: '表单项',
    })
    export class VanField extends VueComponent {

        constructor(options?: Partial<VanFieldOptions>) { super(); }
    }

    export class VanFieldOptions {
        @Prop({
            title: '表单项值',
            description: '表单项值',
            syncMode: 'both',
        })
        private value: nasl.core.Any = '';

        @Prop({
            title: '提交表单的标识符',
            description: '提交表单的标识符',
        })
        private name: nasl.core.String;

        @Prop({
            title: '输入框类型',
            description: 'input输入框类型',
            setter: {
                type: 'enumSelect',
                titles: ['text', 'number', 'password', 'textarea', 'digit', 'tel'],
            },
        })
        private type: 'text' | 'number' | 'password' | 'textarea' | 'digit' | 'tel' = 'text';

        @Prop({
            title: '标签名称',
            description: '输入框左侧文本',
        })
        private label: nasl.core.String = '表单项';

        @Prop({
            title: '标签大小',
            description: '输入框左侧文本大小',
            setter: {
                type: 'enumSelect',
                titles: ['正常', '大'],
            },
        })
        private size: '-' | 'large' = '-';

        @Prop({
            title: '输入框占位提示文字',
        })
        private placeholder: nasl.core.String;

        @Prop({
            title: '必填标记',
        })
        required: nasl.core.Boolean = false;

        @Prop({
            title: '验证规则',
            description: '验证规则。简写格式为字符串类型，完整格式或混合格式为数组类型',
        })
        rules: nasl.core.String | Array;

        @Prop({
            title: '是否显示底边框',
            description: '是否显示底边框',
        })
        border: nasl.core.Boolean = true;

        @Slot({
            title: 'undefined',
            description: '插入自定义输入框',
        })
        slotInput: () => Array<VueComponent>;
    }
}
