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
            title: '数据源',
            description: '一个包含字符串或对象的数组',
        })
        dataSource: nasl.collection.List<T>;

        @Prop({
            title: '数据类型',
            description: '组件列表每一项的结构',
        })
        dataSchema: T;

        @Prop({
            title: '每行排列项数',
            description: '为空时自适应宽度，自动换行',
        })
        colnum: nasl.core.Decimal = 5;

        @Prop<VanForComponentsOptions<T>, 'wrap'>({
            title: '自动换行',
            description: '是否自动换行，排列项数为空时生效',
            if: _ => _.colnum === 0,
        })
        wrap: nasl.core.Boolean = true;

        @Prop({
            title: '是否均分宽度',
            description: '是否均分宽度，排列项数不为空时生效',
        })
        equalWidth: nasl.core.Boolean = true;

        @Slot({
            title: 'undefined',
            description: '内容自定义',
        })
        slotDefault: () => Array<VueComponent>;
    }
}
