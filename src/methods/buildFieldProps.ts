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

  // Text input props
  if (type === 'text') {
    // Set value
    fieldProps['value'] = field['values'][field['name']]

    // Handle protected input
    fieldProps['secureTextEntry'] = field['secure']

    // Handle text change
    fieldProps['onChangeText'] = (inputValue: any): void => {
      fieldProps.setFieldValue(fieldProps['name'], inputValue)
      fieldProps.setFieldTouched(fieldProps['name'], false, true)
      return fieldProps.changeEvent ? fieldProps.changeEvent(inputValue) : null
    }

    // Handle input blur (if exists)
    fieldProps['onBlur'] = (_: void): void => {
      fieldProps.setFieldTouched(fieldProps['name'])
      return fieldProps.blurEvent ? fieldProps.blurEvent() : null
    }
  }

  return fieldProps
}

export default buildFieldProps
