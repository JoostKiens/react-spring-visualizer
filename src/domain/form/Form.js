import { InputNumber } from './InputNumber'
import { Checkbox } from './Checkbox'
import { Presets } from './Presets'
import { Button } from './Button'
import { CopyToClipboard } from './CopyToClipboard'
import styles from './Form.css'

export function Form({ handleSubmit, formState, layoutClassName }) {
  return (
    <form onSubmit={handleSubmit} className={cx(styles.component, layoutClassName)}>
      <Presets layoutClassName={styles.presets} onChange={handleSubmit} {...{ formState }} />
      <InputNumber
        name='mass' label='Mass' layoutClassName={styles.inputNumber}
        min={0} max={20} step={0.1} {...{ formState }}
      />
      <InputNumber
        name='tension' label='Tension' layoutClassName={styles.inputNumber}
        min={0} max={500} step={1} {...{ formState }}
      />
      <InputNumber
        name='friction' label='Friction' layoutClassName={styles.inputNumber}
        min={0} max={500} step={1} {...{ formState }}
      />
      <InputNumber
        name='precision' label='Precision' layoutClassName={styles.inputNumber}
        min={0} max={1} step={0.01} {...{ formState }}
      />
      <InputNumber
        name='velocity' label='Velocity' layoutClassName={styles.inputNumber}
        min={0} max={100} step={0.1} {...{ formState }}
      />
      <Checkbox
        name='clamp' label='Clamp' layoutClassName={styles.checkbox}
        {...{ formState }}
      />
      <div className={styles.buttonGroup}>
        <Button onClick={handleSubmit} layoutClassName={styles.submitButton}>GO!</Button>
        <CopyToClipboard layoutClassName={styles.copyToClipboard} config={formState[0]} />
      </div>
    </form>
  )
}
