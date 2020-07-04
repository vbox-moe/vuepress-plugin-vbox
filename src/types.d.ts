declare type PageFrontmatter = {
  home?: boolean
  heroText?: string
  description?: string
  pageIndex?: number
  [key: string]: any
}

declare type OriginalPage = {
  title: string
  regularPath: string
  productRegularName?: string
  breadcrumbRegularItems?: string[]
  depth?: number
  isDetailPage?: boolean
  frontmatter: PageFrontmatter
  // [key: string]: any
  sidebarItems?: SidebarItem[]
  breadcrumbItems?: BreadCrumbItem[]
}

declare type BreadCrumbItem = {}

declare type SidebarItem = {
  type: 'group' | 'auto'
  collapsable?: boolean
  title: string
  basePath?: string
  path?: string
  children?: SidebarItem[]
  pageIndex?: number
}

export { OriginalPage, PageFrontmatter, SidebarItem, BreadCrumbItem }
