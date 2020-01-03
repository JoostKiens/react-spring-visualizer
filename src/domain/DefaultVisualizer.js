import  { animated as a, useSpring } from 'react-spring'
import { useElementSize } from '/machinery/useElementSize'
import styles from './DefaultVisualizer.css'

export function DefaultVisualizer({ active, config, onClick, display }) {
  const makeSpring = React.useCallback(
    (active) => ({ from: { progress: 0 }, progress: active ? 1 : 0, config }),
    [config]
  )

  return (
    <section className={styles.component} {...{ onClick }}>
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
      <a.span className={styles.progress}>{progress.interpolate(x => `${x.toFixed(2)}`)}</a.span>
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
      <a.span className={styles.progress}>{progress.interpolate(x => `${Math.round(x * 100)}%`)}</a.span>
      <div className={styles.opacityContainer}>
        <a.div
          className={styles.opacity}
          style={{ opacity: progress.interpolate(x => x) }}
        />
      </div>
      <div className={styles.legend} ref={legendRef}>
        <div className={styles.bar} />
        <a.div
          className={styles.current}
          style={{ transform: progress.interpolate(x => `translateY(${-3 - x * (height - 6)}px)`) }}
        >
          <svg
            className={styles.currentMarker}
            width="80" height="16" viewBox="0 0 80 16"
            xmlns="http://www.w3.org/2000/svg"
            transform="translate(0, -3)"
          >
            <g stroke="#001858" strokeWidth="3" fill="none" fillRule="evenodd">
              <path d="M12.68 9.32a1.5 1.5 0 000-2.64L4.206 2.1a1.5 1.5 0 00-2.213 1.319v9.164a1.5 1.5 0 002.213 1.32l8.472-4.583zM67.32 9.32a1.5 1.5 0 010-2.64L75.794 2.1a1.5 1.5 0 012.213 1.319v9.164a1.5 1.5 0 01-2.213 1.32L67.32 9.318z" />
            </g>
          </svg>
        </a.div>
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
      <a.span className={styles.progress}>{progress.interpolate(x => `${x.toFixed(2)}`)}</a.span>
      <div className={styles.translateBoundariesBackground} />
      <a.div
        className={styles.translate}
        style={{ transform: progress.interpolate(x => `translateY(${ -x * height}px)`) }}
      />
      <div className={styles.translateBoundariesBorder} />
    </div>
  )
}
