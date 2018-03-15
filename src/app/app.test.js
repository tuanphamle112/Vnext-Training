'use strict'

const test = require('tape')

test(`True is true`, t => {
  t.true(true)
  t.end()
})

test(`peopleRepo.find('tien') will return list people's name 'tien' `, async t => {
  const peopleRepo = require('./people-repo')
  const listingPeople = peopleRepo.find('tien')
  t.plan(1)
  listingPeople
    .then(listPeople => t.deepLooseEqual(listPeople, ['tien nam', 'tien minh xxx']))
    .catch(error => t.equal(error.message, 'network error'))
})

test(`Find people by name will show list people's name in bottom of input`, async t => {
  const peopleRepo = require('./people-repo')
  const listingPeople = peopleRepo.find('tien')
  listingPeople.then(listPeople => t.deepLooseEqual)
  t.deepLooseEqual(listingPeople, ['tien nam', 'tien minh xxx'])
  t.end()
})
