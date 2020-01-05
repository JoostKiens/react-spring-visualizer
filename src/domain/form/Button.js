import styles from './Button.css'

export function Button({ children, onClick, layoutClassName, onMouseEnter, onMouseLeave, type = null, title = null }) {
  const componentRef = React.useRef()
  const handleClick = React.useCallback(
    evt => {
      // @ts-ignore
      componentRef.current.blur()
      onClick(evt)
    },
    [onClick]
  )

  return (
    <button
      onClick={handleClick}
      className={cx(styles.component, layoutClassName)}
      ref={componentRef}
      {...{ type, title, onMouseEnter, onMouseLeave }}
    >
      <span className={styles.innerButton}>{children}</span>
    </button>
  )
}

export function ButtonLink({ children, href, layoutClassName, title = null, onMouseEnter, onMouseLeave, active }) {
  const componentRef = React.useRef()
  const onClick = React.useCallback(
    // @ts-ignore
    () => { componentRef.current.blur() },
    []
  )

  return (
    <a
      className={cx(styles.componentLink, layoutClassName)}
      ref={componentRef}
      {...{ href, title, onMouseEnter, onMouseLeave, onClick }}
    >
      <span className={cx(styles.innerLink, active && styles.isActive)}>{children}</span>
    </a>
  )
}
