import { SrOnly } from '/machinery/SrOnly'
import styles from './Presets.css'
import { useRenderOnMount } from '@kaliber/use-render-on-mount'
import { presets } from '/domain/values'

export function Presets({ formState: [formValues, setFormValues], layoutClassName, onChange }) {
  useRenderOnMount()
  const handleChange = React.useCallback(
    ({ target: { value } }) => {
      if (value) {
        setFormValues(x => ({ ...x, ...JSON.parse(value) }))
        onChange()
      }
    },
    [setFormValues, onChange]
  )

  const value = React.useMemo(() => JSON.stringify(formValues), [formValues])

  return (
    <div className={cx(layoutClassName, styles.component)}>
      <SrOnly><label htmlFor='presets'>Choose a preset</label></SrOnly>
      <select onChange={handleChange} className={styles.select} id='presets' {...{ value }}>
        {presets.map(([value, children]) => <option key={value} {...{ value, children }} />)}
      </select>
    </div>
  )
}
