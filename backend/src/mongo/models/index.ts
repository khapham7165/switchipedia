import mongoose from 'mongoose'
import {
  switchSchema,
  manufacturerSchema,
  switchTypeSchema,
  brandSchema,
} from 'src/mongo/schemas'

export const SwitchModel = mongoose.model('Switch', switchSchema)
export const ManufacturerModel = mongoose.model(
  'Manufacturer',
  manufacturerSchema,
)
export const SwitchTypeModel = mongoose.model('SwitchType', switchTypeSchema)
export const BrandModel = mongoose.model('Brand', brandSchema)
