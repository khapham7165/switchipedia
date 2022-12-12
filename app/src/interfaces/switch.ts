export type SwitchData = {
  _id: string
  blueprint: string
  title: string
  volume: string
  factoryLubed: string
  film: string
  notes: string

  mount: string
  stemConstruction: string
  stemLength: string
  specs: {
    name: string
    description: string
    weightsSection: number
    actuation: number
    bottomOut: number
    preTravel: number
    totalTravel: number
    springSection: string
    spring: string
    springColor: string
    springColorInfo: string
    springSwap: string
    stemSection: string
    stemType: string
    stemColor: string
    stemMaterial: string
    stemCustomMaterialNotes: string
    housingTopSection: string
    housingTopType: string
    housingTopColor: string
    housingTopMaterial: string
    housingTopCustomMaterialNotes: string
    housingBottomSection: string
    housingBottomType: string
    housingBottomColor: string
    housingBottomMaterial: string
    housingBottomCustomMaterialNotes: string
    forceGraph: {
      type: [string]
      default: undefined
    }
    ledSupport: string
  }
  prices: Record<string, any>
  photos: string[]
  videos: Record<string, any>
  thereminGoatScores: Record<string, any>

  manufacturer: {
    name: string
  }
  brand: {
    name: string
  }
  switchType: {
    name: SwitchType
  }
}

export enum SwitchType {
  Linear = 'linear',
  Tactile = 'tactile',
}
