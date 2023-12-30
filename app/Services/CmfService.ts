import Env from '@ioc:Adonis/Core/Env'
import fetch from 'node-fetch'
import { DateTime } from 'luxon'
import { CmfResponse } from 'Contracts/cmf'

export default class CmfService {
  private apiUrl: string
  private apiKey: string

  constructor() {
    this.apiUrl = Env.get('CMF_API_URL', 'https://api.cmfchile.cl')
    this.apiKey = Env.get('CMF_API_KEY', '')
  }

  private getApiUrl(dateTime: DateTime, currency: string) {
    const date = dateTime.toJSDate()
    let url = `${this.apiUrl}/api-sbifv3/recursos_api/${currency}/`
    url += `${date.getFullYear()}/${date.getMonth() + 1}/dias/${date.getDate()}`
    url += `?apikey=${this.apiKey}`
    url += `&formato=json`

    return url
  }

  public async getUfFromDate(date: DateTime) {
    const url = this.getApiUrl(date, 'uf')
    return await this.fetchData(url)
  }

  private async fetchData(url: string): Promise<CmfResponse> {
    const response = await fetch(url)
    const prepareResponse: CmfResponse = { ufs: [] }

    if (!response.ok) throw new Error('Error fetching data')

    const responseData: any = await response.json()

    // if has UFs property, then it's a CmfResponse
    if (typeof responseData?.UFs !== 'object') {
      throw new Error('Error fetching data, no UFs property')
    }

    const ufs: any = responseData.UFs

    for (const uf of ufs) {
      prepareResponse.ufs.push({
        date: uf.Fecha,
        value: Number(uf.Valor.replace('.', '').replace(',', '.')),
      })
    }

    return prepareResponse
  }
}
