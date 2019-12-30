import  { animated as a, useSpring } from 'react-spring'
import { useElementSize } from '/machinery/useElementSize'
import styles from './DefaultVisualizer.css'

export function DefaultVisualizer({ active, config, onClick, layoutClassName, display }) {
  const makeSpring = React.useCallback(
    (active) => ({ from: { progress: 0 }, progress: active ? 1 : 0, config }),
    [config]
  )
  return (
    <section className={cx(styles.component, layoutClassName)} {...{ onClick }}>
      {display === 'scale' && <Scale layoutClassName={styles.scaleLayout}{...{ active, makeSpring }} />}
      {display === 'opacity' && <Opacity layoutClassName={styles.opacityLayout}{...{ active, makeSpring }} />}
      {display === 'translateY' && <Translate layoutClassName={styles.translateLayout}{...{ active, makeSpring }} />}
    </section>
  )
}

function Scale({ active, layoutClassName, makeSpring }) {
  const { progress } = useSpring(makeSpring(active))

  return (
    <div className={cx(styles.componentScale, layoutClassName)}>
      <a.div
        className={styles.scale}
        style={{ transform: progress.interpolate(x => `scale(${0.5 + x * 0.5})`) }}
      />
      <div className={styles.scaleMax} />
      <div className={styles.scaleMin} />
    </div>
  )
}

function Opacity({ active, layoutClassName, makeSpring }) {
  const legendRef = React.useRef()
  const { progress } = useSpring(makeSpring(active))
  const { height } = useElementSize(legendRef)

  return (
    <div className={cx(styles.componentOpacity, layoutClassName)}>
      <div className={styles.opacityContainer}>
        <a.div
          className={styles.opacity}
          style={{ opacity: progress.interpolate(x => x) }}
        />
      </div>
      <div className={styles.legend} ref={legendRef}>
        <a.div
          className={styles.current}
          style={{ transform: progress.interpolate(x => `translateY(${height - x * height}px)`) }}
        />
      </div>
    </div>
  )
}

function Translate({ active, layoutClassName, makeSpring }) {
  const componentRef = React.useRef()
  const { progress } = useSpring(makeSpring(active))
  const { height } = useElementSize(componentRef)

  return (
    <div className={cx(styles.componentTranslate, layoutClassName)} ref={componentRef}>
      <a.div
        className={styles.translate}
        style={{ transform: progress.interpolate(x => `translateY(${ -x * height}px)`) }}
      />
      <div className={styles.translateBoundaries} />
    </div>
  )
}
