declare const React: typeof import('react')
declare const cx: typeof import('classnames')

declare module '*.css' {
  const x: { [any: string]: string }
  export default x
}
