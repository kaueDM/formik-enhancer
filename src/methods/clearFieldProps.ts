const _propsToRemove: Array<string> = [
  'setFieldError',
  'setFieldTouched',
  'setFieldValue',
  'handleBlur',
  'handleChange',
  'blurEvent',
  'touched',
  'values',
  'errors',
  'validation',
  'items',
  'error',
  'options',
  'renderOption'
]

/**
 * @function clearFieldProps
 * Remove props that are unnecessary after our field building.
 * @param {object} props - Current field props.
 * @return {object} - Cleared props.
 */
const clearFieldProps = (props: Record<string, any>): Record<string, any> => {
  const output = { ...props }

  Object.keys(props).forEach((key: string): any => {
    _propsToRemove.indexOf(key) > -1 && delete output[key]
  })

  return output
}

export default clearFieldProps
