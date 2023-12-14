/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '数据网格',
    icon: 'grid-view',
    description: '数据网格'
  })
  export class VanGridView<T, V, P extends boolean, M extends boolean> extends ViewComponent {
    constructor(options?: Partial<VanGridViewOptions<T, V, P, M>>) {
      super();
    }
    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载'
    })
    reload(): void {}
  }
  export class VanGridViewOptions<T, V, P extends boolean, M extends boolean> {
    @Prop({
      title: '值',
      description: '当前选择的值',
      sync: true
    })
    private value: nasl.core.Any;
    @Prop({
      title: '文本字段名',
      description: '选项文本的字段名'
    })
    private textField: (item: T) => nasl.core.String;
    @Prop({
      title: '值字段名',
      description: '选项值的字段名'
    })
    private valueField: (item: T) => V;
    @Prop({
      title: '可取消',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private cancelable: nasl.core.Boolean = false;
    @Prop({
      title: '可多选',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private multiple: nasl.core.Boolean = false;
    @Prop({
      title: '筛选清除按钮',
      description: '搜索框是否有清除按钮',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private clearable: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
      designerValue: [{}, {}, {}, {}, {}, {}, {}, {}]
    })
    dataSource: nasl.collection.List<T>;
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明。'
    })
    dataSchema: T;
    @Prop({
      group: '主要属性',
      title: '分页方式',
      description: '设置分页方式',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '不分页'
        }, {
          title: '滚动加载更多'
        }, {
          title: '点击加载更多'
        }]
      }
    })
    pageable: '' | 'auto-more' | 'load-more' = '';
    @Prop({
      group: '主要属性',
      title: '分页大小',
      description: '设置分页大小，单位为px。',
      setter: {
        concept: "NumberInputSetter",
        precision: 0
      }
    })
    pageSize: nasl.core.Integer = 20;
    @Prop({
      group: '主要属性',
      title: '可筛选',
      description: '是否可以过滤（搜索），开启将会显示搜索框。',
      setter: {
        concept: "SwitchSetter"
      }
    })
    filterable: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '后端分页',
      setter: {
        concept: "SwitchSetter"
      }
    })
    remotePaging: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '后端筛选',
      setter: {
        concept: "SwitchSetter"
      }
    })
    remoteFiltering: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '下拉刷新',
      description: '是否开启下拉刷新',
      setter: {
        concept: "SwitchSetter"
      }
    })
    pullRefresh: nasl.core.Boolean = true;
    @Prop({
      group: '交互属性',
      title: '下拉过程中提示文案'
    })
    pullingText: nasl.core.String = '下拉刷新';
    @Prop({
      group: '交互属性',
      title: '释放过程中提示文案'
    })
    loosingText: nasl.core.String = '释放刷新';
    @Prop({
      group: '交互属性',
      title: '刷新成功提示文案'
    })
    successText: nasl.core.String = '已刷新';
    @Prop({
      group: '交互属性',
      title: '展示时长',
      description: '设置刷新成功后提示展示时长，单位为ms。',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    successDuration: nasl.core.Integer = 500;
    @Prop({
      group: '交互属性',
      title: '刷新距离',
      description: '设置触发下拉刷新的距离，单位为px。',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    pullDistance: nasl.core.Decimal = 50;
    @Prop({
      group: '交互属性',
      title: '搜索框占位符',
      description: '搜索框为空时的显示文本'
    })
    placeholder: nasl.core.String = '请输入';
    @Prop({
      group: '状态属性',
      title: '初始加载',
      description: '设置初始时是否立即加载',
      setter: {
        concept: "SwitchSetter"
      }
    })
    initialLoad: nasl.core.Boolean = true;
    @Prop({
      group: '状态属性',
      title: '加载中文案'
    })
    loadingText: nasl.core.String = '加载中...';
    @Prop({
      group: '状态属性',
      title: '是否加载失败',
      description: '手动设置是否加载失败。',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private error: nasl.core.Boolean;
    @Prop({
      group: '状态属性',
      title: '加载失败文案'
    })
    errorText: nasl.core.String = '加载失败，请重试';
    @Prop({
      group: '状态属性',
      title: '暂无数据文案'
    })
    emptyText: nasl.core.String = '暂无数据';
    @Prop({
      group: '样式属性',
      title: '瀑布模式',
      description: '是否开启瀑布模式',
      setter: {
        concept: "SwitchSetter"
      }
    })
    iffall: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '网格数',
      description: '设置每页排列几项',
      setter: {
        concept: "NumberInputSetter"
      }
    })
    col: nasl.core.Integer = 2;
    @Prop({
      group: '状态属性',
      title: '只读',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      setter: {
        concept: "SwitchSetter"
      }
    })
    private disabled: nasl.core.Boolean = false;
    @Event({
      title: '加载后',
      description: '加载时触发'
    })
    onLoad: () => void;
    @Slot({
      title: 'undefined',
      description: '插入<van-cardu />',
      emptyBackground: 'drag-entity-here',
      snippets: [{
        title: '卡片',
        code: '<template #item="current"><van-cardu><template #head><van-text text="标题"></van-text></template><van-text  text="卡片内容"></van-text></van-cardu></template>'
      }]
    })
    slotDefault: () => Array<VanCardu>;
    @Slot({
      title: 'undefined',
      description: '自定义选项的结构和样式'
    })
    slotItem: (current: Current<T>) => Array<ViewComponent>;
  }
}