/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component) {
  if (component.includes('Input')) {
    return 'inputText';
  }
  if (component.includes('Picker')) {
    return 'chooseText';
  }

  if (
    component.includes('Select') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    return 'chooseText';
  }
  return '';
}
