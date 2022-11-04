const MarkdownIt = require('markdown-it');

const md = new MarkdownIt();

module.exports = function (str) {
  const blocks = [];
  const tokens = md.parse(str);
  let title = '';
  let description = '';
  tokens.forEach((token, index) => {
    if (token.type === 'heading_close' && token.tag === 'h3') {
      const inline = tokens[index - 1];
      if (inline && inline.type === 'inline') title = inline.content;
    } else if (token.type === 'paragraph_close') {
      const inline = tokens[index - 1];
      if (inline && inline.type === 'inline')
        description += inline.content + '\n';
    } else if (token.type === 'fence') {
      const lang = token.info.trim().split(' ')[0];

      if (lang === 'html') {
        blocks.push({
          title,
          description,
          code: `\n${token.content}\n`,
        });
      } else if (lang === 'vue') {
        blocks.push({
          title,
          description,
          code: token.content,
        });
      }
      description = '';
    }
  });

  return blocks[0].code;
};
