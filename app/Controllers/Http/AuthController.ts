// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({ auth, request }) {
    const email = request.input('email')
    const password = request.input('password')

    const token = await auth.use('api').attempt(email, password, {
      expiresIn: '10 mins',
    })

    return token.toJSON()
  }

  public async me({ auth }) {
    return auth.use('api').user
  }

  public async logout({ auth }) {
    await auth.use('api').revoke()
    return { revoked: true }
  }
}
