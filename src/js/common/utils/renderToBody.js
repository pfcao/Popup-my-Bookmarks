// @flow strict

import type {Element} from 'react'
import {render} from 'react-dom'

export default (app: Element<any>) => {
  const rootEl = document.createElement('div')

  render(app, rootEl)

  if (document.body) document.body.appendChild(rootEl)
}