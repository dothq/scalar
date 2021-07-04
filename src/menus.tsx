import React from 'react'

import { About } from './menus/About'
import { Community } from './menus/Community'
import { Company } from './menus/Company'
import { Products } from './menus/Products'

export const menus: any[] = [
  {
    name: 'Products',
    component: Products,
  },
  {
    name: 'Blog',
    component: <></>,
  },
  {
    name: 'Help',
    component: <></>
  },
  {
    name: 'About',
    component: About,
  },
]
