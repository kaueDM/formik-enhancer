import checkPlatform from './checkPlatform'

const _webProps = (field: any): Record<string, any> => {
  const webProps: Record<string, any> = {
    ...field,
    value: field['values'][field['name']]
  }

  delete webProps.initialValue

  return webProps
}

const _nativeProps = (field: any): Record<string, any> => {
  const type: string = field.type || 'text'
  const nativeProps: Record<string, any> = { ...field }

  if (type === 'text') {
    nativeProps['value'] = field['values'][field['name']]
    field['secure'] && (nativeProps['secureTextEntry'] = true)
  }

  if (type === 'select') {
    nativeProps['items'] = field['items']
    nativeProps['selectedValue'] = field['values'][field['name']]
  }

  return nativeProps
}

/**
 * @function addPlatformFieldProps
 * Pass the correct props to a field based on the current platform/environment.
 * @param {object} field - Field to filter props.
 * @return {object} - Filtered props.
 */
const addPlatformFieldProps = (field: any): Record<string, any> => {
  return checkPlatform() === 'web' ? _webProps(field) : _nativeProps(field)
}

export default addPlatformFieldProps
