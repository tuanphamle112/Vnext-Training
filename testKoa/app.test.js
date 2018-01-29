const test = require('tape')
const supertest = require('supertest')

const app = require('./app')

let server
let request
test('Start server', t => {
  server = app.listen()
  request = supertest(server)
  t.end()
})

test('App test homepage', t => {
  request
  .get('/')
  .expect(200)
  .end((err, res) => {
    if (err) throw err

    t.equals(res.text, 'Hello world')
    t.end()
  })
})

test('Shutdown server', t => {
  server.close()
  t.end()
  process.exit()
})
