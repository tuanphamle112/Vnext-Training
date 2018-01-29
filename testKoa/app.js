const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const render = require('koa-ejs')
const knexFactory = require('knex')
const config = require('./knexfile')
const knex = knexFactory(config['development'])

const app = new Koa()
const router = new Router()

app.use(koaBody())
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: true
})

const factoryGetUserMiddleware = function (gettingPeoplesFn) {
  return listUserMiddleware

  async function listUserMiddleware (ctx, next) {
    const peoples = await gettingPeoplesFn()
    await ctx.render('basic', {
      peoples
    })
  }
}

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello world'
})

const gettingPeoples = () => knex.select('*').from('users')

router.get('/users', factoryGetUserMiddleware(gettingPeoples))

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app
