// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CmfService from 'App/Services/CmfService'
import ConvertService from 'App/Services/ConvertService'
import { CmfResponse } from 'Contracts/cmf'

export default class ConverterController {
  private cmfService: CmfService
  private convertService: ConvertService

  constructor() {
    this.cmfService = new CmfService()
    this.convertService = new ConvertService()
  }

  public async convert({ request, auth }) {
    const convertSchema = schema.create({
      date: schema.date(),
      amount: schema.number([rules.unsigned()]),
    })

    const convertData = await request.validate({ schema: convertSchema })

    const data: CmfResponse = await this.cmfService.getUfFromDate(convertData.date)

    if (!data.ufs.length) throw new Error('No data found from CMF')

    const ufData = data.ufs[0]
    const user = auth.use('api').user

    const conversion = await this.convertService.convertToUf(
      user,
      convertData.date,
      convertData.amount,
      ufData.value
    )

    return { conversion }
  }

  public async getHistory() {
    const conversions = await this.convertService.getHistory()
    return { conversions }
  }
}
