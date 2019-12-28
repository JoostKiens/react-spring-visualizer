import styles from './SpringVisualizer.css'
import { useRenderOnMount } from '@kaliber/use-render-on-mount'
import { a, useSpring } from 'react-spring'

export function SpringVisualizer({ active, config, onClick, layoutClassName, valueAttributes }) {
  const [{ progress }, set] = useSpring(() => ({ from: { progress: 0 }, progress: 0 }))

  React.useEffect(
    () => {
      set({
        progress: active ? 1 : 0,
        immediate: !active,
        config
      })
    },
    [active, set, config]
  )

  const isMounted = useRenderOnMount()
  const { tension, mass } = config
  const tensionModifier = 0.8 // visually present tension a bit smaller
  const springLengthAtRest = 100

  return (
    <figure className={cx(styles.component, layoutClassName)} {...{ onClick }}>
      {isMounted && (
        <>
          <div className={styles.springBase}>
            <div className={styles.ceiling} />
            <Spring
              layoutClassName={styles.spring}
              maxTension={valueAttributes.tension.max * tensionModifier}
              tension={tension * tensionModifier}
              {...{ progress, springLengthAtRest }}
            />
            <Bob
              layoutClassName={styles.bob}
              tension={tension * tensionModifier}
              {...{ progress, springLengthAtRest, mass }}
            />
            <div
              className={cx(styles.springLengthAtRest, config.clamp && styles.isClamped)}
              style={{ marginTop: springLengthAtRest }}
            />
          </div>
          <Friction layoutClassName={styles.friction} friction={config.friction} />
        </>
      )}
    </figure>
  )
}

function Bob({ mass, tension, progress, layoutClassName, springLengthAtRest }) {
  return (
    <a.div
      className={cx(styles.componentBob, layoutClassName)}
      style={{
        marginTop: springLengthAtRest,
        transform: progress.interpolate(x => `translateY(${tension - tension * x}px)`)
      }}
    >
      <svg width="140" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 50" className={styles.handle}>
        <path
          d="M.5 49.5h19V25.99l.004-.233A6.5 6.5 0 0126 19.5h88a6.5 6.5 0 016.5 6.5v23.5h19V8A7.5 7.5 0 00132 .5H8A7.5 7.5 0 00.5 8v41.5z"
          stroke="none" strokeWidth="0" fill="#263f44" fillRule="evenodd"
        />
      </svg>
      <div className={styles.mass} style={{ transform: `scaleY(${Math.sqrt(mass)})` }} />
    </a.div>
  )
}

function Friction({ friction, layoutClassName }) {
  return (
    <svg width="275" height="828" xmlns="http://www.w3.org/2000/svg" className={layoutClassName}>
      <g transform={`translate(3, 3) scale(${Math.sqrt(friction * 0.015)})`}>
        <path
          d="M18.5.5v89H1.174L37.5 127.279 73.826 89.5H56.5V.5h-38z"
          stroke="#263f44" strokeWidth="3"
          fill="none" fillRule="evenodd"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  )
}


function Spring({ progress, tension, maxTension, springLengthAtRest, layoutClassName }) {
  const padding = 2000
  const calcScale = React.useCallback(
    x => (springLengthAtRest + tension * (1 - x)) / (springLengthAtRest + maxTension),
    [tension, springLengthAtRest, maxTension]
  )

  return (
    <svg
      width="80"
      height={500 + padding * 2}
      xmlns="http://www.w3.org/2000/svg"
      className={layoutClassName}
      style={{ transform: `translateY(-${padding}px)` }}
    >
      <g transform={`translate(0 ${padding})`}>
        <a.g transform={progress.interpolate(x => `scale(1 ${calcScale(x)})` )}>
          <path
            d="M1.5 16.538l76.533 14.068M1.967 16.07L78.5 2M1.967 44.117L78.5 58.185M1.967 43.96L78.5 29.892m-77 43.3l76.533 14.069M1.967 72.723L78.5 58.654M1.967 100.771L78.5 114.84M1.967 100.615L78.5 86.546m-77 43.144l76.533 14.069M1.967 129.22L78.5 115.153M1.967 157.269L78.5 171.34M1.967 157.112L78.5 143.044m-77 43.144l76.533 14.07M1.967 185.718L78.5 171.651M1.967 242.06L78.5 227.993M1.967 213.768L78.5 227.836M1.967 213.611L78.5 199.542m-77 72.934l76.533 14.07M1.967 272.006L78.5 257.94M1.967 300.056L78.5 314.124M1.967 243.401L78.5 257.47M1.967 299.9L78.5 285.83m-77 43.3l76.533 14.07M1.967 328.662L78.5 314.593M1.967 356.71L78.5 370.779M1.967 356.554L78.5 342.485m-77 43.144l76.533 14.069M1.967 385.16L78.5 371.091M1.967 413.208L78.5 427.277M1.967 413.052L78.5 398.983m-77 43.144l76.533 14.069M1.967 441.658L78.5 427.59M1.967 498L78.5 483.931M1.967 469.706L78.5 483.775M1.967 469.55L78.5 455.481"
            stroke="#263f44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            fill="none" vectorEffect="non-scaling-stroke"
          />
        </a.g>
      </g>
    </svg>
  )
}
