const models = require('../../models')
const { Product, City, Image, Tag } = models
const { imageDelete } = require('../../utils/imageDelete.util')
const Promise = require('bluebird')

const getAllProducts = (req, res, next) => {
  return Product.getProducts()
    .then((announcements) => {
      return res.render('announcements', { announcements: announcements.rows })
    })
    .catch(next)
}

const getProductById = (req, res, next) => {
  const id = parseInt(req.params.productId, 10)
  return Product.findById(id)
    .then((product) => res.json({ product }))
    .catch(next)
}

const appendCities = (req, res, next) => City.getCities()
  .then((cities) => {
    res.locals.__cities = cities
    next()
  })
  .catch(next)

const createAnnouncementForm = (req, res, next) => res.render('createAnnouncement')

const appendTagForm = (req, res, next) => {
  const productId = parseInt(req.params.id, 10)
  return Tag.getAllTags()
    .then((tags) => res.render('appendTag', { tags, productId }))
    .catch(next)
}

// const searchTags = (req, res, next) => {
//   const title = req.query.title
//   return Tag.searchByTitle(title)
//     .then((tags) => {
//       console.log('tags ', tags)
//       return console.log(res.json({ tags: tags }))
//     })
//     .catch(next)
// }

const createAnnouncement = (req, res, next) => {
  const data = req.body
  data.status = 'Unpublished'
  data.userId = req.user.id
  return Product.createProduct(data)
    .then(() => res.redirect('/my-announcements/add'))
    .catch(next)
}

const userAnnouncements = (req, res, next) => {
  const userId = parseInt(req.user.id, 10)
  return Product.findByUserId(userId)
    .then((announcements) => res.render('userAnnouncements', { announcements: announcements.rows }))
    .catch(next)
}

const userProductImages = (req, res, next) => {
  const productId = parseInt(req.params.id, 10)
  return Image.findByProductId(productId)
    .then((images) => res.render('productImages', { images, productId }))
    .catch(next)
}

const deleteProductById = (req, res, next) => {
  const data = parseInt(req.params.id, 10)
  return Product.deleteProduct(data)
    .then(() => res.json({ msg: 'Successfully deleted' }))
    .catch(next)
}

const updateProductById = (req, res, next) => {
  const elem = parseInt(req.params.id, 10)
  const data = req.body
  if (data.status === 'Published') {
    data.publishedAt = new Date()
  }
  return Product.updateProduct(data, elem)
    .then(() => res.json({ msg: 'Successfully updated' }))
    .catch(next)
}

const createImages = (req, res, next) => {
  const data = req.files
  const userId = parseInt(req.user.id, 10)
  const productId = parseInt(req.params.id, 10)

  return Promise.map(data, (image, index) => {
    image.userId = userId
    image.productId = productId
    image.order = index + 1
    image.thumb = false
    if (image.order === 1) {
      image.thumb = true
    }
    image.path = image.basePath
    const createData = image
    return Image.createImage(createData)
  }).then((result) => console.log(result))
    .then(() => res.json({ msg: 'Successfully uploaded' }))
    .catch(next)
}

const deleteImageById = (req, res, next) => {
  const id = parseInt(req.params.imageId, 10)
  return imageDelete(id)
    .then(() => Image.deleteImageById(id))
    .then(() => res.json({ msg: 'deleted' }))
    .catch(next)
}

module.exports = {
  getAllProducts,
  appendCities,
  createAnnouncementForm,
  createAnnouncement,
  deleteProductById,
  userAnnouncements,
  updateProductById,
  userProductImages,
  createImages,
  deleteImageById,
  appendTagForm,
  getProductById
}
