import { createNamespace } from '../utils';
import { ChildrenMixin } from '../mixins/relation';
import VanEmptyCol from '../emptycol/index';

const [createComponent, bem] = createNamespace('col');

export default createComponent({
  mixins: [ChildrenMixin('vanRow')],
  components: {
    VanEmptyCol,
  },
  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: 'div',
    },
    mode: String,
    align: String,
    alignment: String,
    justify: String,
    direction: {
      type: String,
      default: 'horizontal',
    },
    wrap: {
      type: Boolean,
      default: true,
    },
    gap: String,
  },

  computed: {
    style() {
      const { index } = this;
      const { spaces } = this.parent || {};

      if (spaces && spaces[index]) {
        const { left, right } = spaces[index];
        return {
          paddingLeft: left ? `${left}px` : null,
          paddingRight: right ? `${right}px` : null,
        };
      }
    },
  },

  methods: {
    onClick(event) {
      this.$emit('click', event);
    },
  },

  render() {
    const { span, offset, align, alignment: alignment_, justify, direction, wrap, gap } = this;
    // 向前兼容
    const alignment = alignment_ || align;
    const flex = this.mode === 'flex';
    return (
      <this.tag
        style={this.style}
        class={bem({ [span]: span, [`offset-${offset}`]: offset, 
        flex,
        [`align-${alignment}`]: flex && alignment,
        [`justify-${justify}`]: flex && justify,
        [`direction-${direction}`]: flex && direction,
        nowrap: !wrap,
        [`direction-${direction}-gap-${gap}`]: flex && direction && gap})}
        onClick={this.onClick}
        empty={!this.$slots.default}
        vusion-slot-name="default"
        allowChild
      >
        {this.slots()}
        {(!this.$slots.default) && (this.$env && this.$env.VUE_APP_DESIGNER) ? <van-empty-col></van-empty-col> : null}
      </this.tag>
    );
  },
});
