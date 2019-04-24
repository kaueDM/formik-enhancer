import * as React from 'react'

interface IChildren {
  config: Record<string, any>
  formikProps: Record<string, any>
}

/**
 * @function renderChildren
 * Renders whatever children you pass as parameter
 */

const renderChildren: React.FC<IChildren> = ({ config, formikProps }) => {
  return  config && config.children ? config.children(formikProps) : null
}


export default renderChildren
