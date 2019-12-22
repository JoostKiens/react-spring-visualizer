import { SrOnly } from '/machinery/SrOnly'
import styles from './Presets.css'

const presets = [
  ['', 'Presets'],
  [JSON.stringify({ mass: 1, tension :170, friction :26 }), 'Default'],
  [JSON.stringify({ mass: 1, tension :120, friction: 14 }), 'Gentle'],
  [JSON.stringify({ mass: 1, tension :180, friction: 12 }), 'Wobbly'],
  [JSON.stringify({ mass: 1, tension :210, friction: 20 }), 'Stiff'],
  [JSON.stringify({ mass: 1, tension :280, friction: 60 }), 'Slow'],
  [JSON.stringify({ mass: 1, tension :280, friction: 120 }), 'Molasses']
]

export function Presets({ formState, layoutClassName, onChange }) {
  const [formValues, setFormValues] = React.useMemo(() => formState, [formState])
  const handleChange = React.useCallback(
    ({ target: { value } }) => {
      if (value) {
        setFormValues(x => ({ ...x, ...JSON.parse(value) }))
        onChange()
      }
    },
    [setFormValues, onChange]
  )

  const currentValue = React.useMemo(
    () => {
      const { mass, tension, friction } = formValues
      return JSON.stringify({ mass, tension, friction })
    },
    [formValues]
  )

  return (
    <div className={layoutClassName}>
      <SrOnly><label htmlFor='presets'>Choose a preset</label></SrOnly>
      <select onChange={handleChange} className={styles.component} id='presets' value={currentValue}>
        {presets.map(([value, children]) => <option key={value} {...{ value, children }} />)}
      </select>
    </div>
  )
}
