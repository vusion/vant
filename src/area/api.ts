/// <reference types="nasl" />

namespace nasl.ui {
    @Component({
        title: '地区选择',
        icon: 'region-select',
        description: '省市区三级联动选择',
    })
    export class VanArea<T, V, C extends string> extends VueComponent {

        constructor(options?: Partial<VanAreaOptions<T, V, C>>) { super(); }
    }

    export class VanAreaOptions<T, V, C extends string> {
        @Prop({
            title: '值',
            description: '当前选中的省市区code',
            syncMode: 'both',
        })
        value: C extends 'json' ? V : nasl.core.String;

        @Prop({
            title: '左侧标题',
            description: '左侧标题',
        })
        private labelField: nasl.core.String;

        @Prop({
            title: '数据源(默认全部)',
            description: '一个包含字符串或对象的数组',
        })
        areaListprop: nasl.collection.List<T>;

        @Prop({
            title: '顶部栏标题',
            description: '顶部栏标题',
        })
        title: nasl.core.String = '标题';

        @Prop({
            title: '确认按钮文字',
            description: '确认按钮文字',
        })
        confirmButtonText: nasl.core.String = '确认';

        @Prop({
            title: '取消按钮文字',
            description: '取消按钮文字',
        })
        cancelButtonText: nasl.core.String = '取消';

        @Prop({
            title: '可见选项个数',
            description: '可见选项个数',
        })
        visibleItemCount: nasl.core.Decimal = 6;

        @Prop({
            title: '显示列数',
            description: '显示列数，3-省市区，2-省市，1-省',
        })
        columnsNum: nasl.core.Decimal = 3;

        @Prop({
            title: '右侧内容对齐方式',
            description: '右侧内容对齐方式',
            setter: {
                type: 'enumSelect',
                titles: ['左', '中', '右'],
            },
        })
        inputAlign: 'left' | 'center' | 'right' = 'left';

        @Prop({
            title: '转换器',
            description: '选择地区名称，返回：浙江省/杭州市/滨江区（不加空格）；选择地区码，返回：330108',
            setter: {
                type: 'enumSelect',
                titles: ['地区名称', '地区码', 'JSON'],
            },
        })
        converter: 'name' | 'code' | 'json';

        @Prop({
            title: '点击遮罩层后关闭',
            description: '是否点击遮罩层后关闭',
        })
        closeOnClickOverlay: nasl.core.Boolean = false;

        @Event({
            title: '点击右上方完成按钮',
            description: '点击右上方完成按钮',
        })
        onConfirm: () => void;

        @Event({
            title: '点击取消按钮时',
            description: '点击取消按钮时',
        })
        onCancel: () => void;

        @Event({
            title: '选项改变时触发',
            description: '选项改变时触发',
        })
        onChange: () => void;
    }
}
