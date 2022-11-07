const { components } = require('../../vusion.config').docs;

const defaultJson = require('./defaultResult');

const defaultDefault = require('./defaultDefault');

const { v4: uuidv4 } = require('uuid');

const fs = require('fs-extra');

const path = require('path');

const postcss = require('postcss');

const mk = require('./markdown');

const themeComponentsMap = {};

const cssContent = fs.readFileSync(
  path.join(__dirname, '../../src-vusion/styles/theme.css'),
  'utf-8'
);
const root = postcss.parse(cssContent);
const _root = root.nodes.find(
  (node) => node.type === 'rule' && node.selector === ':root'
);

let lastComponent;
let lastProp;

_root.nodes.forEach((node) => {
  if (node.type === 'comment') {
    if (node.raws.before && node.raws.before.includes('\n')) {
      if (node.text.includes('@component ')) {
        const cap = /@component\s+([\w-]+)(\s+@hidden)?/.exec(node.text.trim());
        const name = cap[1].trim();
        const hidden = !!cap[2];

        if (!lastComponent || lastComponent.name !== name) {
          if (lastComponent) {
            const { name: componentName, cssProperty } = lastComponent;
            themeComponentsMap[componentName] = cssProperty;
          }

          lastComponent = {
            name,
            cssProperty: {},
          };
          if (hidden) {
            lastComponent = undefined;
          }
        }
      }
    } else if (lastComponent) {
      if (node.text.trim() === '@hidden') {
        delete lastComponent.cssProperty[lastProp];
      } else if (node.text.includes('@type ')) {
        const cap = /@type\s+([\w-]+)/.exec(node.text.trim());
        lastComponent.cssProperty[lastProp].type = cap[1].trim();
      } else if (node.text.includes('@desc ')) {
        const cap = /@desc\s+([\u4e00-\u9fa5|\w|,|\s|：|\\#|（|）|(|)|\\.|，]+)/.exec(
          node.text.trim()
        );
        lastComponent.cssProperty[lastProp].desc = cap[1].trim();
      }
    }
  } else if (node.type === 'decl') {
    defaultDefault[node.prop] = node.value;
    if (!lastComponent) return;
    lastComponent.cssProperty[node.prop] = {
      type: 'input',
    };
    lastProp = node.prop;
  }
});
if (lastComponent) {
  const { name: componentName, cssProperty } = lastComponent;
  themeComponentsMap[componentName] = cssProperty;
}

const resultPath = path.join(__dirname, './result.json');
const defaultPath = path.join(__dirname, './default.json');

components.forEach((comItem) => {
  if (themeComponentsMap[`van-${comItem.name}`] && comItem.show) {
    const tempItem = {
      id: uuidv4(),
      name: `van-${comItem.name}`,
      title: comItem.alias,
      toPosition: comItem.name,
      type: [],
      cssProperty: themeComponentsMap[`van-${comItem.name}`] || {},
    };
    let mdp = path.join(
      __dirname,
      '../../src/',
      comItem.name,
      '/docs/blocks.md'
    );
    if (comItem.vusion) {
      mdp = path.join(
        __dirname,
        '../../src-vusion/components/',
        comItem.name,
        '/docs/blocks.md'
      );
    }
    const content = mk(fs.readFileSync(mdp).toString());
    if (content) {
      tempItem.preview = { template: content };
    }
    defaultJson[1].items.push(tempItem);
  }
});

fs.writeJsonSync(resultPath, defaultJson, {
  spaces: 4,
});
fs.writeJSONSync(defaultPath, defaultDefault, {
  spaces: 4,
});
