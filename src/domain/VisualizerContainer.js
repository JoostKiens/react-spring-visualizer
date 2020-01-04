import styles from './VisualizerContainer.css'

export function VisualizerContainer({ children, onClick, layoutClassName }) {
  return <section className={cx(styles.component, layoutClassName)} {...{ onClick, children }} />
}
