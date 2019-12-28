import { Form } from './form/Form'
import { Visualizer } from './Visualizer'
import { SpringVisualizer } from './SpringVisualizer'
import { Header } from './Header'
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
  const formState = useFormState({
    mass: 1, tension: 170, friction: 26,
    clamp: false, precision: 0.01, velocity: 0
  })
  const config = formState[0]

  React.useEffect(
    () => { setActive(false) },
    [config]
  )

  const play = React.useCallback(
    evt => {
      evt && evt.preventDefault()
      setActive(x => !x)
    },
    [setActive]
  )



  return (
    <div className={styles.app}>
      <div className={styles.layout}>
        <Header layoutClassName={styles.header} />
        <Form handleSubmit={play} layoutClassName={styles.form} {...{ formState, valueAttributes, active }} />
        <SpringVisualizer
          onClick={play}
          config={formState[0]}
          layoutClassName={styles.visualizer}
          {...{ active, valueAttributes }}
        />
      </div>
    </div>
  )
}
