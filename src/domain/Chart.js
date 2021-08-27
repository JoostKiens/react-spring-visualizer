import { animated as a, useSpring, useSprings } from 'react-spring'
import color from '/cssGlobal/color.css'
import styles from './Chart.css'
import SVGCatmullRomSpline from 'svg-catmull-rom-spline'
import cx from 'classnames'

const fromToProps = {
  stroke: color.stroke,
  strokeWidth: 1,
  strokeDasharray: '3,2',
}

export function Chart({ values, duration, containerWidth, containerHeight, layoutClassName }) {
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)

  const { d, points, yFrom, yTo } = React.useMemo(
    () => getSvgValues({ values, containerWidth, containerHeight, minValue, maxValue }),
    [values, containerWidth, containerHeight, minValue, maxValue]
  )

  const [{ progress: legendProgress }, legendApi] = useSpring(() => ({
    progress: 0,
    config: { tension: 380, friction: 40, clamp: true },
  }))

  const [{ progress }, maskApi] = useSpring(() => ({
    progress: 0,
    config: { tension: 380, friction: 40, clamp: true },
    onRest: () => { legendApi.start({ progress: 1 }) }
  }))

  const trail = useSprings(points.length, points.map((_, index) => ({
    progress: 1,
    from: { progress: 0 },
    delay: 10 * index,
    onRest: () => { maskApi.start({ progress: 1 }) }
  })))

  return (
    <div className={cx(styles.component, layoutClassName)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={containerHeight} width={containerWidth}
      >
        <mask id="myMask" maskUnits='userSpaceOnUse'>
          <a.rect
            x='0' y='0'
            height={containerHeight} width={progress.to(x => containerWidth * x)}
            fill="white"
          />
        </mask>

        <a.path stroke='none' fill={color.secondary} mask="url(#myMask)" {...{ d }} />

        <g fill={color.stroke}>
          {trail.map((x, i) => {
            const [cx, cy] = points[i]
            return (
              <a.circle
                key={i}
                r="4"
                transform={x.progress.to(
                  (x) => `
                    translate(${cx} ${cy})
                    scale(${easeOutBack(x)})
                    translate(${-cx} ${-cy})
                  `
                )}
                {...{ cx, cy }}
              />
            )
          })}
        </g>

        <line x1='0' x2={containerWidth} y1={yTo} y2={yTo} {...fromToProps} />
        <line x1='0' x2={containerWidth} y1={yFrom} y2={yFrom} {...fromToProps} />

      </svg>
      <a.div className={styles.legend} style={{ opacity: legendProgress }}>
        <span>duration: {Math.round(duration)}ms</span>
        <span>min: {minValue.toFixed(2)}</span>
        <span>max: {maxValue.toFixed(2)}</span>
      </a.div>
    </div>
  )
}

function getSvgValues({ values, containerHeight, containerWidth, minValue, maxValue }) {
  const tolerance = 0.01
  const highestQuality = true

  const points = values.map((y, i) => [i / (values.length - 1) * containerWidth, mapValueToYCoord(y)])
  const spline = SVGCatmullRomSpline.toPath(points, tolerance, highestQuality)

  return {
    d: `${spline} L${containerWidth},${containerHeight} L0,${containerHeight}z`,
    points,
    yTo: mapValueToYCoord(1),
    yFrom: mapValueToYCoord(0)
  }

  function mapValueToYCoord(value) {
    return containerHeight - mapValueFromRangeToRange({
      value,
      from: { min: minValue, max: maxValue },
      to: { min: containerHeight * 0.2, max: containerHeight * 0.8 }
    })
  }
}


function mapValueFromRangeToRange({ value, from, to }) {
  return (value - from.min) / (from.max - from.min) * (to.max - to.min) + to.min
}

function easeOutBack(x) {
  const c1 = 1.70158
  const c3 = c1 + 1

  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}
