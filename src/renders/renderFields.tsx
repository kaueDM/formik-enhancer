import * as React from 'react'
import buildFieldProps from '../methods/buildFieldProps'

interface IFields {
  field: any
  index: string
}

const _isValidArray = (toTest: any): boolean => {
  return !!(Array.isArray(toTest) && toTest.length)
}

const _renderItems: any = (
  items: Array<Record<string, any>>,
  renderItem: any
) => {
  if (_isValidArray(items)) {
    return items.map((opt: Record<string, any>, index: number) => {
      return renderItem(opt, index.toString())
    })
  }

  return null
}

const _renderField: React.FC<IFields> = ({ field, index }) => {
  const fieldProps = buildFieldProps(field)
  const FieldComponent = field.component

  if (field.type === 'select') {
    return (
      <FieldComponent key={index} {...fieldProps}>
        {
          field.renderItem &&
          _renderItems(field.items, field.renderItem)
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
