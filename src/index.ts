import { calcPageData, calcSiteData } from './core'
import { OriginalPage } from './types'
import { calcMeta, filterPagesData } from './util'

export = function (_: any, ctx) {
  return {
    name: 'vuepress-plugin-vbox',
    ready() {
      const pages: OriginalPage[] = ctx.pages
      pages.forEach((p) => calcMeta(p))
      const siteData = calcSiteData(filterPagesData(pages))
      pages.forEach((p) => calcPageData(siteData, p))
    },
  }
}
