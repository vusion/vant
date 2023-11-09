import { createNamespace } from "../utils";
import ULink from 'cloud-ui.vusion/src/components/u-link.vue/index.vue';


const [createComponent, bem] = createNamespace('link');

export default createComponent({
  extends: ULink,
  methods: {
    renderSlot() {
      if (this.slots()) {
        return this.slots();
      }

      return this.text;
    },
  },
  render() {
    return (
      <a
        class={bem()}
        href={this.currentHref}
        target={this.target}
        noDecoration={!this.decoration}
        disabled={this.currentDisabled}
        tabindex={this.currentDisabled ? -1 : 0}
        download={this.currentDownload}
        hoverType={this.hoverType}
        onClick={this.onClick}
        {...this.listeners}
        vusion-slot-name-edit="text"
      >
        {this.renderSlot()}
      </a>
    );
  },
});
