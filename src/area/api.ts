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
            title: '左侧标题',
            description: '左侧标题',
        })
        private labelField: nasl.core.String;

        @Prop({
            title: '是否使用新版外观',
            description: '是否使用新版外观',
            setter: {
                type: 'switch',
            },
        })
        isNew: nasl.core.Boolean = false;

        @Prop({
            group: '数据属性',
            title: '值',
            description: '用于标识地区选择的值',
            syncMode: 'both',
        })
        value: nasl.core.String = '';

        @Prop({
            group: '数据属性',
            title: '数据源',
            description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
        })
        areaListprop: array = {"province_list":{"110000":"北京市"},"city_list":{"110100":"北京市"},"county_list":{"110101":"东城区","110102":"西城区","110105":"朝阳区","110106":"丰台区","110107":"石景山区","110108":"海淀区","110109":"门头沟区","110111":"房山区","110112":"通州区","110113":"顺义区","110114":"昌平区","110115":"大兴区","110116":"怀柔区","110117":"平谷区","110118":"密云区","110119":"延庆区"}};

        @Prop({
            group: '主要属性',
            title: '顶部栏标题',
        })
        title: nasl.core.String = '标题';

        @Prop({
            group: '主要属性',
            title: '确认按钮文字',
        })
        confirmButtonText: nasl.core.String = '确认';

        @Prop({
            group: '主要属性',
            title: '取消按钮文字',
        })
        cancelButtonText: nasl.core.String = '取消';

        @Prop({
            group: '主要属性',
            title: '可见选项个数',
            setter: {
                type: 'numberInput',
            },
        })
        visibleItemCount: nasl.core.Decimal = 6;

        @Prop({
            group: '主要属性',
            title: '显示列数',
            description: '显示列数，3-省市区，2-省市，1-省',
            setter: {
                type: 'numberInput',
            },
        })
        columnsNum: nasl.core.Decimal = 3;

        @Prop({
            group: '主要属性',
            title: '对齐方式',
            description: '设置右侧内容的对齐方式',
            setter: {
                type: 'enumSelect',
                titles: ['左', '中', '右'],
            },
        })
        inputAlign: 'left' | 'center' | 'right' = 'left';

        @Prop({
            group: '主要属性',
            title: '转换器',
            description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
            setter: {
                type: 'enumSelect',
                titles: ['地区名称', '地区码'],
            },
        })
        converter: 'name' | 'code';

        @Prop({
            group: '交互属性',
            title: '点击遮罩层后关闭',
            setter: {
                type: 'switch',
            },
        })
        closeOnClickOverlay: nasl.core.Boolean = false;

        @Prop({
            group: '状态属性',
            title: '只读',
            description: '正常显示，但禁止选择/输入',
            setter: {
                type: 'switch',
            },
        })
        readonly: nasl.core.Boolean = false;

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

        @Slot({
            title: 'undefined',
            description: '插入`<van-picker-action-slot>`子组件',
            snippets: [
                {
                    title: '事件插槽',
                    code: '<van-picker-action-slot target-method="confirm"></van-picker-action-slot>',
                },
            ],
        })
        slotDefault: () => Array<VanPickerActionSlot>;

        @Slot({
            title: 'option',
        })
        slotOption: (current: Current<T>) => Array<VueComponent>;
    }
}
