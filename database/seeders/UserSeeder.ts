import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Steve Rogers',
        email: 'srogers@ufacil.com',
        password: 'steve',
        role: 'admin',
      },
      {
        name: 'Tony Stark',
        email: 'tstark@ufacil.com',
        password: 'tony',
        role: 'user',
      },
    ])
  }
}
