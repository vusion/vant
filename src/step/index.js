import { createNamespace } from '../utils';
import { BORDER } from '../utils/constant';
import { ChildrenMixin } from '../mixins/relation';
import Icon from '../icon';
import VanEmptyCol from '../emptycol';

const [createComponent, bem] = createNamespace('step');

export default createComponent({
  mixins: [ChildrenMixin('vanSteps')],
  components: {
    VanEmptyCol,
  },
  computed: {
    status() {
      if (this.index < this.parent.value) {
        return 'finish';
      }
      if (this.index === +this.parent.value) {
        return 'process';
      }
    },

    active() {
      return this.status === 'process';
    },

    lineStyle() {
      if (this.status === 'finish') {
        return { background: this.parent.activeColor };
      }
      return { background: this.parent.inactiveColor };
    },

    titleStyle() {
      if (this.active) {
        return { color: this.parent.activeColor };
      }
      if (!this.status) {
        return { color: this.parent.inactiveColor };
      }
    },
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    genCircle() {
      const {
        activeIcon,
        iconPrefix,
        activeColor,
        finishIcon,
        inactiveIcon,
      } = this.parent;

      if (this.active) {
        return (
          this.slots('active-icon') || (
            <Icon
              class={bem('icon', 'active')}
              name={activeIcon}
              color={activeColor}
              classPrefix={iconPrefix}
            />
          )
        );
      }

      const finishIconSlot = this.slots('finish-icon');
      if (this.status === 'finish' && (finishIcon || finishIconSlot)) {
        return (
          finishIconSlot || (
            <Icon
              class={bem('icon', 'finish')}
              name={finishIcon}
              color={activeColor}
              classPrefix={iconPrefix}
            />
          )
        );
      }

      const inactiveIconSlot = this.slots('inactive-icon');

      if (inactiveIcon || inactiveIconSlot) {
        return (
          inactiveIconSlot || (
            <Icon
              class={bem('icon')}
              name={inactiveIcon}
              classPrefix={iconPrefix}
            />
          )
        );
      }

      return <i class={bem('circle')} style={this.lineStyle} />;
    },

    onClickStep() {
      this.parent.$emit('click-step', this.index);
    },
  },

  render() {
    const { status, active } = this;
    const { direction } = this.parent;

    return (
      <div class={[BORDER, bem([direction, { [status]: status }])]}>
        <div
          class={bem('title', { active })}
          style={this.titleStyle}
          onClick={this.onClickStep}
          vusion-slot-name="default"
        >
          {this.slots()}
          {!this.slots && this.ifDesigner() ? <van-empty-col></van-empty-col> : null}
        </div>
        <div class={bem('circle-container')} onClick={this.onClickStep}>
          {this.genCircle()}
        </div>
        <div class={bem('line')} style={this.lineStyle} />
      </div>
    );
  },
});
