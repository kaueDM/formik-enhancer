import React from 'react'
import { Formik } from 'formik'

import generateInitialValues from '../methods/generateInitialValues'

export const generateForm = (schema, values = {}) => {
  return (
    <Formik
      enableReinitialize
      initialValues={generateInitialValues(schema, values)}
      render={({ ...props }) => schema.map((field, index) => {
        console.log(field)

        const type = field['type'] || 'text'

        const fieldProps = {
          name: field['name'],
          label: field['label'],
          placeholder: field['placeholder'],
          value: props['values'][field['name']]
        }

        type === 'text' && (fieldProps['secureTextEntry'] = true)

        return <field.component key={index} {...fieldProps} />
      })
      }
    />
  )
}
