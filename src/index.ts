import { calcPageData, calcProductData, calcSiteData } from './core'
import { info, success } from './log'
import { OriginalPage } from './types'
import { calcMeta, filterPagesData } from './util'
import chalk = require('chalk')

export = function (_: any, ctx: any): any {
  return {
    name: 'vuepress-plugin-vbox',
    ready() {
      console.log(
        chalk.green(
          `VBox Plugin for VuePress - v${require('../package.json').version}`
        )
      )
      info('Starting Collecting Data...')
      const pages: OriginalPage[] = ctx.pages
      info('Collecting Meta...')
      pages.forEach((p) => calcMeta(p))
      success(`Calcutated meta for ${pages.length} pages.`)
      info('Calculating Site Data...')
      const siteData = calcSiteData(filterPagesData(pages))
      info('Calculating Page Data...')
      pages.forEach((p) => calcPageData(siteData, p, pages))
      success(`Calcutated data for ${pages.length} pages.`)
      pages.forEach((p) => calcProductData(siteData, p, pages))
      success('Complete. Building website now.')
    },
    additionalPages: [
      {
        path: '/login/',
        frontmatter: {
          layout: 'Login',
        },
      },
      {
        path: '/editor/',
        frontmatter: {
          layout: 'Editor',
        },
      },
    ],
  }
}
