const models = require('../../models')
const { Region } = models

const getAllRegions = (req, res, next) => {
  return Region.getRegions()
    .then(regions => {
      console.log(regions)
      return res.render('regions', { regions: regions.rows })
    })
    .catch(next)
}

const regionCreate = (req, res, next) => {
  console.log(req.body)
  const data = req.body
  console.log('data: ', data)
  return Region.createRegion(data)
    .then(() => res.redirect('/reg'))
    .catch(next)
}

const getRegionById = (req, res, next) => {
  const data = req.params
  return Region.findById(data.id)
    .then(region => res.render('region', { elem: region.name }))
    .catch(next)
}

const deleteRegionById = (req, res, next) => {
  const data = req.params
  console.log('================= ', data)
  return Region.deleteRegionById(data.id)
    .then(() => res.json({ msg: 'Successfully deleted' }))
    .catch(next)
}

const updateRegionById = (req, res, next) => {
  const data = req.params
  console.log('req.params ======', data)
  const elem = req.body
  console.log('elem ===== ', elem)
  return Region.updateRegionById(data.id, elem)
    .then(() => res.json({ msg: 'Successfully updated' }))
    .catch(next)
}

module.exports = {
  getAllRegions,
  regionCreate,
  getRegionById,
  deleteRegionById,
  updateRegionById
}
