import checkPlatform from './checkPlatform'

const _genericPropsToRemove: Array<string> = [
  'blurEvent',
  'values',
  'errors',
  'validation',
  'renderItem'
]

const _webPropsToRemove: Array<string> = [
  'setFieldError',
  'setFieldTouched',
  'setFieldValue',
  'handleBlur',
  'handleChange',
  'items'
]

/**
 * @function clearFieldProps
 * Remove props that are unnecessary after our field building.
 * @param {object} props - Current field props.
 * @return {object} - Cleared props.
 */
const clearFieldProps = (props: Record<string, any>): Record<string, any> => {
  const output = { ...props }

  const _propsToRemove: Array<string> = checkPlatform() === 'web' &&
    props.type !== 'custom'
    ? [..._genericPropsToRemove, ..._webPropsToRemove]
    : _genericPropsToRemove

  Object.keys(props).forEach((key: string): any => {
    _propsToRemove.indexOf(key) > -1 && delete output[key]
  })

  return output
}

export default clearFieldProps
