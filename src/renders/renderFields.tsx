import * as React from 'react'
import buildFieldProps from '../methods/buildFieldProps'

interface FieldProps {
  field: any
  index: string
}

// FC stands to FunctionComponent. Either one can be used.
const _renderField: React.FC<FieldProps> = ({ field, index }) => {
  const fieldProps = buildFieldProps(field)
  const FieldComponent = field.component

  return <FieldComponent key={index} {...fieldProps} />
}

/**
 * @function renderFields
 * Iterates the schema and render fields
 */

const renderFields = (schema: Record<string, any>, formikProps: any) => {
  return schema.map((field: any, index: string) => {
    return _renderField({ field: { ...field, ...formikProps }, index })
  })
}


export default renderFields
