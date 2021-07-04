import React from 'react'
import { StyledFaq, StyledFaqAnswer, StyledFaqItem } from './style'

const Answer = ({ open, children }: { open: boolean; children: any }) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const [height, setHeight] = React.useState(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) setHeight(1000)

    const rect = el?.getBoundingClientRect()

    setHeight(rect && rect.height ? rect.height + 32 * 2 : 1000)
  }, [open])

  return (
    <StyledFaqAnswer style={{ maxHeight: open ? height + 'px' : '0px' }}>
      <div ref={ref}>{children}</div>
    </StyledFaqAnswer>
  )
}

export const FAQ = () => {
  const [open, setOpen] = React.useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  } as any)

  const openPanel = (id: number) => {
    setOpen({ ...open, [id]: !open[id] })
  }

  return (
    <StyledFaq>
      <StyledFaqItem open={open[0]} onClick={() => openPanel(0)}>
        <div>
          What is Dot Browser?
          <i className={'down-icon'}></i>
        </div>
      </StyledFaqItem>

      <Answer open={open[0]}>
        <div>
          Dot Browser is a privacy-focused web browser with a built-in ad
          blocker and tracker blocker to stop sneaky trackers and ads following
          you around the internet.
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <>
            It also features a refreshing user interface that is simple and easy
            on the eyes.
          </>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <>
            Our goal is to make your privacy matter and hopefully Dot brings you
            a step closer to that.
          </>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <strong>Privacy is a right. Not a privilage.</strong>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <span style={{ display: 'block' }}>
            You can learn more about our web browser through these links:
            <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
            <ul
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <li>
                <a target={'_blank'} href="/products/desktop/download">
                  Try it out
                </a>
              </li>
              <li>
                <a target={'_blank'} href="/products/desktop/features">
                  Features
                </a>
              </li>
              <li>
                <a target={'_blank'} href="/products/desktop/comparison">
                  Comparison
                </a>
              </li>
              <li>
                <a target={'_blank'} href="/products/desktop/whats-new">
                  What's New
                </a>
              </li>
            </ul>
          </span>
        </div>
      </Answer>

      <hr></hr>

      <StyledFaqItem open={open[1]} onClick={() => openPanel(1)}>
        <div>
          Is Dot Browser based on Chrome?
          <i className={'down-icon'}></i>
        </div>
      </StyledFaqItem>

      <Answer open={open[1]}>
        <div>
          <strong>Nope, Dot Browser is proud to be based on Firefox.</strong>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <>
            We decided to go with Firefox as the base for Dot Browser because
            there are already a plethora of Chromium-based web browsers out
            there, and we want to stand out among the others.
          </>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <>
            Furthermore, by using a Chromium-based browser like Brave or Chrome
            you are contributing to Google's massive monopoly and it allows them
            to hold the entire browser market.
          </>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <a
            target={'_blank'}
            href="https://siasky.net/PAC1yX5eytS0iJRCqcdu0QnI1DBIoILUEGYA7judB5JBdA"
          >
            Imagine a world where everything is Chromium-based.
          </a>
        </div>
      </Answer>

      <hr></hr>

      <StyledFaqItem open={open[2]} onClick={() => openPanel(2)}>
        <div>
          What platforms support Dot Browser?
          <i className={'down-icon'}></i>
        </div>
      </StyledFaqItem>

      <Answer open={open[2]}>
        <div>
          <span style={{ display: 'block' }}>
            As of right now,{' '}
            <strong>
              Dot Browser is supported on Windows, macOS and Linux.
            </strong>
          </span>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <span style={{ display: 'block' }}>
            If you are looking for more specific system requirements for Dot
            Browser, please check our{' '}
            <a href={'/products/desktop/system-requirements'}>
              system requirements page
            </a>
            .
          </span>
        </div>
      </Answer>

      <hr></hr>

      <StyledFaqItem open={open[3]} onClick={() => openPanel(3)}>
        <div>
          How is Dot Browser more private than other browsers?
          <i className={'down-icon'}></i>
        </div>
      </StyledFaqItem>

      <hr></hr>

      <StyledFaqItem open={open[4]} onClick={() => openPanel(4)}>
        <div>
          Is Dot Browser open source?
          <i className={'down-icon'}></i>
        </div>
      </StyledFaqItem>

      <Answer open={open[4]}>
        <div>
          <strong>We 💖 open-source.</strong>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <span style={{ display: 'block' }}>
            So much so that Dot Browser and all our other products are
            open-source on our{' '}
            <a target={'_blank'} href="https://github.com/dothq">
              GitHub
            </a>
            .
          </span>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <span style={{ display: 'block' }}>
            If you are looking to contribute, here are some repositories you
            could take a look at:
            <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
            <ul
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <li>
                <a
                  target={'_blank'}
                  href="https://github.com/dothq/browser-desktop"
                >
                  Dot Browser Desktop - dothq/browser-desktop
                </a>
              </li>
              <li>
                <a target={'_blank'} href="https://github.com/dothq/ntp">
                  Dot Browser Start Page - dothq/ntp
                </a>
              </li>
              <li>
                <a target={'_blank'} href="https://github.com/dothq/one">
                  Dot One - dothq/one
                </a>
              </li>
            </ul>
          </span>
        </div>
      </Answer>

      <hr></hr>

      <StyledFaqItem open={open[5]} onClick={() => openPanel(5)}>
        <div>
          Is there anyway I donate to help you financially?
          <i className={'down-icon'}></i>
        </div>
      </StyledFaqItem>

      <Answer open={open[5]}>
        <div>
          <strong>Yes!</strong>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <span style={{ display: 'block' }}>
            You can send donations to us on our{' '}
            <a target={'_blank'} href={'https://patreon.com/dothq'}>
              Patreon
            </a>{' '}
            or{' '}
            <a target={'_blank'} href={'https://liberapay.com/dothq'}>
              Liberapay
            </a>{' '}
            pages.
          </span>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <span style={{ display: 'block' }}>
            We appreciate any donations big or small as it helps to fund our
            services and servers.
          </span>
        </div>
      </Answer>

      <hr></hr>

      <StyledFaqItem open={open[6]} onClick={() => openPanel(6)}>
        <div>
          I have a question about Dot Browser and or where can I find support?
          <i className={'down-icon'}></i>
        </div>
      </StyledFaqItem>

      <Answer open={open[6]}>
        <div>
          <span style={{ display: 'block' }}>
            Hopefully our FAQ answered one of your questions. However if it did
            not, we would be happy to answer your questions on our social
            channels.
          </span>
          <div dangerouslySetInnerHTML={{ __html: `<br>` }} />
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <a target={'_blank'} href="https://dothq.link/dsc">
                Dot Community Discord Server
              </a>
            </li>
            <li>
              <a target={'_blank'} href="https://dothq.link/matrix">
                Dot Community Matrix Room
              </a>
            </li>
            <li>
              <a target={'_blank'} href="https://twitter.com/DotBrowser">
                @DotBrowser on Twitter
              </a>
            </li>
            <li>
              <a target={'_blank'} href="https://github.com/dothq">
                Discussions on GitHub
              </a>
            </li>
            <li>
              <a target={'_blank'} href="https://support.dothq.co">
                Get Help at our Support Centre
              </a>
            </li>
          </ul>
        </div>
      </Answer>
    </StyledFaq>
  )
}
