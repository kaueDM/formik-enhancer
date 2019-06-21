const _defaultValue = (field: Record<string, any>): string | boolean => {
  return field['type'] === 'boolean' ? false : ''
}

/**
 * @function buildInitialValues
 * Build Formik's initialValues property.
 * @param {Array.<object>} schema - Array of fields.
 * @return {object} initialValues object.
 */
const buildInitialValues = (
  schema: Array<Record<string, object>>
): Record<string, object> => {
  return schema.reduce((
    acc: Record<string, object>,
    iteratee: Record<string, any>
  ): Record<string, object> => {
    acc[iteratee['name']] = iteratee['initialValue'] || _defaultValue(iteratee)
    return acc
  }, {})
}

export default buildInitialValues
