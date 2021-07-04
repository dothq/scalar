import React from 'react'
import { StyledCard, StyledCards } from './style'

import axios from 'axios'
import useSound from 'use-sound'

import { Button } from '../Button'

export const Card = ({
  onClick,
  children,
  type,
  bg,
  colour,
  center,
  style,
  noPadding,
}: {
  onClick?: any
  children: any
  type: 's' | 'm' | 'l'
  bg: any
  colour?: any
  center?: boolean
  style?: any
  noPadding?: boolean
}) => {
  return (
    <StyledCard
      onClick={onClick}
      size={type}
      bg={bg}
      colour={colour}
      center={center}
      style={style}
      noPadding={noPadding}
    >
      {children}
    </StyledCard>
  )
}

export const Cards = () => {
  const [loadedNews, setLN] = React.useState(false)
  const [newsFailed, setNF] = React.useState(false)
  const [news, setNews] = React.useState([
    { title: '', publisher: '', favicon: '' },
    { title: '', publisher: '', favicon: '' },
    { title: '', publisher: '', favicon: '' },
  ])

  const [lightsOn, setLightsOn] = React.useState(true)
  const [lightClicked, setLightClicked] = React.useState(0)
  const [hideLightHint, setHideLightHint] = React.useState(false)

  const [playSoundOn] = useSound(`/assets/card-images/light-on.mp3`)
  const [playSoundOff] = useSound(`/assets/card-images/light-off.mp3`)

  const [tooSmall, setTS] = React.useState(false)

  const toggleLight = () => {
    setLightsOn(!lightsOn)

    if (lightsOn) playSoundOff()
    else playSoundOn()

    setLightClicked(lightClicked + 1)

    if (lightClicked >= 4) {
      setHideLightHint(true)
    }
  }

  React.useEffect(() => {
    if (!loadedNews) {
      axios
        .get('/api/card-data/space-news')
        .then((_) => {
          setNews(_.data.articles)
          setLN(true)
        })
        .catch((_) => setNF(true))
    }
  }, [])

  React.useEffect(() => {
    setTS(window.matchMedia(`(max-width: 1650px)`).matches)
  })

  return (
    <StyledCards>
      <Card
        type="m"
        center
        bg={
          'linear-gradient(rgba(66, 0, 150, 0.7) 100%, rgba(66, 0, 150, 0.7) 100%), url(assets/card-images/privacy-lianhao.jpg) no-repeat'
        }
      >
        <h1>Privacy? Check.</h1>
        <p>
          Dot Browser keeps prying eyes away from your browsing experience by
          blocking ads and trackers.
        </p>
        <Button bg={'#21004A'}>Learn More: Why your privacy matters</Button>
      </Card>

      <Card type="s" bg={'#05FFB4'} colour={'black'} center>
        <h1>Everyday browsing, enhanced.</h1>
        <p>Add some sparkle to your browsing experience by customising Dot.</p>

        <Button bg={'#FFF'}>Customise Dot Browser</Button>
      </Card>

      <Card
        type="l"
        bg={'#1662D3'}
        style={{
          justifyContent: 'center',
          position: 'relative',
          minHeight: 'calc(534px - 72px * 2)',
        }}
      >
        <h1 style={{ maxWidth: '720px' }}>
          A design that doesn't make your eyes beg for mercy.
        </h1>
        <p style={{ maxWidth: '600px' }}>
          We designed Dot to be as clean and minimal as possible. Because nobody
          likes clutter.
        </p>

        <img
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            borderTopLeftRadius: '16px',
            backgroundColor: 'white',
          }}
          src="/assets/card-images/browser-design.svg"
        ></img>
      </Card>

      <Card type="s" bg={'#009633'} center>
        <h1 style={{ maxWidth: '400px' }}>
          Slide to the left, slide to the right.
        </h1>
        <p>
          <a
            style={{ color: 'white', textDecoration: 'none' }}
            className={'aexclude'}
            href="https://www.youtube.com/watch?v=wZv62ShoStY"
          >
            Cha cha real smooth
          </a>
          . Surf the web with gestures in Dot.
        </p>

        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '22px',
            marginTop: '28px',
            width: '369px',
            height: '257px',
          }}
        >
          <i id="gesture-cursor"></i>
        </div>
      </Card>

      <Card
        type="m"
        bg={
          'linear-gradient(180deg, #000002 21.46%, rgba(0, 0, 0, 0) 65.32%), url(/assets/card-images/start-page-nasa.jpg), black'
        }
        center
        style={{ width: 'calc(1045px)' }}
      >
        <h1>A Start Page that’s out of this world.</h1>
        <p style={{ maxWidth: '624px' }}>
          Add widgets, change colours, update background to make your Start Page
          your own.
        </p>

        <div
          style={{
            marginTop: !newsFailed ? '160px' : '',
            display: 'flex',
            flexDirection: 'row',
            gap: '28px',
          }}
        >
          {loadedNews &&
            news[0] &&
            news.map((article: any) => (
              <a
                className={'aexclude'}
                href={article.url}
                key={article.title}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 'calc(278px - 28px * 2)',
                  height: 'calc(185px - 28px * 2)',
                  padding: '28px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(15px)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                <h5
                  style={{
                    margin: '0',
                    fontSize: '18px',
                    color: 'white',
                  }}
                >
                  {article.title
                    ? article.title.length >= 85
                      ? `${article.title.substr(0, 85)}…`
                      : article.title
                    : ''}
                </h5>

                <span
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <i
                    style={{
                      display: 'flex',
                      width: '16px',
                      height: '16px',
                      background: `url(${article.favicon}) no-repeat center center`,
                      backgroundSize: 'cover',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                    }}
                  ></i>
                  <p style={{ margin: 0, color: 'white' }}>
                    {article.publisher}
                  </p>
                </span>
              </a>
            ))}
        </div>
      </Card>

      <Card
        onClick={() => toggleLight()}
        type="l"
        bg={lightsOn ? '#EAAB09' : '#0F0F0F'}
        colour={lightsOn ? 'black' : undefined}
        style={{
          justifyContent: 'center',
          position: 'relative',
          minHeight: 'calc(414px - 72px * 2)',
        }}
      >
        <h1 style={{ maxWidth: '720px' }}>Keep the lights off for trackers.</h1>
        <p style={{ maxWidth: '600px' }}>
          Trackers can follow you everywhere. Which is why Dot Browser blocks
          them so they can’t see what you’re up to.
        </p>

        <img
          onClick={() => toggleLight()}
          style={{
            cursor: 'pointer',
            display: tooSmall || !lightsOn ? 'none' : '',
            position: 'absolute',
            right: 300,
            top: 0,
          }}
          src={`/assets/card-images/trackers-bulb-on.svg`}
        ></img>
        <img
          onClick={() => toggleLight()}
          style={{
            cursor: 'pointer',
            display: tooSmall || lightsOn ? 'none' : '',
            position: 'absolute',
            right: 300,
            top: 0,
          }}
          src={`/assets/card-images/trackers-bulb-off.svg`}
        ></img>

        <img
          style={{
            display: tooSmall ? 'none' : '',
            opacity: hideLightHint ? 0 : 1,
            transition: '3s opacity 1s',
            position: 'absolute',
            right: 450,
            top: 150,
            filter: 'invert(1)',
          }}
          src={'/assets/card-images/click-me-handwriting.svg'}
        ></img>
      </Card>
    </StyledCards>
  )
}
