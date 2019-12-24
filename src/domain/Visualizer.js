import styles from './Visualizer.css'
import { useRenderOnMount } from '@kaliber/use-render-on-mount'
import  { animated as a, useSpring } from 'react-spring'

export function Visualizer({ active, config, onClick, layoutClassName }) {
  const { progress } = useSpring({
    from: { progress: 0 },
    progress: active ? 1 : 0,
    config
  })

  return (
    <figure className={cx(styles.component, layoutClassName)} {...{ onClick }}>
      {/* <Scaler layoutClassName={styles.scalerLayout}{...{ progress }} /> */}
      <Spring layoutClassName={styles.scalerLayout}{...{ progress, config }} />
    </figure>
  )
}


function Spring({ progress, layoutClassName, config }) {
  const isMounted = useRenderOnMount()
  const { tension, mass } = config
  const offset = tension * 0.8

  return (
    <div className={cx(styles.componentSpring, layoutClassName)}>
      <div className={styles.springContainer}>
        <div className={styles.springBase}>
          <a.div
            className={styles.spring}
            style={{
              height: isMounted && offset,
              transform: isMounted && progress.interpolate(x => `scaleY(${1 - x})`)
            }}
          />
          <a.div
            className={styles.bob}
            style={{
              transform: isMounted && progress.interpolate(x => `translateY(${offset + x * -offset}px) scaleY(${mass})`)
            }}
          />
        </div>
      </div>
      {/* <figcaption className={styles.legend}>
        {['-50%', '0%', '50%', '100%', '150%'].map(x => <span className={styles.tick} key={x}>{x}</span>)}
      </figcaption> */}
    </div>
  )
}


function Scaler({ progress, layoutClassName }) {
  return (
    <div className={cx(styles.componentScaler, layoutClassName)}>
      <div className={styles.scalerContainer}>
        <div className={styles.scalerBase}>
          <a.div
            className={styles.scaler}
            style={{ transform: progress.interpolate(x => `scale(${x})`) }}
          />
        </div>
      </div>
      <figcaption className={styles.legend}>
        {['-50%', '0%', '50%', '100%', '150%'].map(x => <span className={styles.tick} key={x}>{x}</span>)}
      </figcaption>
    </div>
  )
}
