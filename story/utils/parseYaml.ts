
export function parseApiYaml(api: CApi[]) {
  const arg = api[0];

  if (!arg) {
    return {};
  }
  
  const argTypes: Record<string, any> = {};
  const args: Record<string, any> = {};
  const { attrs } = arg;

  if (attrs) {
    attrs.forEach(attr => {
      const { title, name, type, options: attrOptions, default: defaultValue, description } = attr;
      // 选项
      const options: string[] = [];
      const mapping: Record<string, any> = {};
      if (attrOptions) {
        attrOptions.forEach(option => {
          options.push(option.title);
          mapping[option.title] = option.value;
        });

        argTypes[name] = {
          control: {
            type: 'select',
          },
          options,
          mapping,
        };
      } else if (type === 'boolean') {
        argTypes[name] = {
          control: {
            type: 'boolean'
          },
        };
      } else if (type === 'string') {
        argTypes[name] = {
          control: {
            type: 'text'
          },
        };
      }

      argTypes[name] = argTypes[name] || {};

      argTypes[name].name = title;
      argTypes[name].description = description;
      argTypes[name].table = {
        defaultValue: {
          summary: defaultValue,
        },
        type: {
          summary: type,
        }
      };


      if (attrOptions) {
        args[name] = attrOptions.find(option => option.value === defaultValue)?.title;
      } else {
        args[name] = defaultValue;
      }
    });
  }

  console.log(argTypes,args);
  return {argTypes, args};
}