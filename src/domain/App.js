import { Form } from './form/Form'
import { DefaultVisualizer } from './DefaultVisualizer'
import { SpringVisualizer } from './SpringVisualizer'
import { Header } from './Header'
import { Nav } from './Nav'
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
  const [display, setDisplay] = React.useState('spring')
  const formState = useFormState({
    mass: 1, tension: 170, friction: 26,
    clamp: false, precision: 0.01, velocity: 0
  })
  const config = formState[0]

  const play = React.useCallback(
    evt => {
      evt && evt.preventDefault()
      setActive(x => !x)
    },
    [setActive]
  )

  React.useEffect(
    () => { setActive(false) },
    [config, display]
  )

  return (
    <div className={styles.app}>
      <div className={styles.layout}>
        <Header layoutClassName={styles.header} />
        <Form handleSubmit={play} layoutClassName={styles.form} {...{ formState, valueAttributes, active }} />
        { display === 'spring'
          ? (
            <SpringVisualizer
              onClick={play}
              config={formState[0]}
              layoutClassName={styles.visualizer}
              {...{ active, valueAttributes }}
            />
          )
          : (
            <DefaultVisualizer
              onClick={play}
              config={formState[0]}
              layoutClassName={styles.visualizer}
              {...{ active, display, valueAttributes }}
            />
          )
        }
        <Nav layoutClassName={styles.nav} {...{ display, setDisplay }} />
      </div>
    </div>
  )
}
