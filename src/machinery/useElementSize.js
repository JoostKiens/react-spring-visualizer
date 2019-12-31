// assumes the resize-observer-polyfill is loaded, this can be done through polyfill.io
export function useElementSize(parentRef) {
  const [size, setSize] = React.useState({ width: 0, height: 0 })

  React.useEffect(
    () => {
      if (typeof window === 'undefined' || !parentRef.current) return
      if (!parentRef.current.nodeType) throw new Error('Make sure the ref argument is a valid DOM node')

      // @ts-ignore
      const resizeObserver = new window.ResizeObserver(callback)
      resizeObserver.observe(parentRef.current)
      return () => resizeObserver.disconnect()

      function callback([entry]) {
        setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
      }
    },
    [parentRef]
  )

  return size
}
