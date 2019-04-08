import * as React from 'react'

/**
 * @function renderChildren
 * Renders whatever children you pass as parameter
 */

const renderChildren: React.FC<any> = ({ config, formikProps }) => {
  return  config && config.children ? config.children(formikProps) : null
}


export default renderChildren
