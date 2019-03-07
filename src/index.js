import React from 'react'
import { Formik } from 'formik'

import generateInitialValues from './generateInitialValues'

const entitiesModifiers = {
  text: ['onChangeText'],
  select: ['onValueChange']
}

const _bindEvents = (entity, formikProps) => {
  if (entitiesModifiers.hasOwnProperty(entity)) {
    console.log('Entity to bind: ', entity)

    console.log('Formik props: ', formikProps)
  }

  console.log('Cannot bind ', entity)
  return null
}

export const generateForm = (schema, values = {}, config = {}) => {
  return (
    <Formik
      initialValues={generateInitialValues(schema, values)}
      enableReinitialize={config.enableReinitialize || false}
      render={({ ...props }) => schema.map((field, index) => {
        console.log(field)
        // const boundedEvents = _bindEvents(field.entity, { ...props })

        // console.log('Bounded events: ', boundedEvents)
        return <field.component key={index} />
      })
      }
    />
  )
}
