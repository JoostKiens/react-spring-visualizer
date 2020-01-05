import { useClipboard } from 'use-clipboard-copy'
import { Button } from './Button'
import { animated as a, useSpring } from 'react-spring'
import styles from './CopyToClipboard.css'
import color from '/cssGlobal/color.css'

export function CopyToClipboard({ layoutClassName, config }) {
  const timerIdRef = React.useRef(null)
  const [hover, setHover] = React.useState(false)
  const [showMessage, setShowMessage] = React.useState(false)
  const clipboard = useClipboard()

  const { messageProgress } = useSpring({
    from: { messageProgress: 0 },
    messageProgress: showMessage ? 1 : 0
  })

  const { progress } = useSpring({
    from: { progress: 0 },
    progress: hover ? 1 : 0,
    reset: true,
    immediate: !hover,
    config: { mass: 1.9, tension: 180, friction: 28, velocity: -3 }
  })


  React.useEffect(
    () => {
      if (showMessage && !timerIdRef.current) {
        timerIdRef.current = window.setTimeout(() => {
          setShowMessage(false)
          timerIdRef.current = null
        }, 3000)
      }
      return () => { clearTimeout(timerIdRef.current) }
    },
    [showMessage]
  )

  const handleClick = React.useCallback(
    () => {
      clipboard.copy(JSON.stringify(config, null, 2).replace(/"/g, ''))
      setShowMessage(true)
    },
    [clipboard, config]
  )

  return (
    <Button
      type='button'
      onClick={handleClick}
      onMouseEnter={() => { setHover(true) }}
      onMouseLeave={() => { setHover(false) }}
      title='Copy configuration to clipboard'
      {...{ layoutClassName }}
    >
      <span className={styles.component}>
        <a.span
          className={styles.message}
          aria-hidden
          style={{
            transform: messageProgress.interpolate(x => `translateY(${ x * -16 }px)`),
            opacity: messageProgress,
          }}
        >
          copied!
        </a.span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
          role='img'
          width="60" height="60"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(11 10)" stroke={color.buttonText} strokeWidth="3">
              <path d="M19 1.5h-9A1.5 1.5 0 008.5 3v2.5H3A1.5 1.5 0 001.5 7v30A1.5 1.5 0 003 38.5h23a1.5 1.5 0 001.5-1.5V7A1.5 1.5 0 0026 5.5h-5.5V3A1.5 1.5 0 0019 1.5z" />
              <rect x="8.5" y="1.5" width="12" height="8" rx="3" />
            </g>
            <a.g transform={progress.interpolate(x => `scale(${1 - x * 0.2}) translate(${-10 * x} ${3 * x})`)}>
              <path d="M41 24v6h-2v18h2v6h-4a4 4 0 01-4-4v-7h-2v-7h2v-8a4 4 0 014-4h4zM43 24v6h2v18h-2v6h4a4 4 0 004-4v-7h2v-7h-2v-8a4 4 0 00-4-4h-4z" strokeWidth="3" fill={color.buttonText} stroke={color.button} />
            </a.g>
          </g>
        </svg>
      </span>
    </Button>
  )
}
