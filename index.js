function calcDepth(str) {
  let d = 0
  for (let i = 0; i < str.length; i++) if (str[i] === '/') d++
  return d
}

module.exports = {
  name: 'vuepress-plugin-vbox',
  extendPageData($page) {
    const { regularPath } = $page
    if (regularPath === '/') return
    $page.depth = calcDepth(regularPath)
    $page.productRegularName = regularPath.split('/')[1]
  },
}
