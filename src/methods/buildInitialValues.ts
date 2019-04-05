/**
 * @function buildInitialValues
 * Build Formik's initialValues property.
 * @param {Array.<object>} schema - Array of fields.
 * @param {object} values - Object to override initialValues values. If you are
 * requesting data asynchronously, this is the place where you inform your
 * response.
 * @return {object} initialValues object.
 */
const buildInitialValues = (
  schema: Array<Record<string, object>>,
  values?: Record<string, object>
): Record<string, object> => {
  return schema.reduce((
    acc: Record<string, object>,
    iteratee: Record<string, any>
  ): Record<string, object> => {
    acc[iteratee['name']] = iteratee['initialValue'] || ''
    return acc
  }, { ...values })
}

export default buildInitialValues
