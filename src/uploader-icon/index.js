// Utils
import { createNamespace } from '../utils';
// Mixins
// import { ChildrenMixin } from '../mixins/relation';

// Components
import Icon from '../icon';

const [createComponent, bem] = createNamespace('uploader-icon');

export default createComponent({
  // mixins: [ChildrenMixin('vanCollapse')],

  props: {
    uploadIcon: {
      type: String,
      default: 'photograph',
    },
  },

  render() {
    return (
      <Icon name={this.uploadIcon} class={bem('')} />
    );
  },
});
