import { animated as a, useSpring } from 'react-spring'
import { ButtonLink } from './form/Button'
import styles from './Nav.css'
import color from '/cssGlobal/color.css'

export function Nav({ layoutClassName, display }) {
  const displays = React.useMemo(
    () => [
      { hash: '#spring', label: 'Spring', Icon: SpringIcon },
      { hash: '#translateY', label: 'Translate Y', Icon: TranslateYIcon },
      { hash: '#scale', label: 'Scale', Icon: ScaleIcon },
      { hash: '#rotate', label: 'Rotate', Icon: RotateIcon },
      { hash: '#opacity', label: 'Opacity', Icon: OpacityIcon },
    ],
    []
  )

  return (
    <nav className={cx(styles.component, layoutClassName)}>
      {displays.map(({ hash, label, Icon }) =>
        <Button
          key={hash}
          layoutClassName={styles.button}
          active={display === hash.replace('#', '')}
          {...{ hash, label, Icon }}
        />
      )}
    </nav>
  )
}

function Button({ hash, label, Icon, layoutClassName, active }) {
  const [hover, setHover] = React.useState(false)

  return (
    <ButtonLink
      href={`${hash}`}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...{ layoutClassName, active }}
    >
      <Icon {...{ hover }} />
    </ButtonLink>
  )
}


function SpringIcon({ hover }) {
  const { progress } = useSpring({
    from: { progress: 0 },
    progress: hover ? 1 : 0,
    config: { mass: 3, tension: 240, friction: 7 }
  })

  return (
    <IconWrapper>
      <g stroke={color.buttonText} fill="none" fillRule="evenodd">
        <a.g transform={progress.to(x => `translate(0 24) scale(1 ${1 - x * 0.2}) translate(0 -24)`)}>
          <path
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="bevel" vectorEffect="non-scaling-stroke"
            d="M20.278 11.154l19.444 3.692M20.278 20.769l19.444-5.538M20 40l20.722-4.808M20.292 21.154l20.416 3.692M20.292 31.154l20.416 3.692M21.278 48.846l19.444-3.692M20.292 40.192l20.416 4.616M20.292 30.769l20.416-5.538"
          />
          <path strokeWidth="3" strokeLinecap="round" d="M10 10h40M10 50h40" vectorEffect="non-scaling-stroke" />
        </a.g>
      </g>
    </IconWrapper>
  )
}

function ScaleIcon({ hover }) {
  const { progress } = useSpring({
    from: { progress: 0 },
    progress: hover ? 1 : 0,
    config: { mass: 1, tension: 170, friction: 20 }
  })

  return (
    <IconWrapper>
      <a.g transform={progress.to(x => `translate(30 30) scale(${1 + x * 1.2}) translate(-30 -30)`)}>
        <rect fill={color.buttonText} x="22" y="22" width="16" height="16" rx="2" />
      </a.g>
      <a.g style={{ opacity: progress.to(x => 1 - x) }} stroke={color.buttonText}>
        <rect strokeWidth="3" x="10" y="10" width="40" height="40" rx="2" fill="none" />
        <path strokeWidth="2" strokeLinecap="round" d="M16.5 44.5l4-4M40 20l4-4M40 40l4 4M16 16l4 4" />
      </a.g>
    </IconWrapper>
  )
}

function OpacityIcon({ hover }) {
  const { progress } = useSpring({
    from: { progress: 0 },
    progress: hover ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  })

  return (
    <IconWrapper>
      <g fill="none" fillRule="evenodd">
        <a.g style={{ opacity: progress.to(x => 1 - x * 0.5) }}>
          <path
            fill={color.buttonText}
            d="M8 8h4v4H8zM16 8h4v4h-4zM24 8h4v4h-4zM32 8h4v4h-4zM40 8h4v4h-4zM48 8h4v4h-4zM8 16h4v4H8zM16 16h4v4h-4zM24 16h4v4h-4zM32 16h4v4h-4zM40 16h4v4h-4zM48 16h4v4h-4zM12 12h4v4h-4zM20 12h4v4h-4zM28 12h4v4h-4zM36 12h4v4h-4zM44 12h4v4h-4zM12 20h4v4h-4zM20 20h4v4h-4zM28 20h4v4h-4zM36 20h4v4h-4zM44 20h4v4h-4zM8 24h4v4H8zM16 24h4v4h-4zM24 24h4v4h-4zM32 24h4v4h-4zM40 24h4v4h-4zM48 24h4v4h-4zM8 32h4v4H8zM16 32h4v4h-4zM24 32h4v4h-4zM32 32h4v4h-4zM40 32h4v4h-4zM48 32h4v4h-4zM12 28h4v4h-4zM20 28h4v4h-4zM28 28h4v4h-4zM36 28h4v4h-4zM44 28h4v4h-4zM12 36h4v4h-4zM20 36h4v4h-4zM28 36h4v4h-4zM36 36h4v4h-4zM44 36h4v4h-4zM8 40h4v4H8zM16 40h4v4h-4zM24 40h4v4h-4zM32 40h4v4h-4zM40 40h4v4h-4zM48 40h4v4h-4zM8 48h4v4H8zM16 48h4v4h-4zM24 48h4v4h-4zM32 48h4v4h-4zM40 48h4v4h-4zM48 48h4v4h-4zM12 44h4v4h-4zM20 44h4v4h-4zM28 44h4v4h-4zM36 44h4v4h-4zM44 44h4v4h-4z"
          />
        </a.g>
      </g>
    </IconWrapper>
  )
}

function TranslateYIcon({ hover }) {
  const { progress } = useSpring({
    from: { progress: 0 },
    progress: hover ? 1 : 0,
    config: {
      mass: 9.3,
      tension: 170,
      friction: 8,
      velocity: hover ? -19 * 0.001 : 0,
    },
  })

  return (
    <IconWrapper>
      <g fill="none" fillRule="evenodd">
        <a.g style={{ transform: progress.to(x => `translateY(${x * 0.1 * 100}%)`) }}>
          <rect fill={color.buttonText} x="23" y="11" width="14" height="20" rx="7" />
        </a.g>
        <a.g style={{ opacity: progress.to(x => (!hover && x === 0) ? 1 : 0) }}>
          <path stroke={color.buttonText} strokeWidth="2" strokeLinecap="round" d="M30 34v5M27 33v3" />
        </a.g>
      </g>
    </IconWrapper>
  )
}

function RotateIcon({ hover }) {
  const { progress } = useSpring({
    from: { progress: 0 },
    progress: hover ? 1 : 0,
    config: { mass: 1, tension: 170, friction: 20 }
  })

  return (
    <IconWrapper>
      <g fill="none" fillRule="evenodd">
        <a.rect
          stroke="none"
          fill={color.buttonText}
          transform={progress.to(x => `rotate(${60 - x * 60} 30 30)`)}
          x="12" y="12" width="36" height="36" rx="2"
        />
        <a.g style={{ opacity: progress.to(x => 1 - x) }} transform="translate(-4 -4)">
          <path fill={color.buttonText} d="M13.7 16.4l6.6-1.4-3.7-4.7z" />
          <path d="M25.3 10.6c-2.4-.4-4.6.2-6.6 1.7" stroke={color.buttonText} strokeWidth="2" strokeLinecap="round" />
        </a.g>
      </g>
    </IconWrapper>
  )
}

function IconWrapper({ children }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60" height="60" viewBox='0 0 60 60'
      className={styles.componentIconWrapper}
      {...{ children }}
    />
  )
}
