// Utils
import { createNamespace } from '../utils';
import Picker from '../picker';
import Popup from '../popup';
import Field from '../field';


const [createComponent, bem, t] = createNamespace('pickerson');

export default createComponent({
  props: {
    pvalue: [String, Object],
    labelField: {
      type: String,
      default: '',
    },
    inputAlign: String,
    closeOnClickOverlay: Boolean,
  },

  data() {
    return {
      valuepopup: false,
      psonvalue: this.pvalue || '',
    };
  },

  computed: {},

  watch: {
    psonvalue(val, old) {
      this.$emit('update:pvalue', val);
    },
    pvalue(val, old) {
      this.psonvalue = val;
    },
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    getTitle() {
      if (this.ifDesigner()) return this.pvalue;
      return this.psonvalue;
    },
    togglePopup() {
      this.$refs.popforpison.togglePModal();
    },
    onChange(vm, val, index) {
      this.$emit('change', vm, val, index);
    },
    onConfirm(val) {
      this.psonvalue = val;
      this.$emit('confirm', val);
    },
    onCancel() {
      this.$emit('cancel');
    }
  },

  render(h) {
    const tempSlot = {
      title: () => this.slots('title'),
    };

    const on = {
      ...this.$listeners,
      change: this.onChange,
      confirm: this.onConfirm,
      cancel: this.onCancel,
    };

    return (
      <div class={bem('wrap')}>
        <Field
          label={this.labelField}
          value={this.getTitle()}
          scopedSlots={tempSlot}
          readonly
          isLink
          input-align={this.inputAlign || 'right'}
          onClick={this.togglePopup}
          // eslint-disable-next-line no-prototype-builtins
          notitle={!this.$slots.hasOwnProperty('title')}
          insel={true}
        />
        <Popup
          safe-area-inset-bottom
          round
          ref="popforpison"
          class={bem('popup')}
          position={'bottom'}
          closeOnClickOverlay={this.closeOnClickOverlay}
          // onClickOverlay={this.togglePopup}
        >
          <Picker
            {...{
              attrs: { ...this.$attrs },
            }}
            pvalue={this.psonvalue}
            showToolbar={this.$attrs['show-toolbar']}
            {...{ on }}
          />
        </Popup>
      </div>
    );
  },
});
