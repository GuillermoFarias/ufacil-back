import Conversion from 'App/Models/Conversion'
import User from 'App/Models/User'

export default class ConvertService {
  public async convertToUf(user: User, date: string, amount: number, ufValue: number) {
    const convertedAmount = Number((amount * ufValue).toFixed(4))
    const dateObject = new Date(date)
    const conversion = new Conversion()

    conversion.merge({
      userId: user.id,
      date: dateObject,
      amount,
      ufValue,
      convertedAmount,
    })

    return await conversion.save()
  }

  public async getHistory() {
    return await Conversion.query().preload('user')
  }
}
