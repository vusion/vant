import { createNamespace, isFunction } from '../utils';
import { formatResult } from '../utils/format/data-source';
import { FieldMixin } from '../mixins/field';
import { ParentMixin } from '../mixins/relation';

const [createComponent, bem] = createNamespace('radio-group');

export default createComponent({
  mixins: [ParentMixin('vanRadio'), FieldMixin],

  props: {
    isNew: Boolean,
    icon: String,
    dataSource: [Array, Object, Function, String],
    value: null,
    disabled: Boolean,
    readonly: Boolean,
    direction: String,
    checkedColor: String,
    iconSize: [Number, String],
    column: {
      type: Number,
    },
  },
  data() {
    return {
      datatemp: this.value || null,
      options: [],
    };
  },
  watch: {
    value(value) {
      this.datatemp = value;
    },
    datatemp(val) {
      this.$emit('input', val);
      this.$emit('update:value', val);
      this.$emit('change', val);
    },
    dataSource: {
      deep: true,
      handler: 'update',
      immediate: true,
    },
  },
  computed: {
    inDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    currentIcon() {
      return this.icon || (this.isNew ? undefined : 'sure');
    },
  },
  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    async update() {
      if (this.ifDesigner() && this.dataSource) {
        this.options = this.dataSource.map((item) => {
          item.disabled = true;
          return item;
        });
      } else if (isFunction(this.dataSource)) {
        try {
          const res = await this.dataSource({
            page: 1,
            size: 1000,
          });
          this.options = formatResult(res);
        } catch (error) {
          console.error(error);
        }
      } else {
        this.options = formatResult(this.dataSource);
      }
    },
  },
  render() {
    // 水平排列时
    let itemWidth = 'auto';
    if (this.column > 0) {
      itemWidth = 100 / this.column + '%';
    }

    return (
      <div class={bem([this.direction])}>
        {this.options?.map((item, index) => (
          <div
            style={{
              position: 'relative',
              width: itemWidth,
            }}
          >
            {this.slots('item', { item, index })}
            {this.inDesigner && index > 0 && <div class="mantle"></div>}
          </div>
        ))}
        {!this.slots() && this.options?.length === 0 && this.inDesigner && (
          <div style="text-align: center;width:100%">
            请绑定数据源或插入子节点
          </div>
        )}
        {this.slots()}
      </div>
    );
    // if (this.dataSource && this.options?.length >= 0) {
    //   return <div class={bem([this.direction])}>
    //     {/* <van-linear-layout direction="horizontal" layout="inline"> */}
    //     {
    //       this.options.map((item, index) => {
    //         const data = {
    //           // style: optionStyle,
    //           attrs: {
    //             role: 'checkbox-wrapthird',
    //           },
    //           class: [
    //           ],
    //           // on: {
    //           //   click: () => {
    //           //     this.onClickItem(index);
    //           //   },
    //           // },
    //         };
    //         return this.slots('item', {item, index});
    //       })
    //     }
    //        {this.slots()}
    //     {/* </van-linear-layout> */}
    //   </div>
    // }
    // return (
    //   <div class={bem([this.direction])} role="radiogroup">
    //     {!this.slots("default") && <div style="text-align: center;width:100%">请绑定数据源或插入子节点</div>}
    //     {this.slots()}
    //     {/* <van-linear-layout direction="horizontal" layout="inline">
    //       {this.slots()}
    //     </van-linear-layout> */}
    //   </div>
    // );
  },
});
