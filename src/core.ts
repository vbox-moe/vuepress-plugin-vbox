import { OriginalPage } from './types'

function calcSiteData(pages: OriginalPage[]) {
  const regularProduct: { [key: string]: OriginalPage[] } = {}
  for (const page of pages) {
    if (!regularProduct[page.title]) regularProduct[page.title] = []
    regularProduct[page.title].push(page)
  }
  console.info(regularProduct)
}

function calcPageData(siteData, page) {
  const sidebarItems = {}
  const breadcrumbItems = {}
  page.sidebarItems = sidebarItems
  page.breadcrumbItems = breadcrumbItems
}

export { calcSiteData, calcPageData }
