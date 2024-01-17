import { createNamespace } from '../utils';
import { ChildrenMixin } from '../mixins/relation';

import Iconv from '../iconv';

const [createComponent, bem] = createNamespace('list-view-item');

export default createComponent({
  mixins: [ChildrenMixin('vanListView')],
  props: {
    selected: { type: Boolean, default: false },
  },
  render() {
    return (
      <div class={bem()} selected={this.selected}>
        <div class={bem('icon')}>
          {this.parent.selectedIcon && this.selected && (
            <Iconv name={this.parent.selectedIcon} icotype="only" />
          )}
          {this.parent.unselectedIcon && !this.selected && (
            <Iconv name={this.parent.unselectedIcon} icotype="only" />
          )}
        </div>

        {this.slots()}
      </div>
    );
  },
});
