import styles from './Button.css'

export function Button({ children, onClick, layoutClassName, type = null, title = null }) {
  return (
    <button className={cx(styles.component, layoutClassName)} {...{ onClick, type, title }}>
      <span className={styles.innerButton}>{children}</span>
    </button>
  )
}

export function ButtonLink({ children, href, layoutClassName, title = null, onMouseOver, onMouseOut, active }) {
  return (
    <a className={cx(styles.componentLink, layoutClassName)} {...{ href, title, onMouseOver, onMouseOut }}>
      <span className={cx(styles.innerLink, active && styles.isActive)}>{children}</span>
    </a>
  )
}
