import * as Yup from 'yup'

/**
 * @function buildValidationSchema
 * Build Formik's validationSchema property.
 * @param {Array.<object>} schema - Array of fields.
 * @return {object} - Yup's validation schema.
 */
const buildValidationSchema = (
  schema: Record<string, any>
): Record<string, any> => {
  const validationShape = schema.reduce((
    acc: Record<string, any>,
    iteratee: Record<string, any>
  ) => {
    acc[iteratee['name']] = iteratee['validation'] || ''
    return acc
  }, {})

  return Yup.object().shape(validationShape)
}

export default buildValidationSchema
