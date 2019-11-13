import React, { ComponentElement, Component } from 'react'
import path from 'path'

// tslint:disable: nx-enforce-module-boundaries

export const BUILD_PATH = path.join(__dirname, '..', '..', '..', '..', 'dist', 'apps', 'website')

export function build(view:React.ComponentClass<unknown, any>, props?:object):ComponentElement<unknown, Component<unknown, any, any>> {
  const Factory = React.createFactory(view)
  return Factory(props)
}