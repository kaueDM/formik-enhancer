import * as React from 'react'
import buildFieldProps from '../methods/buildFieldProps'

interface IFields {
  field: any
  index: string
}

const _isValidArray = (toTest: any): boolean => {
  return !!(Array.isArray(toTest) && toTest.length)
}

const _renderOptions: any = (
  options: Array<Record<string, any>>,
  renderOption: any
) => {
  if (_isValidArray(options)) {
    return options.map((opt: Record<string, any>, index: number) => {
      return renderOption(opt, index.toString())
    })
  }

  return null
}

// FC stands to FunctionComponent. Either one can be used.
const _renderField: React.FC<IFields> = ({ field, index }) => {
  const fieldProps = buildFieldProps(field)
  const FieldComponent = field.component

  if (field.type === 'select') {
    return (
      <FieldComponent key={index} {...fieldProps}>
        {
          field.renderOption &&
          _renderOptions(field.options, field.renderOption)
        }
      </FieldComponent>
    )
  }

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
