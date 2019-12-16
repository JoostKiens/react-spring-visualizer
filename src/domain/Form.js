import { useClipboard } from 'use-clipboard-copy'
import styles from './Form.css'

export function Form({ onSubmit, formState, layoutClassName }) {
  return (
    <form {...{ onSubmit }} className={cx(styles.component, layoutClassName)}>
      <Presets layoutClassName={styles.presets} {...{ formState, onSubmit }} />
      <InputNumberGroup
        name='mass' label='Mass' layoutClassName={styles.inputGroup}
        min={0} max={20} step={0.1} {...{ formState }}
      />
      <InputNumberGroup
        name='tension' label='Tension' layoutClassName={styles.inputGroup}
        min={0} max={500} step={1} {...{ formState }}
      />
      <InputNumberGroup
        name='friction' label='Friction' layoutClassName={styles.inputGroup}
        min={0} max={500} step={1} {...{ formState }}
      />
      <InputNumberGroup
        name='precision' label='Precision' layoutClassName={styles.inputGroup}
        min={0} max={1} step={0.01} {...{ formState }}
      />
      <InputNumberGroup
        name='velocity' label='Velocity' layoutClassName={styles.inputGroup}
        min={0} max={100} step={0.1} {...{ formState }}
      />
      <CheckboxGroup
        name='clamp' label='Clamp' layoutClassName={styles.inputGroup}
        {...{ formState }}
      />
      <div className={styles.buttonGroup}>
        <button className={styles.submitButton}>GO!</button>
        <CopyToClipboard layoutClassName={styles.copyToClipboard} config={formState[0]} />
      </div>
    </form>
  )
}

function InputNumberGroup({ name, label, formState: [formValues, setFormValues], min, max, step, layoutClassName }) {
  const handleChange = React.useCallback(
    ({ target: { value } }) => { setFormValues(x => ({ ...x, [name]: Number(value) })) },
    [name, setFormValues]
  )

  return (
    <label className={cx(styles.componentInputNumberGroup, layoutClassName)}>
      <span className={styles.numberLabel}>{label}</span>
      <input
        type='number' className={styles.numberInput} onChange={handleChange}
        value={formValues[name]} {...{ min, max, step }}
      />
      <input
        type='range' className={styles.range} onChange={handleChange}
        value={formValues[name]} {...{ min, max, step }}
      />
    </label>
  )
}

function CheckboxGroup({ name, label, formState: [formValues, setFormValues], layoutClassName }) {
  const handleChange = React.useCallback(
    () => { setFormValues(x => ({ ...x, [name]: !x[name] })) },
    [name, setFormValues]
  )

  return (
    <label className={cx(styles.componentCheckboxGroup, layoutClassName)}>
      <input className={styles.checkboxInput} onChange={handleChange} type='checkbox' checked={formValues[name]} />
      <span className={styles.checkboxLabel}>{label}</span>
    </label>
  )
}

function CopyToClipboard({ layoutClassName, config }) {
  const clipboard = useClipboard()
  const handleClick = React.useCallback(() => { clipboard.copy(JSON.stringify(config, null, 2)) }, [clipboard, config])

  return (
    <button
      className={cx(styles.componentCopyToClipboard, layoutClassName)}
      type='button'
      onClick={handleClick}
      title='Copy configuration to clipboard'
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z" /></svg>
    </button>
  )
}

function Presets({ formState, layoutClassName, onSubmit }) {
  const [formValues, setFormValues] = React.useMemo(() => formState, [formState])
  const handleChange = React.useCallback(
    ({ target: { value } }) => {
      if (value) {
        setFormValues(x => ({ ...x, ...JSON.parse(value) }))
        onSubmit()
      }
    },
    [setFormValues, onSubmit]
  )

  const value = React.useMemo(
    () => {
      const { mass, tension, friction } = formValues
      return JSON.stringify({ mass, tension, friction })
    },
    [formValues]
  )

  return (
    <select onChange={handleChange} className={cx(styles.componentPresets, layoutClassName)} {...{ value }}>
      <option value=''>Presets</option>
      <option value='{"mass":1,"tension":170,"friction":26}'>Default</option>
      <option value='{"mass":1,"tension":120,"friction":14}'>Gentle</option>
      <option value='{"mass":1,"tension":180,"friction":12}'>Wobbly</option>
      <option value='{"mass":1,"tension":210,"friction":20}'>Stiff</option>
      <option value='{"mass":1,"tension":280,"friction":60}'>Slow</option>
      <option value='{"mass":1,"tension":280,"friction":120}'>Molasses</option>
    </select>
  )
}
