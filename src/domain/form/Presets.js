import { SrOnly } from '/machinery/SrOnly'
import styles from './Presets.css'

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

  const value = React.useMemo(
    () => {
      const { mass, tension, friction } = formValues
      return JSON.stringify({ mass, tension, friction })
    },
    [formValues]
  )

  return (
    <div className={layoutClassName}>
      <SrOnly><label htmlFor='presets'>Choose a preset</label></SrOnly>
      <select onChange={handleChange} className={styles.component} id='presets' {...{ value }}>
        <option value=''>Presets</option>
        <option value='{"mass":1,"tension":170,"friction":26}'>Default</option>
        <option value='{"mass":1,"tension":120,"friction":14}'>Gentle</option>
        <option value='{"mass":1,"tension":180,"friction":12}'>Wobbly</option>
        <option value='{"mass":1,"tension":210,"friction":20}'>Stiff</option>
        <option value='{"mass":1,"tension":280,"friction":60}'>Slow</option>
        <option value='{"mass":1,"tension":280,"friction":120}'>Molasses</option>
      </select>
    </div>
  )
}
