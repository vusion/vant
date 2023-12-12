/// <reference types="nasl" />

namespace nasl.ui {
  @Component({
    title: '选择器',
    icon: 'picker',
    description: '提供多个选项集合供用户选择，支持单列选择和多列级联。'
  })
  export class VanPickerson<T, V, M extends boolean, P extends boolean> extends ViewComponent {
    constructor(options?: Partial<VanPickersonOptions<T, V, M, P>>) {
      super();
    }
    @Method({
      title: 'undefined',
      description: '重新加载数据'
    })
    reload(): void {}
  }
  export class VanPickersonOptions<T, V, M extends boolean, P extends boolean> {
    @Prop({
      title: '左侧标题',
      description: '左侧标题'
    })
    private labelField: nasl.core.String;
    @Prop({
      title: '默认选中项的索引',
      description: '默认选中项的索引',
      setter: {
        type: 'numberInput'
      }
    })
    private defaultIndex: nasl.core.Decimal = 0;
    @Prop({
      title: '是否使用新版外观',
      setter: {
        type: 'switch'
      }
    })
    isNew: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识选择器的值',
      sync: true
    })
    value: M extends true ? nasl.collection.List<V> : V;
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      designerValue: [{}, {}, {}, {}, {}, {}]
    })
    dataSource: nasl.collection.List<T>;
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '集合类型每一元素的数据类型'
    })
    dataSchema: T;
    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '选项值的字段名'
    })
    valueField: (item: T) => V;
    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '选项文本的字段名'
    })
    textField: (item: T) => nasl.core.String;
    @Prop<VanPickersonOptions<T, V, M, P>, 'pageSize'>({
      group: '数据属性',
      title: '默认每页条数',
      setter: {
        type: 'numberInput',
        min: 10
      },
      if: _ => _.pageable === true
    })
    pageSize: nasl.core.Decimal = 50;
    @Prop({
      group: '数据属性',
      title: '初始化排序规则',
      description: '设置数据初始化时的排序字段和顺序规则'
    })
    sorting: {
      field: nasl.core.String;
      order: nasl.core.String;
    } = {
      field: '',
      order: 'desc'
    };
    @Prop<VanPickersonOptions<T, V, M, P>, 'matchMethod'>({
      group: '数据属性',
      title: '匹配方法',
      description: '设置过滤时的匹配方法',
      setter: {
        type: 'enumSelect',
        options: [{
          title: '包括'
        }, {
          title: '匹配开头'
        }, {
          title: '匹配结尾'
        }]
      },
      if: _ => _.filterable === true
    })
    matchMethod: 'includes' | 'startsWith' | 'endsWith' = 'includes';
    @Prop({
      group: '主要属性',
      title: '分页加载更多',
      description: '设置是否分页加载更多',
      setter: {
        type: 'switch'
      }
    })
    pageable: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '列表样式',
      description: '设置列表样式，仅列表展示时支持多选',
      setter: {
        type: 'enumSelect',
        options: [{
          title: '选择器'
        }, {
          title: '列表'
        }]
      }
    })
    type: 'picker' | 'list' = 'picker';
    @Prop({
      group: '主要属性',
      title: '占位提示'
    })
    placeholder: nasl.core.String = '请选择';
    @Prop({
      group: '主要属性',
      title: '工具栏标题'
    })
    title: nasl.core.String = '标题';
    @Prop<VanPickersonOptions<T, V, M, P>, 'confirmButtonText'>({
      group: '主要属性',
      title: '确认按钮文字',
      if: _ => _.isNew === false
    })
    confirmButtonText: nasl.core.String = '确认';
    @Prop<VanPickersonOptions<T, V, M, P>, 'cancelButtonText'>({
      group: '主要属性',
      title: '取消按钮文字',
      if: _ => _.isNew === false
    })
    cancelButtonText: nasl.core.String = '取消';
    @Prop<VanPickersonOptions<T, V, M, P>, 'visibleItemCount'>({
      group: '主要属性',
      title: '可见选项个数',
      description: '设置可见选项个数',
      setter: {
        type: 'numberInput',
        precision: 0
      },
      if: _ => _.type === 'picker'
    })
    visibleItemCount: nasl.core.Integer = 6;
    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置右侧内容的对齐方式',
      setter: {
        type: 'enumSelect',
        options: [{
          title: '左'
        }, {
          title: '中'
        }, {
          title: '右'
        }]
      }
    })
    inputAlign: 'left' | 'center' | 'right';
    @Prop({
      group: '主要属性',
      title: '显示工具栏',
      setter: {
        type: 'switch'
      }
    })
    showToolbar: nasl.core.Boolean = true;
    @Prop({
      group: '交互属性',
      title: '支持筛选',
      description: '设置是否支持筛选，开启将会支持搜索。',
      setter: {
        type: 'switch'
      }
    })
    filterable: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '可多选',
      setter: {
        type: 'switch'
      }
    })
    multiple: nasl.core.Boolean = false;
    @Prop<VanPickersonOptions<T, V, M, P>, 'enableSelectAll'>({
      group: '交互属性',
      title: '全选',
      setter: {
        type: 'switch'
      },
      if: _ => _.multiple === true
    })
    enableSelectAll: nasl.core.Boolean = false;
    @Prop<VanPickersonOptions<T, V, M, P>, 'enableSelectedCount'>({
      group: '交互属性',
      title: '已选中项数',
      description: '是否显示当前已选中项数',
      setter: {
        type: 'switch'
      },
      if: _ => _.multiple === true
    })
    enableSelectedCount: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        type: 'switch'
      }
    })
    closeOnClickOverlay: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '初始加载',
      description: '是否在初始时立即加载',
      setter: {
        type: 'switch'
      }
    })
    initialLoad: nasl.core.Boolean = true;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        type: 'switch'
      }
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        type: 'switch'
      }
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '点击完成按钮时触发',
      description: '回调参数：选中值，选中值对应的索引'
    })
    onConfirm: (event: M extends true ? nasl.collection.List<V> : V) => void;
    @Event({
      title: '点击取消按钮时触发',
      description: '回调参数：选中值，选中值对应的索引'
    })
    onCancel: () => void;
    @Event({
      title: '选项改变时触发',
      description: '回调参数：Picker 实例，选中值，选中值对应的索引'
    })
    onChange: () => void;
    @Slot({
      title: 'undefined',
      description: '插入`<van-picker-action-slot>`子组件',
      snippets: [{
        title: '事件插槽',
        code: '<van-picker-action-slot target-method="confirm"></van-picker-action-slot>'
      }]
    })
    slotDefault: () => Array<VanPickerActionSlot>;
    @Slot({
      title: 'option'
    })
    slotOption: (current: Current<T>) => Array<ViewComponent>;
  }
}
