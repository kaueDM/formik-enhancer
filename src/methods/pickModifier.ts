import checkPlatform from './checkPlatform'

const _nativeModifiers: Array<Record<string, string>> = [
  { type: 'text', prop: 'onChangeText' },
  { type: 'select', prop: 'onValueChange' }
]

const _pickNativeModifier = (type: string): string => {
  return _nativeModifiers.filter((x: Record<string, string>) => {
    return x.type === type
  })[0]['prop']
}

/**
 * @function pickModifier
 * get the correct value modifier for the field.
 * @return {string} - value modifier handler.
 */
const pickModifier = (type: string): string => {
  return checkPlatform() === 'native' ? _pickNativeModifier(type) : 'onChange'
}

export default pickModifier
