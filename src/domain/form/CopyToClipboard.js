import { useClipboard } from 'use-clipboard-copy'
import { Button } from './Button'
import styles from './CopyToClipboard.css'

export function CopyToClipboard({ layoutClassName, config }) {
  const clipboard = useClipboard()
  const handleClick = React.useCallback(() => { clipboard.copy(JSON.stringify(config, null, 2).replace(/"/g, '')) }, [clipboard, config])

  return (
    <Button
      type='button'
      onClick={handleClick}
      title='Copy configuration to clipboard'
      {...{ layoutClassName }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 60"
        className={styles.component}
        role='img'
        width="60" height="60"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(10 8)" stroke="#000" strokeWidth="3">
            <path d="M19 1.5h-9A1.5 1.5 0 008.5 3v2.5H3A1.5 1.5 0 001.5 7v30A1.5 1.5 0 003 38.5h23a1.5 1.5 0 001.5-1.5V7A1.5 1.5 0 0026 5.5h-5.5V3A1.5 1.5 0 0019 1.5z" />
            <rect x="8.5" y="1.5" width="12" height="8" rx="3" />
          </g>
          <path
            d="M39.5 50.415v.085h1-.5c-.175 0-.344-.03-.5-.085zm0-20.83a1.49 1.49 0 01.41-.082l.107-.003H39.5v.085zm2 17.915h1v6H40a4.5 4.5 0 01-4.5-4.5v-5.5h-1v-6h1V31c0-2.387 1.863-4.355 4.28-4.494L40 26.5h2.5v6h-1v15zM47.5 50.415v.085h-1 .5c.175 0 .344-.03.5-.085zm0-20.83a1.49 1.49 0 00-.41-.082l-.107-.003h.517v.085zm-2 17.915h-1v6H47a4.5 4.5 0 004.5-4.5v-5.5h1v-6h-1V31c0-2.387-1.863-4.355-4.28-4.494L47 26.5h-2.5v6h1v15z" strokeWidth="1"
            fill="#000"
            stroke="#f582ae"
          />
        </g>
      </svg>
    </Button>
  )
}
