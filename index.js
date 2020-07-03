function calcDepth(str) {
  let d = 0
  for (let i = 0; i < str.length; i++) if (str[i] === '/') d++
  return d
}

function calcMeta(p) {
  const { regularPath } = p
  if (regularPath === '/') return
  p.depth = calcDepth(regularPath)
  p.productRegularName = regularPath.split('/')[1]
}

module.exports = (_, ctx) => {
  return {
    name: 'vuepress-plugin-vbox',
    ready() {
      const { pages } = ctx
      pages.forEach((p) => calcMeta(p))
    },
  }
}
