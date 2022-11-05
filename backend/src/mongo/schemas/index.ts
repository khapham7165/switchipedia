import mongoose, { Schema } from 'mongoose'

export const manufacturerSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: { createdAt: 'createdAt' } },
)

export const brandSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: { createdAt: 'createdAt' } },
)

export const switchTypeSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: { createdAt: 'createdAt' } },
)

export const thereminGoatScoreSchema = new mongoose.Schema(
  {
    pushFeel: Number,
    wobble: Number,
    sound: Number,
    context: Number,
    other: Number,
    total: Number,
    scoreCardLink: String,
    linkToReview: String,
  },
  { timestamps: { createdAt: 'createdAt' } },
)

export const switchSchema = new mongoose.Schema(
  {
    blueprint: String,
    title: String,
    volume: String,
    factoryLubed: String,
    film: String,
    notes: String,

    mount: String,
    stemConstruction: String,
    stemLength: String,
    specs: {
      name: String,
      description: String,
      weightsSection: Number,
      actuation: Number,
      bottomOut: Number,
      preTravel: Number,
      totalTravel: Number,
      springSection: String,
      spring: String,
      springColor: String,
      springColorInfo: String,
      springSwap: String,
      stemSection: String,
      stemType: String,
      stemColor: String,
      stemMaterial: String,
      stemCustomMaterialNotes: String,
      housingTopSection: String,
      housingTopType: String,
      housingTopColor: String,
      housingTopMaterial: String,
      housingTopCustomMaterialNotes: String,
      housingBottomSection: String,
      housingBottomType: String,
      housingBottomColor: String,
      housingBottomMaterial: String,
      housingBottomCustomMaterialNotes: String,
      forceGraph: {
        type: [String],
        default: undefined,
      },
      ledSupport: String,
    },
    prices: [Object],
    photos: [String],
    videos: [Object],
    thereminGoatScores: Object,

    variant: Object,
    rawText: String,

    manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    switchType: { type: Schema.Types.ObjectId, ref: 'SwitchType' },
  },
  { timestamps: { createdAt: 'createdAt' } },
)
