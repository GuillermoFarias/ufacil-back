/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'ufacil api by Guillermo Farías' }
})

Route.group(() => {
  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('logout', 'AuthController.logout')
    Route.get('me', 'AuthController.me').middleware('auth:api')
  }).prefix('auth')

  Route.group(() => {
    Route.resource('users', 'UsersController').apiOnly()
    Route.post('converter', 'ConverterController.convert')
    Route.get('history', 'ConverterController.getHistory')
  }).middleware('auth:api')
}).prefix('api')
