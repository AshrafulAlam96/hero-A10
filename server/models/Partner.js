const mongoose = require('mongoose')

const PartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileimage: { type: String, default: '' },
  subject: { type: String, default: '' },
  studyMode: { type: String, default: 'Online' },
  availabilityTime: { type: String, default: '' },
  location: { type: String, default: '' },
  experienceLevel: { type: String, enum: ['Beginner','Intermediate','Expert'], default: 'Beginner' },
  rating: { type: Number, default: 0 },
  partnerCount: { type: Number, default: 0 },
  email: String,
}, { timestamps: true })

module.exports = mongoose.model('Partner', PartnerSchema)
