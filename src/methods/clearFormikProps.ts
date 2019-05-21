const toKeep: Array<string> = [
  'errors',
  'handleBlur',
  'handleChange',
  'setFieldError',
  'setFieldTouched',
  'setFieldValue',
  'touched',
  'values'
]

/**
 * @function clearFormikProps
 * Remove unnecessary Formik's props.
 * @param {object} props - Formik props
 * @return {object} filtered formik props.
 */
const clearFormikProps = (props: Record<string, any>): Record<string, any> => {
  const output: Record<string, any> = { ...props }

  Object.keys(props).forEach((key: string): any => {
    return toKeep.indexOf(key) === -1 && delete output[key]
  })

  return output
}

export default clearFormikProps
