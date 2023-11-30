/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '组件列表',
        icon: 'forcom',
        description: '组件列表',
    })
    export class VanForComponents<T> extends VueComponent {
        constructor(options?: Partial<VanForComponentsOptions<T>>) { super(); }
    }

    export class VanForComponentsOptions<T> {
        @Prop({
            group: '数据属性',
            title: '数据源',
            description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
            designerValue: [{}, {}, {}],
        })
        dataSource: nasl.collection.List<T>;

        @Prop({
            group: '数据属性',
            title: '数据类型',
            description: '数据源返回的数据结构的类型，自动识别类型进行展示说明。',
        })
        dataSchema: T;

        @Prop({
            group: '主要属性',
            title: '排列项数',
            description: '设置每行排列项数，为空时自适应宽度，自动换行。',
            docDescription: '支持定义每一行排列的项数，为空时会自适应宽度并自动换行。',
            setter: {
                type: 'numberInput',
                min: 0,
            },
        })
        colnum: nasl.core.Decimal = 5;

        @Prop<VanForComponentsOptions<T>, 'wrap'>({
            group: '主要属性',
            title: '自动换行',
            description: '是否自动换行，排列项数为空时生效。',
            setter: {
                type: 'switch',
            },
            if: _ => _.colnum === 0,
        })
        wrap: nasl.core.Boolean = true;

        @Prop({
            group: '主要属性',
            title: '均分宽度',
            description: '是否均分宽度，排列项数不为空时生效。',
            setter: {
                type: 'switch',
            },
        })
        equalWidth: nasl.core.Boolean = true;

        @Slot({
            title: 'undefined',
            description: '内容自定义',
        })
        slotDefault: (current?: Current<T>) => Array<VueComponent>;

        @Slot({
          title: 'undefined',
          description: '内容自定义',
        })
        slotItem: (current: Current<T>) => Array<VueComponent>;
    }
}
