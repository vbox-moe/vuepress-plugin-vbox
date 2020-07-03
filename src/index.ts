import { calcPageData, calcSiteData } from './core'
import { calcMeta } from './util'

export default (_, ctx) => {
  return {
    name: 'vuepress-plugin-vbox',
    ready() {
      const { pages } = ctx
      pages.forEach((p) => calcMeta(p))
      const siteData = calcSiteData(pages)
      pages.forEach((p) => calcPageData(siteData, p))
    },
  }
}
