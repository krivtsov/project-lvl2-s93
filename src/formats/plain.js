import _ from 'lodash';

const getPlain = (ast) => {
  const iter = (tree, lvl) => {
    const indent = _.repeat(' ', 4 * lvl);
    const stringify = (elem) => {
      if (elem instanceof Object) {
        const result = JSON.stringify(elem, null, 8 + (4 * lvl)).replace(/["]/g, '');
        return `{${result.slice(1, -1)}    ${indent}}`;
      }
      return elem;
    };

    const result = tree.reduce((acc, obj) => {
      if (obj.type === 'noChanged') {
        return `${acc}\n${indent}    ${obj.body.key}: ${obj.body.value}`;
      }
      if (obj.type === 'changed') {
        return `${acc}\n${indent}  + ${obj.body.key}: ${stringify(obj.body.newValue)}\n${indent}  - ${stringify(obj.body.key)}: ${obj.body.value}`;
      }
      if (obj.type === 'deleted') {
        return `${acc}\n${indent}  - ${obj.body.key}: ${stringify(obj.body.value)}`;
      }
      if (obj.type === 'add') {
        return `${acc}\n${indent}  + ${obj.body.key}: ${stringify(obj.body.value)}`;
      }
      if (obj.type === 'noChangedChildren') {
        return `${acc}\n    ${indent}${obj.body.key}: {${iter(obj.body.value, lvl + 1)}\n    ${indent}}`;
      }
      return acc;
    }, '');
    return result;
  };
  return `{${iter(ast, 0)}\n}`;
};

export default getPlain;
