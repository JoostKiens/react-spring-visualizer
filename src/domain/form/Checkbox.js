import styles from './Checkbox.css'

export function Checkbox({ name, label, formState: [formValues, setFormValues], layoutClassName }) {
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
