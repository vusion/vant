import { createNamespace } from '../utils';
import { ParentMixin } from '../mixins/relation';
import DataSourceMixin from '../mixins/support.datasource';

const [createComponent, bem] = createNamespace('steps');

export default createComponent({
  mixins: [ParentMixin('vanSteps'), DataSourceMixin],

  props: {
    iconPrefix: String,
    finishIcon: String,
    activeColor: String,
    inactiveIcon: String,
    inactiveColor: String,
    active: {
      type: [Number, String],
      default: 0,
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    activeIcon: {
      type: String,
      default: 'checked',
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

  render() {
    return (
      <div class={bem([this.direction])}>
        <div class={bem('items')}>
          {this.currentDataSource?.data?.map((item) => {
            return this.slots('item', { item });
          })}

          {/* {this.currentDataSource?.data?.map((item, index) => {
            return (this.inDesigner && index > 0) ? <div class="mantle"></div> : null;
          })} */}

          {!this.slots() && this.options?.length === 0 && this.inDesigner && (
            <div style="text-align: center;width:100%">
              请绑定数据源或插入子节点
            </div>
          )}
          {this.slots()}
        </div>
      </div>
    );
  },
});
