// Utils
import { createNamespace, isDef} from '../utils';
import { on, off } from '../utils/dom/event';

// Mixins
import { PortalMixin } from '../mixins/portal';
import { ChildrenMixin, ParentMixin } from '../mixins/relation';

// Components
import DropdownItemSon from '../dropdown-menu/son';
import Icon from '../icon';
import Popup from '../popup';

const [createComponent, bem] = createNamespace('dropdown-item');

export default createComponent({
  mixins: [PortalMixin({ ref: 'wrapper' }), ChildrenMixin('vanDropdownMenu'), ParentMixin('vanDropdownMenuItem')],

  props: {
    valueprop: null,
    title: {
      type: String,
      default: '标题'
    },
    disabled: Boolean,
    titleClass: String,
    optionsprop: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    lazyRender: {
      type: Boolean,
      default: false,
    },
    shutself: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      transition: true,
      showPopup: false,
      showWrapper: false,
      bem,
      value: this.valueprop,
    };
  },

  computed: {
    // options() {
    //   if (this.optionsprop === null || this.optionsprop === undefined) return [];
    //   if(typeof this.optionsprop === 'string') return JSON.parse(this.optionsprop || '[]');
    //   if(typeof this.optionsprop === 'object') return this.optionsprop;
    // },
    // displayTitle() {
    //   console.log(1111)
    //   const match1 = this.children.filter(
    //     (option) => isDef(option.value) && option.value === this.value
    //   );
    //   console.log(match1)
    //   const match = this.options.filter(
    //     (option) => isDef(option.value) && option.value === this.value
    //   );
    //   return match1.length ? match1[0].title : (match.length ? match[0].text : (this.title ? this.title : ''));
    // },
  },

  watch: {
    showPopup(val) {
      this.bindScroll(val);
    },
    valueprop(val) {
      this.value = val;
    },
    value(val) {
      this.$emit('change', val);
    }
  },

  beforeCreate() {
    const createEmitter = (eventName) => () => this.$emit(eventName);

    this.onOpen = createEmitter('open');
    this.onClose = createEmitter('close');
    this.onOpened = createEmitter('opened');
  },

  methods: {
    displayTitle() {
      // console.log(this.children, 99, this.value)
      const match1 = this.children.filter(
        (option) => isDef(option.value) && option.value === this.value
      );
      const match = this.options.filter(
        (option) => isDef(option.value) && option.value === this.value
      );
      return match1.length ? match1[0].title : (match.length ? match[0].text : (this.title ? this.title : ''));
    },
    // @exposed-api
    toggle(show = !this.showPopup, options = {}) {
      if (show === this.showPopup) {
        return;
      }

      this.transition = !options.immediate;
      this.showPopup = show;

      if (show) {
        this.parent.updateOffset();
        this.showWrapper = true;
      }
    },

    bindScroll(bind) {
      const { scroller } = this.parent;
      const action = bind ? on : off;
      action(scroller, 'scroll', this.onScroll, true);
    },

    onScroll() {
      this.parent.updateOffset();
    },

    onClickWrapper(event) {
      // prevent being identified as clicking outside and closed when use get-contaienr
      if (this.getContainer) {
        event.stopPropagation();
      }
    },
  },

  render() {
    const {
      zIndex,
      offset,
      overlay,
      duration,
      direction,
      activeColor,
      closeOnClickOverlay,
    } = this.parent;

    const aId = this.$vnode.context.$options._scopeId;


    const Options = this.options.map((option) => {
      const active = option.value === this.value;
      return (
        <DropdownItemSon
          vusion-scope-id={aId}
          vusion-node-tag="van-dropdown-item-son"
          clickable
          key={option.value}
          icon={option.icon}
          title={option.text}
          class={bem('option', { active })}
          style={{ color: active ? activeColor : '' }}
          novalue={true}
          onClick={() => {
            this.showPopup = false;
            if (option.value !== this.value) {
              this.$emit('input', option.value);
              this.$emit('update:value', option.value);
              this.$emit('change', option.value);
            }
          }}
        >
          {active && (
            <Icon class={bem('icon')} color={activeColor} name="success" />
          )}
        </DropdownItemSon>
      );
    });

    const style = { zIndex };
    if (direction === 'down') {
      style.top = `${offset}px`;
    } else {
      style.bottom = `${offset}px`;
    }
    return (
      <div
      >
        <div
          vShow={this.showWrapper}
          ref="wrapper"
          style={style}
          class={bem([direction])}
          onClick={this.onClickWrapper}
        >
          <Popup
            vModel={this.showPopup}
            ref="popfordropdown"
            overlay={overlay}
            class={bem('content')}
            position={direction === 'down' ? 'top' : 'bottom'}
            duration={this.transition ? duration : 0}
            lazyRender={this.lazyRender}
            overlayStyle={{ position: 'absolute' }}
            closeOnClickOverlay={closeOnClickOverlay}
            onOpen={this.onOpen}
            onClose={this.onClose}
            onOpened={this.onOpened}
            onClosed={() => {
              this.showWrapper = false;
              this.$emit('closed');
            }}
          >
            {Options}
            {this.slots('default')}
          </Popup>
        </div>
      </div>
    );
  },
});
