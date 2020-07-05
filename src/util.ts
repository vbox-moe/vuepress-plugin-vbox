import { info, success } from './log'
import { OriginalPage } from './types'

function calcDepth(str: string): number {
  let d = 0
  for (let i = 0; i < str.length; i++) if (str[i] === '/') d++
  if (str[str.length - 1] === '/') d--
  return d
}

function calcMeta(p: OriginalPage): void {
  const { regularPath } = p
  info('Collecting Meta for', regularPath, '...')
  if (regularPath === '/') return
  p.depth = calcDepth(regularPath)
  p.productRegularName = regularPath.split('/')[1]
  const sp: string[] = regularPath.split('/')
  sp.splice(0, 1)
  if (sp[sp.length - 1] !== '') {
    p.isDetailPage = true
    sp.pop()
  } else p.isDetailPage = false
  p.breadcrumbRegularItems = sp
}

function filterPageData(p: OriginalPage): OriginalPage {
  return {
    title: p.title,
    frontmatter: p.frontmatter,
    regularPath: p.regularPath,
    breadcrumbRegularItems: p.breadcrumbRegularItems,
    depth: p.depth,
    productRegularName: p.productRegularName,
    isDetailPage: p.isDetailPage,
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

function calcAuthorCount(pages: OriginalPage[]): number {
  info('Calculating Author Data...')
  const emailList: string[] = []
  let num: number = 0
  for (const page of pages) {
    for (const author of page.authors) {
      if (emailList.indexOf(author.email) === -1) {
        emailList.push(author.email)
        num++
      }
    }
  }
  success('Find', String(num), 'Authors.')
  return num
}

export { calcMeta, filterPagesData, requireSidebar, calcAuthorCount }
