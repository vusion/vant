import { createNamespace } from "../utils"

const [createComponent, bem] = createNamespace('absolute-layout')

export default createComponent({
  computed: {
    isEmpty() {
      return (
        !this.slots() && this.inDesigner()
      );
    }
  },
  methods: {
    renderSlot() {
      if (this.slots()) {
        return this.slots();
      }

      if (this.inDesigner()) {
        return <div class={bem('emptyTip')}>拖入组件放至任意位置</div>;
      }
    }
  },
  render() {
    return (
      <div
        class={bem(undefined, { empty: this.isEmpty })}
        {...{
          on: this.$listeners
        }}
        vusion-slot-name="default"
      >
        {this.renderSlot()}
      </div>
    );
  }
})
