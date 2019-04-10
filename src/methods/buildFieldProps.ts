const _getValueModifier = (type: string): string => {
  const possibleTypes: Array<Record<string, string>> = [
    { type: 'text', prop: 'onChangeText' },
    { type: 'select', prop: 'onValueChange' }
  ]

  return possibleTypes.filter((x: Record<string, string>) => {
    return x.type === type
  })[0]['prop']
}

/**
 * @function buildFieldProps
 * Generate an object containing all the field props
 */

const buildFieldProps = (field: any): Record<string, any> => {
  const type: string = field.type || 'text'

  const fieldProps: Record<string, any> = {
    ...field,
    error: field['errors'][field['name']],
    touched: field['touched'][field['name']]
  }

  delete fieldProps.secure
  delete fieldProps.component

  // Handle input blur (generic event)
  fieldProps['onBlur'] = (_: void): void => {
    fieldProps.setFieldTouched(fieldProps['name'])
    return fieldProps.blurEvent ? fieldProps.blurEvent() : null
  }

  // Handle input value
  fieldProps[_getValueModifier(type)] = (inputValue: any): void => {
    fieldProps.setFieldValue(fieldProps['name'], inputValue)
    fieldProps.setFieldTouched(fieldProps['name'], false, true)
    return fieldProps.changeEvent ? fieldProps.changeEvent(inputValue) : null
  }

  // Text input props
  if (type === 'text') {
    // Set value
    fieldProps['value'] = field['values'][field['name']]

    // Handle protected input
    fieldProps['secureTextEntry'] = field['secure']
  }

  if (type === 'select') {
    // Set selected
    fieldProps['selectedValue'] = field['values'][field['name']]
  }

  return fieldProps
}

export default buildFieldProps
