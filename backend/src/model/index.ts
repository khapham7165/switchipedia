import mongoose from 'mongoose'
import { switchSchema } from '../schema'

export const SwitchModel = mongoose.model('Switch', switchSchema)
