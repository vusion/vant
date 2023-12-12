/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '胶囊',
        icon: 'capsules',
        description: '多项中选择一项',
    })
    export class VanCapsules extends ViewComponent {

        constructor(options?: Partial<VanCapsulesOptions>) { super(); }
    }

    export class VanCapsulesOptions {
        @Prop({
            group: '数据属性',
            title: '选中值',
            description: '当前选中的值',
            sync: true,
            docDescription: '当前选择的值',
        })
        value: nasl.core.Any;

        @Prop({
            group: '交互属性',
            title: '可取消',
            description: '是否可以取消选择',
            docDescription: '是否可以取消选择',
            setter: {
                type: 'switch',
            },
        })
        cancelable: nasl.core.Boolean = false;

        @Prop({
            group: '交互属性',
            title: '可多选',
            description: '是否可以多选',
            docDescription: '是否可以多选',
            setter: {
                type: 'switch',
            },
        })
        multiple: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '只读',
            description: '正常显示，但禁止选择/输入',
            docDescription: '正常显示，但禁止选择或输入。',
            setter: {
                type: 'switch',
            },
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Event({
            title: '选择后',
            description: '选择某一项时触发',
        })
        onSelect: (event: {
          value: nasl.core.Any,
        }) => void;

        @Event({
            title: '改变后',
            description: '选择值改变时触发',
        })
        onChange: (event: {
            value: nasl.core.Any,
        }) => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-capsules-item>`或`<van-capsules-group>`子组件。',
            snippets: [
                {
                    title: '胶囊选项',
                    code: '<van-capsules-item>选项</van-capsules-item>',
                },
                {
                    title: '胶囊选项组',
                    code: '<van-capsules-group><van-capsules-item>选项</van-capsules-item><van-capsules-item>选项</van-capsules-item></van-capsules-group>',
                },
            ],
        })
        slotDefault: () => Array<VanCapsulesItem | VanCapsulesGroup>;
    }

    @Component({
        title: '胶囊选项',
        description: '胶囊选项',
    })
    export class VanCapsulesItem extends ViewComponent {

        constructor(options?: Partial<VanCapsulesItemOptions>) { super(); }
    }

    export class VanCapsulesItemOptions {
        @Prop({
            group: '数据属性',
            title: '值',
            description: '此项的值',
            docDescription: '此项的值',
        })
        value: nasl.core.Any;

        @Prop({
            group: '主要属性',
            title: '标签',
            description: '顶部自定义提示文本',
            docDescription: '顶部自定义提示文本',
        })
        label: nasl.core.String = '';

        @Prop({
            group: '主要属性',
            title: 'flag标志',
            description: '是否右上角有flag标志',
            docDescription: '是否右上角有flag标志',
            setter: {
                type: 'switch',
            },
        })
        flag: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '禁用',
            description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
            setter: {
                type: 'switch',
            },
        })
        disabled: nasl.core.Boolean = false;

        @Slot({
            title: 'undefined',
            description: '插入文本或 HTML。',
        })
        slotDefault: () => Array<ViewComponent>;
    }

    @Component({
        title: '胶囊选项组',
        description: '胶囊选项组',
    })
    export class VanCapsulesGroup extends ViewComponent {

        constructor(options?: Partial<VanCapsulesGroupOptions>) { super(); }
    }

    export class VanCapsulesGroupOptions {


        @Slot({
            title: 'undefined',
            description: '插入`<van-capsules-item>`子组件。',
            snippets: [
                {
                    title: '胶囊选项',
                    code: '<van-capsules-item>选项</van-capsules-item>',
                },
            ],
        })
        slotDefault: () => Array<VanCapsulesItem>;
    }
}
