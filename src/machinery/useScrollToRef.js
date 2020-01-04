import { useSpring } from 'react-spring'

export function useScrollToRef({ ref, offset, config }) {
  const [, set] = useSpring(() => ({ y: 0 }))

  return scrollTo

  function scrollTo() {
    if (!ref.current) return
    const { top } = ref.current.getBoundingClientRect()
    const { scrollTop } = window.document.documentElement

    set({
      y: top + scrollTop - offset,
      reset: true,
      from: { y: window.scrollY },
      onFrame: ({ y }) => { window.scroll(0, y) },
      config
    })
  }
}
