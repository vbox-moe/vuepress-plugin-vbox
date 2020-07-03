import { OriginalPage, SidebarItem } from './types'
import { requireSidebar } from './util'

function isSidebarContains(sidebar: SidebarItem[], path: string) {
  let result = false
  sidebar.forEach((item) => {
    if (item.path === path) result = true
  })
  return result
}

function injectSidebarItem(
  prodPages: OriginalPage[],
  sidebarResult: SidebarItem[],
  completedFlag: string[],
  removeDepth: number
): void {
  for (const p of prodPages) {
    if (completedFlag.indexOf(p.regularPath) > -1) continue
    if (p.depth > 1) {
      let sidebarPointer: SidebarItem[] = sidebarResult
      for (
        let brIndex = 1;
        brIndex <= p.breadcrumbRegularItems.length;
        brIndex++
      ) {
        if (brIndex <= removeDepth) continue
        let brConstruct = '/'
        for (let brConsIndex = 0; brConsIndex < brIndex; brConsIndex++)
          brConstruct += p.breadcrumbRegularItems[brConsIndex] + '/'
        if (!isSidebarContains(sidebarPointer, brConstruct))
          prodPages.forEach((contPage) => {
            if (contPage.regularPath === brConstruct)
              injectSidebarItem(
                [contPage],
                sidebarPointer,
                completedFlag,
                brIndex
              )
          })
      }
    }
    completedFlag.push(p.regularPath)
  }
}

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

  for (const product in regularProduct) {
    const prodPages: OriginalPage[] = regularProduct[product]

    // Construct Result
    const sidebarResult: SidebarItem[] = []

    // Construct Flag
    const completedFlag: string[] = []

    injectSidebarItem(prodPages, sidebarResult, completedFlag, 1)

    // Push Result
    result[product] = sidebarResult
  }
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

function calcProductData(
  siteData: { [key: string]: SidebarItem[] },
  page: OriginalPage
): void {}

export { calcSiteData, calcPageData, calcProductData }
