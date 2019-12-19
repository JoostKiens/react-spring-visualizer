import styles from './InputNumber.css'

export function InputNumber({ name, label, formState: [formValues, setFormValues], min, max, step, layoutClassName }) {
  const handleChange = React.useCallback(
    ({ target: { value } }) => { setFormValues(x => ({ ...x, [name]: Number(value) })) },
    [name, setFormValues]
  )

  return (
    <label className={cx(styles.component, layoutClassName)}>
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
