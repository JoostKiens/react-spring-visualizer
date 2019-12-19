import styles from './Button.css'

export function Button({ children, onClick, layoutClassName, type = null, title = null }) {
  return <button className={cx(styles.component, layoutClassName)} {...{ children, onClick, type, title }} />
}
