const express = require('express')
const router = express.Router()
const Partner = require('../models/Partner')
app.use('/api/partners', require('./routes/partnerRoutes'))

// GET all partners
router.get('/', async (req, res) => {
  try {
    const { search, sortBy } = req.query
    let filter = {}
    if (search) filter.subject = { $regex: search, $options: 'i' }
    let query = Partner.find(filter)
    query = sortBy === 'experience'
      ? query.sort({ experienceLevel: 1 })
      : query.sort({ rating: -1 })
    const partners = await query.exec()
    res.json(partners)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET by id
router.get('/:id', async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id)
    if (!partner) return res.status(404).json({ message: 'Partner not found' })
    res.json(partner)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST new partner
router.post('/', async (req, res) => {
  try {
    const partner = new Partner(req.body)
    await partner.save()
    res.status(201).json(partner)
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message })
  }
})

module.exports = router
