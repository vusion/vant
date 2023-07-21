import { createNamespace, isDef } from '../utils';
import { ParentMixin } from '../mixins/relation';
import { BORDER_TOP_BOTTOM } from '../utils/constant';

const [createComponent, bem] = createNamespace('collapse');

export default createComponent({
  mixins: [ParentMixin('vanCollapse')],

  props: {
    accordion: Boolean,
    value: [String, Number, Array],
    border: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentValue: this.fromValue(this.value) ?? (this.accordion ? 0 : [0])
    }
  },
  watch: {
    value(val) {
      this.currentValue = this.fromValue(val) ?? (this.accordion ? 0 : [0]);
    },
    accordion(val) {
      if ((this.fromValue(this.value))) {
      } else {
        this.currentValue = val ? 0 : [0];
      }
    }
  },
  methods: {
    fromValue(value) {
      try {
          if (value === null || value === undefined) return null;
          return value;
      } catch (err) {
          return null;
      }
    },
    switch(name, expanded) {
      if (!this.accordion) {
        name = expanded
          ? this.currentValue.concat(name)
          : this.currentValue.filter((activeName) => activeName !== name);
      }
      this.$emit('input', name);
      this.$emit('update:value', name);
      this.$emit('change', name);
      this.currentValue = name;
    },
  },

  render() {
    return (
      <div class={[bem(), { [BORDER_TOP_BOTTOM]: this.border }]}>
        {this.slots()}
      </div>
    );
  },
});
