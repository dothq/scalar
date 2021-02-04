import React from 'react'

import { Layout } from '../components/Layout'

import assets from '../assets/home'
import { Button } from '../components/Button'

import '../styles/home.css';

const Home = () => {
  const [buiImage, setBuiImage] = React.useState("");
  const [buiReady, setBuiReady] = React.useState(false);

  React.useEffect(() => {
    if(window.matchMedia("(prefers-color-scheme: dark)").matches) setBuiImage(assets.browserLight);
    else setBuiImage(assets.browser);

    let i: any = new Image();
    i.src = buiImage;

    i.addEventListener("load", () => {
      setBuiReady(true)
      i = null;
    })
  }, [buiImage])

  return (
    <Layout>
      <div>
        <div className={"grid"}>
          <div>
            <h1>Take back your privacy.</h1>
            <p>
              Dot Browser is a privacy-conscious web browser with smarts
              built-in for protection against trackers and advertisements
              online.
            </p>

            <div className={"grid-btns"}>
              <Button
                onClick={() => console.log('Button')}
                type="secondary"
                href="/products/browser"
              >
                Learn more
              </Button>

              <Button
                onClick={() => console.log('Button')}
                type="primary"
                href="https://github.com/dothq/browser-pr-builds/releases"
              >
                Download Dot Browser
              </Button>
            </div>
          </div>

          <div className={'landing-showoff'} style={{ opacity: buiReady ? 1 : 0 }}>
            <img src={buiImage} id="browser-ui" width="800" height="492" />
            <img id="browser-wallpaper" src="https://source.unsplash.com/collection/67042424" width="800" height="492" />
          </div>

        </div>

        <div className={"section"}>
          <h2>
            We built a privacy browser in a world where your personal data is
            sold to the highest bidder.
          </h2>
          <p>
            Your data is constantly being sold through large advertisement
            networks tracking what sites you like to visit online.
          </p>
        </div>

        <div className={"features"}>
          <div>
            <img src={assets.lock} alt="" />
            <h3>Respects your privacy</h3>
            <p>
              We never send telemetry or crash reports without your consent.
            </p>
          </div>

          <div>
            <img src={assets.sparkles} alt="" />
            <h3>Make Dot Browser yours</h3>
            <p>
              Browse our library of thousands of themes and extensions to get
              Dot just how you like it.
            </p>
          </div>

          <div>
            <img src={assets.mail} alt="" />
            <h3>Protect your mailbox</h3>
            <p>
              We will offer to mask your email address when you sign up for
              sites or services.
            </p>
          </div>

          <div>
            <img src={assets.shield} alt="" />
            <h3>Block nasty ads and trackers</h3>
            <p>
              We will offer to mask your email address when you sign up for
              sites or services.
            </p>
          </div>

          <div>
            <img src={assets.migrate} alt="" />
            <h3>Migrate from Chrome or Edge</h3>
            <p>
              Dot can migrate all your data from your previous browser in just
              a few clicks.
            </p>
          </div>

          <div>
            <img src={assets.opensource} alt="" />
            <h3>Powered by Open Source</h3>
            <p>
              Dot is built on top of open-source software meaning the source
              code is open to anyone.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
