// Utils
import { createNamespace } from '../utils';

const [createComponent, bem] = createNamespace('toast');

let uid = 0;

export default createComponent({
  props: {
    icon: String,
    className: null,
    iconPrefix: String,
    loadingType: String,
    forbidClick: Boolean,
    closeOnClick: Boolean,
    message: [Number, String],
    type: {
      type: String,
      default: 'text',
    },
    position: {
      type: String,
      default: 'middle',
    },
    transition: {
      type: String,
      default: 'van-fade',
    },
    lockScroll: {
      type: Boolean,
      default: false,
    },
    duration: { type: Number, default: 2000 },

    customIcon: String,
  },

  data() {
    return {
      key: `u-toast-${uid++}`,
    };
  },

  methods: {
    open() {
      this.$toast.openToast({
        key: this.key,
        message: this.message,
        type: this.type,
        duration: this.duration,
        customIcon: this.customIcon,
        onShow: () => {
          this.$emit('open');
        },
        onHide: () => {
          this.$emit('close');
        },
      });
    },
    close() {
      this.$toast.closeToast(this.key);
    },
  },

  render() {
    return null;
  },
});
