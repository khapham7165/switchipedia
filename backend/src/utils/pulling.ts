import { Octokit } from '@octokit/rest'
import { convertSwitchMdToJson } from './misc'
import { Logger } from '@nestjs/common'
import {
  BrandModel,
  ManufacturerModel,
  SwitchModel,
  SwitchTypeModel,
} from '../mongo/models'
import { Model } from 'mongoose'
import { isEmpty } from 'lodash'

// Initialize GitHub API client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const REPO_OWNER = 'BWLR'
const REPO_NAME = 'switches.mx'
const SWITCHES_PATH = 'content/collections/switches'

interface CommitInfo {
  lastSha: string
  lastPullTime: number
}

// Store last commit info in DB or file
let lastCommitInfo: CommitInfo = {
  lastSha: '',
  lastPullTime: 0,
}

async function getLatestCommitSha(): Promise<string> {
  const { data } = await octokit.repos.getBranch({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    branch: 'main',
  })

  return data.commit.sha
}

async function fetchSwitchContent(path: string) {
  const { data } = await octokit.repos.getContent({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    path: `${SWITCHES_PATH}/${path}`,
  })
  return Buffer.from((data as any).content, 'base64').toString()
}

const checkExisted = async (model: Model<any>, item: Record<string, any>) => {
  let existedManufacture = await model.findOne(item)

  if (!existedManufacture) {
    existedManufacture = new model(item)
    await existedManufacture.save()
    Logger.log(`New ${model.modelName}: ` + JSON.stringify(item))
  }

  return existedManufacture
}

const processSwitch = async (fileName: string, content: string) => {
  const variant = convertSwitchMdToJson(content)
  if (!variant) return

  const { manufacturer, brand, specs, switchType, title } = variant

  const [checkedManufacturer, checkedBrand, checkedSwitchType] =
    await Promise.all([
      checkExisted(ManufacturerModel, { name: manufacturer }),
      checkExisted(BrandModel, { name: brand }),
      checkExisted(SwitchTypeModel, { name: switchType }),
    ])

  const switchSet = {
    ...variant,
    manufacturer: checkedManufacturer,
    brand: checkedBrand,
    switchType: checkedSwitchType,
    specs: specs?.map((spec) => ({
      ...spec,
      forceGraph: isEmpty(spec.forceGraph) ? undefined : spec.forceGraph,
    })),
    thereminGoatScores:
      variant.thereminGoatScores?.[0] || variant.thereminGoatScores,
    rawText: content,
    variant,
  }

  await SwitchModel.findOneAndUpdate(
    { title },
    { $set: switchSet },
    { upsert: true, new: true },
  )

  Logger.log(`Processed switch: ${title}`)
}

export const pullSwitch = async (timer?: number) => {
  const pullChanges = async () => {
    try {
      const latestSha = await getLatestCommitSha()

      if (latestSha === lastCommitInfo.lastSha) {
        Logger.log('No new changes detected')
        return
      }

      const { data: files } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: SWITCHES_PATH,
      })

      await Promise.all(
        (files as any[]).map(async (file) => {
          const content = await fetchSwitchContent(file.name)
          await processSwitch(file.name, content)
        }),
      )

      lastCommitInfo = {
        lastSha: latestSha,
        lastPullTime: Date.now(),
      }

      Logger.log('Successfully pulled and processed all switches')
    } catch (error) {
      Logger.error('Error pulling switches:', error)
    }
  }

  // Initial pull
  await pullChanges()

  // Set up interval if timer provided
  if (timer) {
    setInterval(pullChanges, timer)
  }
}
