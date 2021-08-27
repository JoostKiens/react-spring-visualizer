declare const React: typeof import('react')
declare const cx: typeof import('classnames')

declare module '*.css' {
  const x: { [any: string]: string }
  export default x
}
declare module '*.svg' {
  const content: any
  export default content
}
