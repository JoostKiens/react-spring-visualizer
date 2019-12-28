import { InputNumber } from './InputNumber'
import { Checkbox } from './Checkbox'
import { Presets } from './Presets'
import { Button } from './Button'
import { CopyToClipboard } from './CopyToClipboard'
import styles from './Form.css'

export function Form({ handleSubmit, formState, layoutClassName, valueAttributes, active }) {
  const getAttributes = React.useCallback(
    (key) => ({ min: valueAttributes[key].min, max: valueAttributes[key].max, step: valueAttributes[key].step }),
    [valueAttributes]
  )

  return (
    <form onSubmit={handleSubmit} className={cx(styles.component, layoutClassName)}>
      <Presets layoutClassName={styles.presets} onChange={handleSubmit} {...{ formState }} />
      <InputNumber
        name='mass' label='Mass' layoutClassName={styles.inputNumber}
        {...{ formState, ...getAttributes('mass') }}
      />
      <InputNumber
        name='tension' label='Tension' layoutClassName={styles.inputNumber}
        {...{ formState, ...getAttributes('tension') }}
      />
      <InputNumber
        name='friction' label='Friction' layoutClassName={styles.inputNumber}
        {...{ formState, ...getAttributes('friction') }}
      />
      <InputNumber
        name='precision' label='Precision' layoutClassName={styles.inputNumber}
        {...{ formState, ...getAttributes('precision') }}
      />
      <InputNumber
        name='velocity' label='Velocity' layoutClassName={styles.inputNumber}
        {...{ formState, ...getAttributes('velocity') }}
      />
      <Checkbox
        name='clamp' label='Clamp' layoutClassName={styles.checkbox}
        {...{ formState }}
      />
      <div className={styles.buttonGroup}>
        <Button onClick={handleSubmit} layoutClassName={styles.submitButton}>{active ? 'BACK' :  'GO!'}</Button>
        <CopyToClipboard layoutClassName={styles.copyToClipboard} config={formState[0]} />
      </div>
    </form>
  )
}
