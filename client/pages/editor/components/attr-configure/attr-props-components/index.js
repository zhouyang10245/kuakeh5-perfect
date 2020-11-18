const requireComponent = require.context(
    './props-attr', // 当前基础组件相对与main.js的相对位置
    false, // 是否查询子目录
    /[a-z]\w+\.(vue|js)$/
  )
  
  let comments = {}
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)

    comments[componentConfig.default.name] = componentConfig.default
  })
  
  export default comments
  