"use strict";

exports.__esModule = true;
exports.default = void 0;
const positionMethod = {
  start: 'unshiftContainer',
  end: 'pushContainer'
};

const addJSXAttribute = ({
  types: t,
  template
}, opts) => {
  function getAttributeValue({
    literal,
    value,
    id
  }) {
    if (typeof value === 'boolean') {
      return t.jsxExpressionContainer(t.booleanLiteral(value));
    }

    if (typeof value === 'number') {
      return t.jsxExpressionContainer(t.numericLiteral(value));
    }

    if (typeof value === 'string' && literal) {
      return t.jsxExpressionContainer(template.ast(value).expression);
    }

    if (typeof value === 'string') {
      return t.stringLiteral(value);
    }
    console.log("typeof value: "+typeof value);
    if (typeof value === 'function') {
      return t.jsxExpressionContainer(template.ast(value(id)).expression);
      // return t.stringLiteral(value);
    }

    return null;
  }

  function getAttribute({
    spread,
    name,
    value,
    literal, id
  }) {
    if (spread) {
      return t.jsxSpreadAttribute(t.identifier(name));
    }

    return t.jsxAttribute(t.jsxIdentifier(name), getAttributeValue({
      value,
      literal, id
    }));
  }

  return {
    visitor: {
      JSXOpeningElement(path) {
        let id = null;
        if (!path.get('attributes').some(attribute => { //пропускаем элементы у которых id либо вообще нету, либо они не совпадают с id из массива
          if(attribute.get('name').node.name != 'id') return false;
          if(!opts.ids.includes(attribute.get('value').node.value) ) return false;
          id = attribute.get('value').node.value;
          return true;
        }) ) return;
        // if (!opts.ids.includes(path.node.name.name)) return;
        opts.attributes.forEach(({
          name,
          value = null,
          spread = false,
          literal = false,
          position = 'end'
        }) => {
          const method = positionMethod[position];
          const newAttribute = getAttribute({
            spread,
            name,
            value,
            literal, id
          });
          const attributes = path.get('attributes');

          const isEqualAttribute = attribute => {
            if (spread) {
              return attribute.get('argument').isIdentifier({
                name
              });
            }

            return attribute.get('name').isJSXIdentifier({
              name
            });
          };

          const replaced = attributes.some(attribute => {
            if (!isEqualAttribute(attribute)) return false;
            attribute.replaceWith(newAttribute);
            return true;
          });

          if (!replaced) {
            path[method]('attributes', newAttribute);
          }
        });
      }

    }
  };
};

var _default = addJSXAttribute;
exports.default = _default;