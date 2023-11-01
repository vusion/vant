import { createNamespace } from '../utils';
import ULink from 'cloud-ui.vusion/src/components/u-link.vue/index.vue';
import IIco from 'cloud-ui.vusion/src/components/i-ico.vue/index.vue';

const [createComponent, bem, t] = createNamespace('link');

export default createComponent({
  components: { ULink, IIco },
  extends: ULink,
  render() {
    return (
      <a
        vusion-slot-name-edit="text"
        class={bem()}
        href={this.currentHref}
        target={this.target}
        noDecoration={!this.decoration}
        disabled={this.currentDisabled}
        tabindex={this.currentDisabled ? -1 : 0}
        download={this.currentDownload}
        loading={this.loading || this.$attrs.loading}
        hoverType={this.hoverType}
        onClick={this.onClick}
        {...{ on: this.listeners }}
      >
          {this.icon && (
            <IIco
              name={this.icon}
              class={bem('icon')}
              notext
            ></IIco>
          )}

          {this.slots() || this.text}
      </a>
    )
  }
});
