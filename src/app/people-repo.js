'use strict'

const debugFactory = require('debug')
const debug = debugFactory('people:repo')

const wait = second => new Promise((resolve) => {
  const miliSecond = second * 1000
  setTimeout(() => {
    resolve(true)
  }, miliSecond)
})

const random = (min, max) => Math.floor((Math.random() * max) + min)
const peopleRepo = {
  async find (keyword) {
    const dataStore = ['tien nam', 'tien minh xxx', 'abc']
    const second = random(0, 3)
    debug(second)
    await wait(second)

    return dataStore.filter(byName)

    function byName (name) {
      return (new RegExp(keyword, 'gi')).test(name)
    }
  }
}

module.exports = peopleRepo
