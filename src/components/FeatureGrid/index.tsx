import React from 'react'

import assets from '../../assets/home'

export const FeatureGrid = ({ id }: { id?: string }) => {
  return (
    <div className={'features'} id={id}>
      <div>
        <img src={assets.lock} alt="" />
        <h3>Respects your privacy</h3>
        <p>We never send telemetry or crash reports without your consent.</p>
      </div>

      <div>
        <img src={assets.sparkles} alt="" />
        <h3>Make Dot Browser yours</h3>
        <p>
          Browse our library of thousands of themes and extensions to get Dot
          just how you like it.
        </p>
      </div>

      <div>
        <img src={assets.mail} alt="" />
        <h3>Protect your mailbox</h3>
        <p>
          We will offer to mask your email address when you sign up for sites or
          services.
        </p>
      </div>

      <div>
        <img src={assets.shield} alt="" />
        <h3>Block nasty ads and trackers</h3>
        <p>
          We will offer to mask your email address when you sign up for sites or
          services.
        </p>
      </div>

      <div>
        <img src={assets.migrate} alt="" />
        <h3>Migrate from Chrome or Edge</h3>
        <p>
          Dot can migrate all your data from your previous browser in just a few
          clicks.
        </p>
      </div>

      <div>
        <img src={assets.opensource} alt="" />
        <h3>Powered by Open Source</h3>
        <p>
          Dot is built on top of open-source software meaning the source code is
          open to anyone.
        </p>
      </div>
    </div>
  )
}
