const { calcMeta } = require('./util')
const { calcSiteData, calcPageData } = require('./core')

module.exports = (_, ctx) => {
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
