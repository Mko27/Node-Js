const multer = require('multer')
const path = require('path')

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../public/images/products'))
  },
  filename: (req, file, cb) => {
    const basePath = Date.now() + path.extname(file.originalname)
    file.basePath = '/images/products/' + basePath
    cb(null, basePath)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1000000 }
})

const multerImageUpload = upload.array('images', 5)

module.exports = {
  multerImageUpload
}
