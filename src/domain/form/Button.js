import styles from './Button.css'

export function Button({ children, onClick, layoutClassName, type = null, title = null }) {
  return (
    <button className={cx(styles.component, layoutClassName)} {...{ onClick, type, title }}>
      <span className={styles.inner}>{children}</span>
    </button>
  )
}

export function ButtonLink({ children, layoutClassName, href, title = null, onMouseOver, onMouseOut }) {
  return (
    <a className={cx(styles.componentLink, layoutClassName)} {...{ href, title, onMouseOver, onMouseOut }}>
      <span className={styles.inner}>{children}</span>
    </a>
  )
}
