import * as React from 'react'
import { Formik, InjectedFormikProps } from 'formik'

import renderFields from '../renders/renderFields'
import buildInitialValues from '../methods/buildInitialValues'
import buildValidationSchema from '../methods/buildValidationSchema'

interface FormProps {
  config: Record<string, any>
  values: Record<string, any>
  schema: Array<Record<string, any>>
}

export const generateForm = (props: InjectedFormikProps<FormProps, null>) => {
  const { schema } = props

  return (
    <Formik
      onSubmit={(v: any): any => console.log(v)}
      initialValues={buildInitialValues(schema)}
      validationSchema={buildValidationSchema(schema)}
      render={({ ...props }: any) => (
        <React.Fragment>
          {renderFields(schema, { ...props })}
        </React.Fragment>
      )}
    />
  )
}
