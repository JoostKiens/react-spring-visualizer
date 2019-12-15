import { Form } from './Form'
import { Visualizer } from './Visualizer'
import { Output } from './Output'
import { Header } from './Header'
import createPersistedState from 'use-persisted-state'
import styles from './App.css'

const useFormState = createPersistedState('config')

export default function App() {
  const [active, setActive] = React.useState(false)
  const formState = useFormState({
    mass: 1, tension: 170, friction: 26,
    clamp: false, precision: 0.01, velocity: 0
  })

  const handleSubmit = React.useCallback(
    evt => {
      evt.preventDefault()
      setActive(x => !x)
    },
    [setActive]
  )

  return (
    <div className={styles.app}>
      <div className={styles.layout}>
        <Header layoutClassName={styles.header} />
        <Form onSubmit={handleSubmit} layoutClassName={styles.form} {...{ formState }} />
        <Visualizer config={formState[0]} layoutClassName={styles.visualizer} {...{ active }} />
        <Output config={formState[0]} layoutClassName={styles.output} />
      </div>
    </div>
  )
}
