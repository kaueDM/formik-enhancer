/**
 * @function buildBlurEventProps
 * Build props to return on blurEvent.
 * @param {object} props - Current field props.
 * @return {object} - Cleared props.
 */

type TProps = Record<string, any>

const toKeep = [
  'name',
  'value',
  'error',
  'touched',
  'setFieldValue',
  'setFieldError',
  'setFieldTouched'
]

const buildBlurEventProps = (props: TProps): TProps => {
  const output = { ...props }

  Object.keys(props).forEach((key: string): void => {
    toKeep.indexOf(key) === -1 && delete output[key]
  })

  return output
}

export default buildBlurEventProps
