import { BreadCrumbItem, OriginalPage, SidebarItem } from './types'
import { requireSidebar } from './util'

function isSidebarContains(
  sidebar: SidebarItem[],
  path: string
): OriginalPage | false {
  sidebar.forEach((item) => {
    if (item.path === path) return item
  })
  return false
}

function injectSidebarItemCore(
  prodPage: OriginalPage,
  sidebar: SidebarItem[],
  completedFlag: string[]
): void {
  if (completedFlag.indexOf(prodPage.regularPath) > -1) return
  sidebar.push({
    children: [],
    title: prodPage.title,
    type: !prodPage.isDetailPage ? 'group' : 'auto',
    basePath: prodPage.regularPath,
    path: prodPage.regularPath,
    collapsable: !prodPage.isDetailPage,
    pageIndex: prodPage.frontmatter.pageIndex,
  })
  sidebar.sort((a, b) => {
    if (!a.pageIndex || !b.pageIndex) return 0
    if (a.pageIndex > b.pageIndex) return 1
    else return -1
  })
  completedFlag.push(prodPage.regularPath)
}

function injectSidebarItem(
  prodPages: OriginalPage[],
  sidebarResult: SidebarItem[],
  completedFlag: string[]
): void {
  for (const p of prodPages) {
    if (completedFlag.indexOf(p.regularPath) > -1) continue
    if (p.depth > 1) {
      let sidebarPointer: SidebarItem[] = sidebarResult
      for (
        let brIndex = 1;
        brIndex <= p.breadcrumbRegularItems.length - 1;
        brIndex++
      ) {
        let brConstruct = '/'
        for (let brConsIndex = 0; brConsIndex < brIndex; brConsIndex++)
          brConstruct += p.breadcrumbRegularItems[brConsIndex] + '/'
        if (!isSidebarContains(sidebarPointer, brConstruct))
          prodPages.forEach((contPage) => {
            if (contPage.regularPath === brConstruct)
              injectSidebarItemCore(contPage, sidebarPointer, completedFlag)
          })
        for (const sbPointer of sidebarPointer) {
          if (sbPointer.path === brConstruct) {
            sidebarPointer = sbPointer.children
            break
          }
        }
      }
      injectSidebarItemCore(p, sidebarPointer, completedFlag)
    }
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

    injectSidebarItem(prodPages, sidebarResult, completedFlag)

    // Push Result
    result[product] = sidebarResult
  }
  return result
}

function calcBreadcrumbItems(
  page: OriginalPage,
  pages: OriginalPage[]
): BreadCrumbItem[] {
  const result: BreadCrumbItem[] = []
  for (const p of pages) {
    if (p.regularPath === `/${page.productRegularName}/`) {
      result.push({
        productRegularName: p.productRegularName,
        regularPath: p.regularPath,
        title: p.frontmatter.heroText,
      })
      break
    }
  }
  if (page.depth > 1) {
    for (
      let brIndex = 1;
      brIndex <= page.breadcrumbRegularItems.length - 1;
      brIndex++
    ) {
      let brConstruct = '/'
      for (let brConsIndex = 0; brConsIndex < brIndex; brConsIndex++)
        brConstruct += page.breadcrumbRegularItems[brConsIndex] + '/'
      for (const p of pages) {
        if (p.regularPath === brConstruct)
          result.push({
            title: p.title,
            regularPath: p.regularPath,
            productRegularName: p.productRegularName,
          })
      }
    }
  }
  return result
}

function calcPageData(
  siteData: { [key: string]: SidebarItem[] },
  page: OriginalPage,
  pages: OriginalPage[]
): void {
  if (!requireSidebar(page)) return
  const sidebarItems = siteData[page.productRegularName]
  page.sidebarItems = sidebarItems
  page.breadcrumbItems = calcBreadcrumbItems(page, pages)
}

function calcProductData(
  siteData: { [key: string]: SidebarItem[] },
  page: OriginalPage,
  pages: OriginalPage[]
): void {
  if (page.regularPath !== '/') return
  const productData: BreadCrumbItem[] = []
  for (const prodName in siteData) {
    for (const p of pages) {
      if (p.regularPath === `/${prodName}/`) {
        productData.push({
          productRegularName: p.productRegularName,
          regularPath: p.regularPath,
          title: p.frontmatter.heroText,
        })
        break
      }
    }
  }
  page.productData = productData
}

export { calcSiteData, calcPageData, calcProductData }
