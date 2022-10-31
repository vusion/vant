import { createPopper, offsetModifier } from '@vant/popperjs';
import { createNamespace } from '../utils';
import { BORDER_BOTTOM } from '../utils/constant';

// Mixins
import { ClickOutsideMixin } from '../mixins/click-outside';
import { ParentMixin } from '../mixins/relation';


// Components
import Icon from '../icon';
import Popup from '../popup';
import PopoverCombinationItem from '../popover-combination-item'
import VanEmptyCol from '../emptycol'

const [createComponent, bem] = createNamespace('popover-combination');

export default createComponent({
  mixins: [
    ClickOutsideMixin({
      event: 'touchstart',
      method: 'onClickOutside',
    }),
    ParentMixin('vanPopoverCombination')
  ],

  props: {
    value: Boolean,
    trigger: {
      type: String,
      default: 'click'
    },
    overlay: Boolean,
    offset: {
      type: Array,
      default: () => [0, 8],
    },
    theme: {
      type: String,
      default: 'light',
    },
    actions: {
      type: Array,
      default: () => [],
    },
    placement: {
      type: String,
    },
    getContainer: {
      type: [String, Function],
      default: 'body',
    },
    closeOnClickAction: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      valued: this.value || false,
    }
  },
  watch: {
    value: {
      handler (val) {
        this.valued = val;
	    },
	    immediate: true,
    },
    valued: {
      handler (val) {
	      this.updateLocation(val)
	    },
    },
    placement: 'updateLocation',
  },

  mounted() {
    this.updateLocation();
  },

  beforeDestroy() {
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  },

  methods: {
    getReferEl() {
      if (this.slots('reference')) {
        return this.$refs.wrapper;
      }
      // 求上下文中的 parent
      if (this.$parent === this.$vnode.context)
          return this.$el.parentElement; // Vue 的 vnode.parent 没有连接起来，需要自己找，不知道有没有更好的方法
      let parentVNode = this.$parent._vnode;
      while (
          parentVNode
          && !parentVNode.children.includes(this.$vnode)
      )
          parentVNode = parentVNode.children.find((child) =>
              child.elm.contains(this.$el),
          ); // if (!parentVNode)
      if (parentVNode && parentVNode.context === this.$vnode.context)
          return parentVNode.elm; // 否则，找第一个上下文一致的组件
      let parentVM = this.$parent;
      while (
          parentVM
          && parentVM.$vnode.context !== this.$vnode.context
      )
          parentVM = parentVM.$parent;
      return parentVM.$el;
    },

    createPopper() {
      const referEl = this.getReferEl();
      return createPopper(referEl, this.$refs.popover.$el, {
        placement: this.placement,
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              gpuAcceleration: false,
            },
          },
          {
            ...offsetModifier,
            options: {
              offset: this.offset,
            },
          },
        ],
      });
    },

    updateLocation(val) {
      this.$nextTick(() => {
        if (!this.valued) {
          return;
        }
        if (!this.popper) {
          this.popper = this.createPopper();
        } else {
          this.popper.setOptions({
            placement: this.placement,
          });
        }
      });
    },

    renderAction(action, index) {
      const { icon, text, disabled, className } = action;
      return (
        <PopoverCombinationItem icon={icon} text={text} disabled={disabled} className={className}/>
      );
    },

    onToggle(value) {
      this.$emit('input', value);
      this.$emit('update:value', value);
    },

    onClickWrapper() {
      if (this.trigger === 'click') {
        this.valued = !this.valued;
        this.onToggle(this.valued);
      }
    },

    onTouchstart(event) {
      event.stopPropagation();
      this.$emit('touchstart', event);
    },

    onClickAction(action, index) {
      if (action.disabled) {
        return;
      }



      if (this.closeOnClickAction) {
        this.valued = false;
        this.$emit('input', false);
        this.$emit('update:value', false);
      }

      this.$emit('select', action, index);
    },

    onClickOutside() {
      this.valued = false;
      this.$emit('input', false);
      this.$emit('update:value', false);
    },

    onOpen() {
      this.$emit('open');
    },

    /* istanbul ignore next */
    onOpened() {
      this.$emit('opened');
    },

    onClose() {
      this.$emit('close');
    },

    /* istanbul ignore next */
    onClosed() {
      this.$emit('closed');
    },
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    openModal() {
      this.valued = true;
    },
    closeModal() {
      this.valued = false;
    },
    designerDbControl() {
      if (this.ifDesigner()) {
        this.valued = !this.valued;
      }
    },
    designerControl() {
      if (this.ifDesigner()) {
        this.valued = !this.valued;
      }
  },
  },

  render() {
    return (
      <span ref="wrapper" class={bem('wrapper')} onClick={this.onClickWrapper} vusion-click-enabled>
        <Popup
          ref="popover"
          value={this.valued}
          class={bem([this.theme])}
          overlay={this.overlay}
          position={null}
          transition="van-popover-zoom"
          lockScroll={false}
          // getContainer={this.getContainer}
          onOpen={this.onOpen}
          onClose={this.onClose}
          onInput={this.onToggle}
          onOpened={this.onOpened}
          onClosed={this.onClosed}
          nativeOnTouchstart={this.onTouchstart}
        >
          <div class={bem('arrow')} />
          <div class={bem('content')} role="menu" vusion-slot-name="default">
            {!this.slots('default') && this.ifDesigner() ? <van-empty-col></van-empty-col> : null}
            {this.slots('default') || this.actions.map(this.renderAction)}
          </div>
        </Popup>
        {this.slots('reference')}
        {!this.slots('reference') && this.ifDesigner() ? <div vusion-slot-name="reference"><van-empty-col></van-empty-col></div> : null}
      </span>
    );
  },
});
