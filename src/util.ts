import { OriginalPage } from './types'

function calcDepth(str: string): number {
  let d = 0
  for (let i = 0; i < str.length; i++) if (str[i] === '/') d++
  if (str[str.length - 1] === '/') d--
  return d
}

function calcMeta(p: OriginalPage): void {
  const { regularPath } = p
  if (regularPath === '/') return
  p.depth = calcDepth(regularPath)
  p.productRegularName = regularPath.split('/')[1]
  p.breadcrumbRegularItems = regularPath.split('/')
}

function filterPageData(p: OriginalPage): OriginalPage {
  return {
    title: p.title,
    frontmatter: p.frontmatter,
    regularPath: p.regularPath,
    breadcrumbRegularItems: p.breadcrumbRegularItems,
    depth: p.depth,
    productRegularName: p.productRegularName,
  }
}

function filterPagesData(pages: OriginalPage[]): OriginalPage[] {
  const result: OriginalPage[] = []
  for (const page of pages) result.push(filterPageData(page))
  for (const r of result) delete r.frontmatter.meta
  return result
}

function requireSidebar(page: OriginalPage): boolean {
  if (page.frontmatter.home) return false
  if (!page.productRegularName) return false
  return true
}

export { calcMeta, filterPagesData, requireSidebar }
