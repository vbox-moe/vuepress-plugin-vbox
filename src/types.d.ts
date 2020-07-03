declare type PageFrontmatter = {
  home?: boolean
  heroText?: string
  description?: string
  pageIndex?: number
}

declare type OriginalPage = {
  title: string
  regularPath: string
  productRegularName: string
  breadcrumbRegularItems: string[]
  depth: number
  frontmatter: PageFrontmatter
}

declare type CalculatedProduct = {}

declare type CalculatedPage = {}

declare type SidebarItem = {
  type: 'group' | 'auto'
  collapsable?: boolean
  title: string
  basePath?: string
  path?: string
  children: SidebarItem[]
}

export {
  OriginalPage,
  CalculatedProduct,
  CalculatedPage,
  PageFrontmatter,
  SidebarItem,
}
