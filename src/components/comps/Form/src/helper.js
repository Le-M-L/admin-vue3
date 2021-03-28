import { isNumber } from '@/config/utils/is';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component, flag, label) {
  if (component.includes('Input') || component.includes('Complete')) {
    return `请输入${flag ? label : ''}`;
  }
  if (component.includes('Picker')) {
    return `请选择${flag ? label : ''}`;
  }
  if (
    component.includes('Select') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    return `请选择${flag ? label : ''}`;
  }
  return '';
}

function genType() {
  return ['DatePicker', 'MonthPicker', 'RangePicker', 'WeekPicker', 'TimePicker'];
}

export function setComponentRuleType(rule, component) {
  if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
    rule.type = 'object';
  } else if (
    ['RangePicker', 'ApiCheckbox', 'ApiCascader', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(
      component
    )
  ) {
    rule.type = 'array';
  } else if (['InputNumber', 'Rate'].includes(component)) {
    rule.type = 'number';
  } else if (['Switch'].includes(component)) {
    rule.type = 'boolean';
  }
}

export function handleInputNumberValue(component, val) {
  if (!component) return val;
  if (['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}

/**
 * 时间字段
 */
export const dateItemType = genType();
