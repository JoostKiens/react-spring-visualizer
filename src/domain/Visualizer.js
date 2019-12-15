import styles from './Visualizer.css'
import  { animated as a, useSpring } from 'react-spring'

export function Visualizer({ active, config, layoutClassName }) {
  const { progress } = useSpring({
    from: { progress: 0 },
    progress: active ? 1 : 0,
    config
  })

  return (
    <figure className={cx(styles.component, layoutClassName)}>
      <div className={styles.scalerContainer}>
        <div className={styles.scalerBase}>
          <a.div
            className={styles.scaler}
            style={{ transform: progress.interpolate(x =>  `scale(${x})`) }}
          />
        </div>
      </div>
      <figcaption className={styles.legend}>
        {['-50%', '0%', '50%', '100%', '150%'].map(x => <span className={styles.tick} key={x}>{x}</span>)}
      </figcaption>
    </figure>
  )
}
