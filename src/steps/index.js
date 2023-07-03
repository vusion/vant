import { createNamespace } from '../utils';
import { ParentMixin } from '../mixins/relation';
import DataSourceMixin from '../mixins/support.datasource';

const [createComponent, bem] = createNamespace('steps');

export default createComponent({
  mixins: [ParentMixin('vanSteps'), DataSourceMixin],

  props: {
    activeColor: String,
    inactiveColor: String,
    active: {
      type: [Number, String],
      default: 0,
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
  },

  data() {
    return {
      value: this.active,
    };
  },

  computed: {
    inDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
  },
  watch: {
    active(val) {
      this.value = val;
      this.$emit('changestep');
    },
  },

  methods: {
    // 有数据源
    renderDataSource() {
      return this.currentDataSource?.data?.map((item, idx) => {
        return this.slots('item', { item, mantle: idx > 0 && this.inDesigner });
      });
    },

    renderNormal() {
      return this.slots();
    },
  },

  render() {
    return (
      <div class={bem([this.direction])}>
        <div
          class={bem('items')}
          child-cut-disabled={this.dataSource !== undefined} // 子项不可被删除操作
        >
          {this.dataSource !== undefined
            ? this.renderDataSource()
            : this.renderNormal()}

          {!this.slots() &&
            this.dataSource === undefined &&
            this.inDesigner && (
              <div style="text-align: center;width:100%">
                请绑定数据源或插入子节点
              </div>
            )}
        </div>
      </div>
    );
  },
});
