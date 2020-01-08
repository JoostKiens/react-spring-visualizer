import styles from './VisualizerContainer.css'

export const VisualizerContainer = React.forwardRef(ActualVisualizerContainer)

function ActualVisualizerContainer({ children, onClick, layoutClassName }, ref) {
  return <section
    className={cx(styles.componentActualVisualizerContainer, layoutClassName)}
    {...{ onClick, children, ref }}
  />
}
