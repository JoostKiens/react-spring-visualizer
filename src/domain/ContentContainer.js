import styles from './ContentContainer.css'

export function ContentContainer({ children }) {
  return <div className={styles.component}><div className={styles.inner} {...{ children }} /></div>
}
