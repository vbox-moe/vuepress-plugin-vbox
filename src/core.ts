import { OriginalPage } from './types'

function calcSiteData(pages: OriginalPage[]) {}

function calcPageData(siteData, page) {
  const sidebarItems = {}
  const breadcrumbItems = {}
  page.sidebarItems = sidebarItems
  page.breadcrumbItems = breadcrumbItems
}

export { calcSiteData, calcPageData }
