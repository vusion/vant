/* tslint:disable */
// Utils
import { createNamespace, addUnit, isDefB } from '../utils';
import { emit, inherit } from '../utils/functional';

// Components
import Info from '../info';
import VanEmptyCol from '../emptycol';
import config from './config';

import OnlineSvgIcon from './components/index.vue'
// Types
import { CreateElement, RenderContext } from 'vue/types';
import { DefaultSlots } from '../utils/types';
import encodeUrl from '../utils/encodeUrl';

require('./icon');

export type IconProps = {
  link: any;
  text?: string;
  dot?: boolean;
  tag: keyof HTMLElementTagNameMap | string;
  name?: string;
  icotype?: string;
  size?: string | number;
  info?: string | number;
  badge?: string | number;
  color?: string;
  classPrefix: string;
  notext?: boolean;
  href?: string;
  target?: { type: string; default: '_self' };
  to?: [string, Object];
  replace?: { type: boolean; default: false };
  append?: { type: boolean; default: false };
  decoration?: { type: boolean; default: true };
  download?: { type: boolean; default: false };
  destination?: string;
};

export type IconEvents = {
  onClick?(event: Event): void;
};

const [createComponent, bem] = createNamespace('iconv');

function isImage(name?: string): boolean {
  return name ? name.indexOf('/') !== -1 : false;
}

function isSvgUrl(url: string | undefined): boolean {
  if (!url) return false;
  return isImage(url) && /\.svg/i.test(url);
}

// compatible with legacy usage, should be removed in next major version
const LEGACY_MAP: Record<string, string> = {
  medel: 'medal',
  'medel-o': 'medal-o',
  'calender-o': 'calendar-o',
};

function correctName(name?: string) {
  return (name && LEGACY_MAP[name]) || name;
}

function getName(name = '默认') {
  const item = config.glyphs.find((v) => v.font_class === name) || {
    font_class: 'default',
  };
  return item.font_class;
}

function Iconv(
  h: CreateElement,
  props: IconProps,
  slots: DefaultSlots,
  ctx: RenderContext<IconProps>
) {
  const name = getName(props.name);
  const imageIcon = isImage(name);

  if (process.env.NODE_ENV === 'development' && props.info) {
    console.warn(
      '[Vant] Icon: "info" prop is deprecated, use "badge" prop instead.'
    );
  }

  function currentHref() {
    if (props.href !== undefined) return encodeUrl(props.href);
    if (ctx.parent?.$router && props.to !== undefined)
      // @ts-ignore：没办法
      return encodeUrl(
        ctx.parent?.$router.resolve(props.to, ctx.parent?.$route, props.append)
          .href
      );
    return undefined;
  }

  async function onClick(event: Event) {
    emit(ctx, 'click', event);
    if (props.link) {
      const url = props.link;
      const target = props.target;
      let realUrl: any;
      if (typeof url === 'function') {
          // @ts-ignore
          realUrl = await url();
      } else {
          realUrl = url;
      }
      function linkpao() {
          const a = document.createElement('a');
          a.setAttribute('href', realUrl);
          // @ts-ignore
          a.setAttribute('target', target);
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
              document.body.removeChild(a);
          }, 500);
      }
      linkpao();
      return;
    }
    const hrefR = currentHref();
    // console.log(hrefR, ctx, event)
    // @ts-ignore：没办法
    // if (props.target !== '_self')
    //   return;

    if (hrefR === undefined) {
      let to;
      if (props.destination) {
        if (props.destination.startsWith('http')) {
          window.location.href = encodeUrl(props.destination);
          return;
        }
        to = props.destination;
      }

      const currentTo = to || props.to;
      if (currentTo === undefined) return;
      const cancel = false;
      if (cancel) return;
      const $router = ctx.parent?.$router;
      const $route = ctx.parent?.$route;
      const { location } = $router.resolve(
        // @ts-ignore：没办法
        currentTo,
        $route,
        props.append
      );
      if (props.target === '_self') {
        props.replace ? $router.replace(location) : $router.push(location);
      } else {
        ctx.parent?.$linkpao(currentTo, props.target);
      }
    } else {
      function downloadClick() {
        const a = document.createElement('a');
        a.setAttribute('href', hrefR as string);
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
        }, 500);
      }
      downloadClick();
    }
  }
  function ifDesigner() {
    return ctx?.parent?.$env && ctx.parent?.$env.VUE_APP_DESIGNER;
  }
  const sd = slots.default && slots.default();
  const sid = ctx.parent.$options._scopeId;
  const href = { attrs: { 'xlink:href': `#h5-${name}` } };
  const ifNotext = props.notext;
  const { icotype } = props;
  const endNotext = icotype === 'only';


  const tempStyle = {
    color: props.color,
    fontSize: addUnit(props.size),
  };
  if (typeof tempStyle.fontSize === 'undefined') {
    delete tempStyle.fontSize;
  }

  // 组件上写style，组件里不生效，这里需要合并style
  const vnodeStaticStyle = ctx.data && ctx.data.staticStyle || {};
  const vnodeStyle = ctx.data && ctx.data.style || {};
  Object.assign(tempStyle, vnodeStaticStyle);
  Object.assign(tempStyle, vnodeStyle);

  return (
    <props.tag
      class={[
        props.classPrefix,
        isSvgUrl(props.name) ? bem('cus') : '',
        props.icotype === 'left' ? bem('flex') : '',
        // imageIcon ? '' : `${props.classPrefix}-${name}`,
      ]}
      style={tempStyle}
      {...inherit(ctx, false)}
      onClick={onClick}
    >
      {isSvgUrl(props.name) ? (
        <OnlineSvgIcon purecss={true} url={props.name} />
      ) : (
        <svg class="vant-iconv-svg van-shoud-pa" aria-hidden="true">
          <use {...href} class="van-shoud-pa"></use>
        </svg>
      )}
      {ifDesigner() && !sd && !ifNotext && !endNotext ? (
        <VanEmptyCol
          vusion-slot-name="default"
          class="van-shoud-pa"
          vusion-scope-id={sid}
        ></VanEmptyCol>
      ) : null}
      {!endNotext ? (
        <div class={bem('slot', { inline: icotype === 'left' })}>{sd}</div>
      ) : null}
      {/* {imageIcon && <img class={bem('image')} src={name} />} */}
      <Info dot={props.dot} info={props.badge ?? props.info} />
    </props.tag>
  );
}

Iconv.props = {
  text: {
    type: String,
    default: '图标',
  },
  dot: Boolean,
  name: String,
  icotype: String,
  size: [Number, String],
  // @deprecated
  // should be removed in next major version
  info: [Number, String],
  badge: [Number, String],
  color: String,
  tag: {
    type: String,
    default: 'i',
  },
  classPrefix: {
    type: String,
    default: bem(),
  },
  notext: Boolean,
  href: String,
  target: { type: String, default: '_self' },
  to: [String, Object],
  replace: { type: Boolean, default: false },
  append: { type: Boolean, default: false },
  decoration: { type: Boolean, default: true },
  download: { type: Boolean, default: false },
  destination: String,
};

export default createComponent<IconProps, IconEvents>(Iconv);
