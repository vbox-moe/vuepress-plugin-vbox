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
  sidebarItems?: SidebarItem[]
  breadcrumbItems?: BreadCrumbItem[]
  productData?: BreadCrumbItem[]
  [key: string]: any
}

declare type BreadCrumbItem = {
  title: string
  regularPath: string
  productRegularName: string
  pageIndex?: number
}

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
