import { Link } from '@reach/router'
import styles from './Button.css'

export function Button({ children, onClick, layoutClassName, type = null, title = null }) {
  return (
    <button className={cx(styles.component, layoutClassName)} {...{ onClick, type, title }}>
      <span className={styles.inner}>{children}</span>
    </button>
  )
}

export function ButtonLink({ children, onClick, layoutClassName, to, title = null, onMouseOver, onMouseOut }) {
  return (
    <Link className={cx(styles.component, layoutClassName)} {...{ onClick, to, title, onMouseOver, onMouseOut }}>
      <span className={styles.inner}>{children}</span>
    </Link>
  )
}
