import styles from './SrOnly.css'

export function SrOnly({ children }) {
  return <span className={styles.component} {...{ children }} />
}
