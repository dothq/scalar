import React from 'react'

import { About } from './menus/About'
import { Community } from './menus/Community'
import { Company } from './menus/Company'
import { Products } from './menus/Products'

export const menus = [
  {
    name: 'Products',
    component: Products,
  },
  {
    name: 'Company',
    component: Company,
  },
  {
    name: 'Community',
    component: Community,
  },
  {
    name: 'About',
    component: About,
  },
]
