export function track(obj) {
  if (typeof window !== undefined) window.dataLayer.push(obj)
}
