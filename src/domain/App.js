import { DefaultVisualizer } from './DefaultVisualizer'
import { Form } from './form/Form'
import { Header } from './Header'
import { Nav } from './Nav'
import { Router, globalHistory } from '@reach/router'
import { SpringVisualizer } from './SpringVisualizer'
import { useRenderOnMount } from '@kaliber/use-render-on-mount'
import createPersistedState from 'use-persisted-state'
import styles from './App.css'

const useFormState = createPersistedState('config')
const valueAttributes = {
  mass: { min: 0.1, max: 20, step: 0.1 },
  tension: { min: 0, max: 500, step: 1 },
  friction: { min: 1, max: 200, step: 1 },
  precision: { min: 0.01, max: 1, step: 0.01 },
  velocity: { min: -50, max: 50, step: 1 }
}

export default function App() {
  const [active, setActive] = React.useState(false)
  const isMounted = useRenderOnMount()
  const formState = useFormState({ mass: 1, tension: 170, friction: 26, clamp: false, precision: 0.01, velocity: 0 })
  const config = formState[0]

  const play = React.useCallback(
    evt => {
      evt && evt.preventDefault()
      setActive(x => !x)
    },
    [setActive]
  )

  React.useEffect(() => { setActive(false) }, [config])
  React.useEffect(() => { return globalHistory.listen(() => { setActive(false) }) }, [])

  const defaultVisualizerProps = React.useMemo(
    () => ({
      onClick: play,
      layoutClassName: styles.visualizerX,
      active, valueAttributes, config
    }),
    [active, config, play]
  )

  return (

    <div className={styles.app}>
      <div className={styles.layout}>
        <Header layoutClassName={styles.header} />
        <Form handleSubmit={play} layoutClassName={styles.form} {...{ formState, valueAttributes, active }} />
        {isMounted && (
          <>
            <Router primary={false} className={styles.visualizer}>
              <SpringVisualizer path='/' onClick={play} {...{ active, valueAttributes, config }} />
              <DefaultVisualizer path='scale' display='scale' {...defaultVisualizerProps} />
              <DefaultVisualizer path='opacity' display='opacity' {...defaultVisualizerProps} />
              <DefaultVisualizer path='translateY' display='translateY' {...defaultVisualizerProps} />
            </Router>
            <Nav layoutClassName={styles.nav} />
          </>
        )}
      </div>
    </div>
  )
}
