import mongoose from 'mongoose'

export const switchSchema = new mongoose.Schema({
  _id: String,
  variant: Object,
  rawText: String,
})
