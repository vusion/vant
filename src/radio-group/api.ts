/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '单选组',
        icon: 'radios',
        description: '多项中选择一个时使用',
    })
    export class VanRadioGroup<T, V> extends VueComponent {

        constructor(options?: Partial<VanRadioGroupOptions<T, V>>) { super(); }
    }

    export class VanRadioGroupOptions<T, V> {
        @Prop({
            title: '数据源',
            description: '集合类型变量或者输出参数为集合类型的逻辑',
            designerValue: [{}, {}, {}],
        })
        dataSource: nasl.collection.List<T>;

        @Prop({
            title: '数据类型',
            description: '集合类型每一元素的数据类型',
        })
        dataSchema: T;

        @Prop({
            title: '值',
            description: '当前选择的值',
            syncMode: 'both',
        })
        value: V;

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '只读',
            description: '是否只读',
        })
        readonly: nasl.core.Boolean = false;

        @Prop({
            title: '排列方向',
            description: '排列方向',
            setter: {
                type: 'enumSelect',
                titles: ['水平', '垂直'],
            },
        })
        direction: 'horizontal' | 'vertical' = 'horizontal';

        @Prop<VanRadioGroupOptions<T, V>, 'column'>({
            title: '每行排列数',
            description: '水平排列时每行展示的选项数量',
            if: _ => _.direction === 'horizontal',
        })
        column: nasl.core.Decimal;

        @Event({
            title: '值改变时',
            description: '选择值改变时触发',
        })
        onChange: () => void;

        @Slot({
            title: 'undefined',
            description: '插入`<van-radio>`子组件。',
            emptyBackground: 'add-sub',
            snippets: [
                {
                    title: '单选项',
                    code: '<van-radio name="n"><van-text text="节点"></van-text></van-radio>',
                },
            ],
        })
        slotDefault: () => Array<VanRadio<V>>;

        @Slot({
            title: 'undefined',
            description: '自定义选项的结构和样式',
        })
        slotItem: (current: Current<T>) => Array<VueComponent>;
    }

    @Component({
        title: '单选项',
    })
    export class VanRadio<V> extends VueComponent {

        constructor(options?: Partial<VanRadioOptions<V>>) { super(); }
    }

    export class VanRadioOptions<V> {
        @Prop({
            title: '文本',
            description: '文本',
        })
        private title: nasl.core.String;

        @Prop({
            title: '选中的值',
            description: '选项值',
        })
        name: V;

        @Prop({
            title: '禁用',
            description: '是否禁用',
        })
        disabled: nasl.core.Boolean = false;

        @Prop({
            title: '文本位置',
            description: '文本位置',
            setter: {
                type: 'enumSelect',
                titles: ['右', '左'],
            },
        })
        labelPosition: 'right' | 'left' = 'right';

        @Event({
            title: '点击后',
            description: '点击某一项后触发',
        })
        onClick: () => void;
    }
}
