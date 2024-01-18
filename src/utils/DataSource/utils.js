import { _get } from '../index';

export const isOperator = (value) => {
  const operators = [
    '=',
    '==',
    'eq',
    '!=',
    'neq',
    '<',
    'lt',
    '<=',
    'lte',
    '>',
    'gt',
    '>=',
    'gte',
    'includes',
    'startsWith',
    'endsWith',
  ];
  return typeof value === 'function' || operators.includes(value);
};

export const solveCondition = (condition, obj) => {
  if (Array.isArray(condition))
    return condition.some((cond) => solveCondition(cond, obj));

  if (typeof condition === 'object') {
    return Object.keys(condition).every((key) => {
      let expression = condition[key];

      if (expression === undefined) return true;

      if (typeof expression !== 'object') expression = ['=', expression];

      if (Array.isArray(expression)) {
        if (!isOperator(expression[0])) {
          // 多选项过滤，暂时简单处理
          const sourceValue = isPrimitive(obj) ? obj : _get(obj, key);
          const targetValue = expression;
          return targetValue.includes(sourceValue);
        }
        expression = {
          operator: expression[0],
          value: expression[1],
        };
      }

      let sourceValue = isPrimitive(obj) ? obj : _get(obj, key);
      let targetValue = expression.value;
      if (expression.caseInsensitive) {
        sourceValue =
          typeof sourceValue === 'string'
            ? sourceValue.toLowerCase()
            : sourceValue;
        targetValue =
          typeof targetValue === 'string'
            ? targetValue.toLowerCase()
            : targetValue;
      }

      if (typeof expression.operator === 'function')
        return expression.operator(sourceValue, targetValue, expression);
      if (
        expression.operator === '=' ||
        expression.operator === '==' ||
        expression.operator === 'eq'
      )
        return sourceValue === targetValue;
      if (expression.operator === '!=' || expression.operator === 'neq')
        return sourceValue !== targetValue;
      if (expression.operator === '<' || expression.operator === 'lt')
        return sourceValue < targetValue;
      if (expression.operator === '<=' || expression.operator === 'lte')
        return sourceValue <= targetValue;
      if (expression.operator === '>' || expression.operator === 'gt')
        return sourceValue > targetValue;
      if (expression.operator === '>=' || expression.operator === 'gte')
        return sourceValue >= targetValue;
      if (expression.operator === 'includes')
        return String(sourceValue).includes(targetValue);
      if (expression.operator === 'startsWith')
        return String(sourceValue).startsWith(targetValue);
      if (expression.operator === 'endsWith')
        return String(sourceValue).endsWith(targetValue);
      throw new TypeError('Unknown operator in conditions!');
    });
  }

  throw new TypeError('Condition must be a Object or Array!');
};

export function getType(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

// 基础类型
export function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
}
