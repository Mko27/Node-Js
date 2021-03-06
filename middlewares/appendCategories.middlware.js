const models = require('../models')
const { Category } = models

const buildTree = (categories, id = 0, key = 'parentId') =>
  categories.reduce((acc, category) => {
    if (category[key] === id) {
      category.children = buildTree(categories, category.id)
      acc.push(category)
    }

    return acc
  }, [])

const appendCategories = (req, res, next) => {
  return Category.getCategories()
    .then((categories) => {
      res.locals.__categories = buildTree(categories)
      res.locals.__categoriesList = categories
      console.log('tree', JSON.stringify(res.locals.__categories, null, 2))
      console.log('list', res.locals.__categoriesList)
      return next()
    })
    .catch(next)
}

module.exports = {
  appendCategories
}
