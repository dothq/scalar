import React from 'react'

export const Contributor = ({ name = '', avatar = '', profile = '' }) => (
  <a
    href={profile}
    style={{
      display: 'block',
      textAlign: 'center',
      color: 'black',
      textDecoration: 'none',
    }}
  >
    <img src={avatar} alt="name" style={{ width: 100, borderRadius: 50 }} />
    <div>{name}</div>
  </a>
)
