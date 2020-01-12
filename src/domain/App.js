import { DefaultVisualizer } from './DefaultVisualizer'
import { Form } from './form/Form'
import { Header } from './Header'
import { Nav } from './Nav'
import { SpringVisualizer } from './SpringVisualizer'
import { Documentation } from './Documentation'
import { ContentContainer } from './ContentContainer'
import { SiteFooter } from './SiteFooter'
import { defaultValues } from './values'
import { track } from './track'
import createPersistedState from 'use-persisted-state'
import styles from './App.css'


const valueAttributes = {
  mass: { min: 0.1, max: 20, step: 0.1 },
  tension: { min: 1, max: 500, step: 1 },
  friction: { min: 1, max: 180, step: 1 },
  precision: { min: 0.01, max: 1, step: 0.001 },
  velocity: { min: -50, max: 50, step: 1 }
}

export default function App() {
  // @ts-ignore
  const useFormState = createPersistedState('config', global.sessionStorage)
  const [display, setDisplay] = React.useState('spring')
  const [active, setActive] = React.useState(false)
  const formState = useFormState(defaultValues)
  const config = formState[0]

  React.useEffect(
    () => {
      navigate()
      window.addEventListener('hashchange', navigate, false)
      return () => { window.removeEventListener('hashchange', navigate) }

      function navigate() {
        setActive(false)
        const display = window.location.hash.replace('#', '') || 'spring'
        setDisplay(display)
        track({ 'visualizer': display })
      }
    },
    []
  )

  const play = React.useCallback(
    evt => {
      evt && evt.preventDefault()
      setActive(x => !x)
    },
    [setActive]
  )

  React.useEffect(() => { if (active) track({ 'play': true }) }, [active])
  React.useEffect(() => { setActive(false) }, [config])

  return (
    <div className={styles.app}>
      <Ph layoutCLassName={styles.ph} />
      <ContentContainer>
        <div className={styles.layout}>
          <Header layoutClassName={styles.header} />
          <Form handleSubmit={play} layoutClassName={styles.form} {...{ formState, valueAttributes, active }} />
          <div className={styles.visualizer}>
            {display === 'spring'
              ? <SpringVisualizer onClick={play} {...{ active, valueAttributes, config }} />
              : <DefaultVisualizer onClick={play} {...{ active, valueAttributes, config, display }} />
            }
          </div>
          <Nav layoutClassName={styles.nav} {...{ display }} />
        </div>
      </ContentContainer>
      <div className={styles.documentation}>
        <ContentContainer>
          <Documentation />
        </ContentContainer>
      </div>
      <div className={styles.siteFooter}>
        <ContentContainer>
          <SiteFooter />
        </ContentContainer>
      </div>
    </div>
  )
}


function Ph({ layoutCLassName }) {
  return (
    <a
      href="https://www.producthunt.com/posts/react-spring-visualizer?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-react-spring-visualizer"
      target="_blank"
      rel="noopener noreferrer"
      className={layoutCLassName}
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=180624&theme=dark"
        alt="React-spring visualizer - The missing visualizer for your react-spring UI animations | Product Hunt Embed"
        style={{ width: 250, height: 54 }} width="250px" height="54px"
      />
    </a>
  )
}
