import styles from './Header.css'

export function Header({ layoutClassName }) {
  return (
    <header className={cx(styles.component, layoutClassName)}>
      <h1 className={styles.heading}>React-spring visualizer</h1>
      <p>
        The missing visualizer for your <a href='https://www.react-spring.io/' className={styles.link}>react-spring</a> UI animations.
      </p>
    </header>
  )
}
