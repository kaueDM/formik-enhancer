import * as React from 'react'
import { Formik, InjectedFormikProps } from 'formik'

import renderFields from './renders/renderFields'
import renderChildren from './renders/renderChildren'
import clearFormikProps from './methods/clearFormikProps'
import buildInitialValues from './methods/buildInitialValues'
import buildValidationSchema from './methods/buildValidationSchema'

interface FormProps {
  config: Record<string, any>
  values: Record<string, any>
  schema: Array<Record<string, any>>
}

const generateForm = (props: InjectedFormikProps<FormProps, null>) => {
  const { schema, config, values = {} } = props

  return (
    <Formik
      enableReinitialize
      onSubmit={config.onSubmit}
      validationSchema={buildValidationSchema(schema)}
      initialValues={{ ...buildInitialValues(schema), ...values }}
      render={({ ...props }: any) => (
        <React.Fragment>
          {renderFields(schema, clearFormikProps(props))}
          {renderChildren({ config, formikProps: { ...props } })}
          {console.log('formik values: ', props.values)}
        </React.Fragment>
      )}
    />
  )
}

export default generateForm
