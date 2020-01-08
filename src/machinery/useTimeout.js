export function useTimeout(callback, duration, deps = []) {
  const timerIdRef = React.useRef(null)
  React.useEffect(
    () => {
      timerIdRef.current = window.setTimeout(callback, duration)
      return () => { clearTimeout(timerIdRef.current) }
    },
    // correct deps cant be verified by eslint
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps, callback, duration]
  )
}
