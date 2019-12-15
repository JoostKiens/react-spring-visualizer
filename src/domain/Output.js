import styles from './Output.css'

export function Output({ config, layoutClassName }) {
  const [output, setOutput] = React.useState(null)

  React.useEffect(
    () => setOutput(JSON.stringify(config, null, 2)),
    [config]
  )

  return (
    <pre className={cx(styles.component, layoutClassName)}>
      <code>
        {output}
      </code>
    </pre>
  )
}
