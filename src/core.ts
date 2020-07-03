function calcSiteData(pages) {}

function calcPageData(siteData, page) {
  const sidebarItems = {}
  const breadcrumbItems = {}
  page.sidebarItems = sidebarItems
  page.breadcrumbItems = breadcrumbItems
}

export { calcSiteData, calcPageData }
