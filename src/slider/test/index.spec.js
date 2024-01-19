import Slider from '..';
import {
  mount,
} from '../../../test';


test('slider-width style', () => {
  const wrapper = mount(Slider, {
    propsData: {
      style: "width: 100px; height: 50px; padding: 10px;",
    },
  });

  expect(wrapper).toMatchSnapshot();
});
