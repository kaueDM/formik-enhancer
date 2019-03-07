// @flow
import { _validSchema } from './utils'

/**
 * Generate Formik's initialValues prop.
 * @param {Array.<Object>} schema - Array of fields.
 * @param {Object} values - Object to override initialValues values. If you are
 * requesting data asynchronously, this is the place where you inform your
 * response.
 * @return {Object} initialValues object.
 */

const generateInitialValues = (
  schema: Array<Object>,
  values?: { field?: string, value?: any }
): Object => {
  if (_validSchema(schema)) {
    const output = {}

    schema.forEach((field: Object): void => {
      output[field['name']] = field['initialValue'] || ''
    })

    return output
  }

  return console.error('[formik-enhancer] Please inform a populated Array.')
}

export default generateInitialValues
