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
// const viewPath = path.resolve('./views')

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
      // ctx.router available
    const peoples = await gettingPeoplesFn()
    await ctx.render('basic', {
      peoples
    })
  }
}

const gettingPeoples = () => knex.select('*').from('users')

router.get('/users', factoryGetUserMiddleware(gettingPeoples))
// router.get('/users/:username', async (ctx, next) => {
//   // ctx.router available
//   console.log(ctx.query)
//   const {id, username} = ctx.params
//   ctx.body = `hello world ${id}, ${username}`

//   await ctx.render('basic', {
//     user: 'Coder'
//   })
// })
// router.post('/signin', (ctx, next) => {
//   // ctx.router available
//   const {x, y } = ctx.request.body
//   console.log(x)
//   ctx.body = 'done'
//   // const {id, username} = ctx.params
//   // ctx.body = `hello world ${id}, ${username}`
// })

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
