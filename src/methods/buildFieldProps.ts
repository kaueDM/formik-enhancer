import pickModifier from './pickModifier'
import checkPlatform from './checkPlatform'
import clearFieldProps from './clearFieldProps'
import buildBlurEventProps from './buildBlurEventProps'
import addPlatformFieldProps from './addPlatformFieldProps'

const _getInputValue = (event: any): any => {
  return checkPlatform() === 'native' ? event : event.target.value
}

const _applyMask = (mask: any, value: any) => {
  return mask ? mask(value) : value
}

/**
 * @function buildFieldProps
 * Generate an object containing all the field props.
 * @return {object} - Field props.
 */

const buildFieldProps = (field: any): Record<string, any> => {
  const type: string = field.type || 'text'

  const fieldProps: Record<string, any> = {
    ...addPlatformFieldProps(field),
    error: field['errors'][field['name']],
    touched: field['touched'][field['name']]
  }

  delete fieldProps.secure
  delete fieldProps.component

  // Handle input blur (generic event)
  fieldProps['onBlur'] = (_: void): void => {
    fieldProps.setFieldTouched(fieldProps['name'])
    return fieldProps.blurEvent
      ? fieldProps.blurEvent(buildBlurEventProps(fieldProps))
      : null
  }

  // Handle input value
  fieldProps[pickModifier(type)] = (inputValue: any): void => {
    fieldProps.setFieldTouched(fieldProps['name'], false, true)
    fieldProps.setFieldValue(fieldProps['name'],
      _applyMask(fieldProps.mask, _getInputValue(inputValue))
    )
    return fieldProps.changeEvent ? fieldProps.changeEvent(inputValue) : null
  }

  return clearFieldProps(fieldProps)
}

export default buildFieldProps
