import { OriginalPage } from './types'

function calcDepth(str: string): number {
  let d = 0
  for (let i = 0; i < str.length; i++) if (str[i] === '/') d++
  return d
}

function calcMeta(p: OriginalPage): void {
  const { regularPath } = p
  if (regularPath === '/') return
  p.depth = calcDepth(regularPath)
  p.productRegularName = regularPath.split('/')[1]
  p.breadcrumbRegularItems = regularPath.split('/').splice(1, 1)
}

export { calcMeta }
