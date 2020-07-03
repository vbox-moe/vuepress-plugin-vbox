import { calcPageData, calcSiteData } from './core'
import { OriginalPage } from './types'
import { calcMeta } from './util'

export = function (_: any, ctx) {
  return {
    name: 'vuepress-plugin-vbox',
    ready() {
      const pages: OriginalPage[] = ctx.pages
      pages.forEach((p) => calcMeta(p))
      const siteData = calcSiteData(pages)
      pages.forEach((p) => calcPageData(siteData, p))
    },
  }
}
