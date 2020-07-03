import { OriginalPage, SidebarItem } from './types'
import { requireSidebar } from './util'

function calcSiteData(pages: OriginalPage[]): { [key: string]: SidebarItem[] } {
  const regularProduct: { [key: string]: OriginalPage[] } = {}
  for (const page of pages) {
    if (!('productRegularName' in page)) continue
    if (!regularProduct[page.productRegularName])
      regularProduct[page.productRegularName] = []
    if (requireSidebar(page)) regularProduct[page.productRegularName].push(page)
  }
  if ('undefined' in regularProduct) delete regularProduct.undefined
  const result: { [key: string]: SidebarItem[] } = {}
  return result
}

function calcPageData(
  siteData: { [key: string]: SidebarItem[] },
  page: OriginalPage
): void {
  if (!requireSidebar(page)) return
  const sidebarItems = {}
  const breadcrumbItems = {}
  page.sidebarItems = sidebarItems
  page.breadcrumbItems = breadcrumbItems
}

export { calcSiteData, calcPageData }
