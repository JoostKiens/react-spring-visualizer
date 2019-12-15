import styles from './Header.css'

export function Header({ layoutClassName }) {
  return (
    <header className={cx(styles.component, layoutClassName)}>
      <h1 className={styles.heading}>React-spring visualizer</h1>
      <p>
        Visualize your spring config for <a href='https://www.react-spring.io/' className={styles.link}>react-spring</a>.
      </p>
    </header>
  )
}
