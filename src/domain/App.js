import { DefaultVisualizer } from './DefaultVisualizer'
import { Form } from './form/Form'
import { Header } from './Header'
import { Nav } from './Nav'
import { SpringVisualizer } from './SpringVisualizer'
import { Documentation } from './Documentation'
import { ContentContainer } from './ContentContainer'
import { SiteFooter } from './SiteFooter'
import { defaultValues } from './values'
import createPersistedState from 'use-persisted-state'
import styles from './App.css'

const useFormState = createPersistedState('config')
const valueAttributes = {
  mass: { min: 0.1, max: 20, step: 0.1 },
  tension: { min: 1, max: 500, step: 1 },
  friction: { min: 1, max: 200, step: 1 },
  precision: { min: 0.01, max: 1, step: 0.001 },
  velocity: { min: -50, max: 50, step: 1 }
}

export default function App() {
  const [display, setDisplay] = React.useState('spring')
  const [active, setActive] = React.useState(false)
  const formState = useFormState(defaultValues)
  const config = formState[0]

  const play = React.useCallback(
    evt => {
      evt && evt.preventDefault()
      setActive(x => !x)
    },
    [setActive]
  )

  React.useEffect(() => { setActive(false) }, [config])

  React.useEffect(
    () => {
      navigate()
      window.addEventListener('hashchange', navigate, false)
      return () => { window.removeEventListener('hashchange', navigate) }

      function navigate() {
        setActive(false)
        setDisplay(window.location.hash.replace('#', '') || 'spring')
      }
    },
    []
  )

  return (
    <div className={styles.app}>
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
