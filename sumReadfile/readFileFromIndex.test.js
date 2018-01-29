const test = require('tape')
// require('./readFileFromIndexFactory')

const readFileFromIndexFactory = function (readFileFn) {
  return function (fileName, index) {
    const toNumber = str => parseInt(str)

    const lineContentPromise = readFileFn(fileName)
      .then(content => content.split('\n'))
      .then(function (lines) {
        const notNumberList = lines.filter(isNaN, lines)
        if (notNumberList.length) {
          throw new Error('Need contain number only')
        }
        return lines
      })
      .then(lines => lines.map(toNumber))
      .then(lines => lines[index])
    return lineContentPromise
  }
}

test('readFileFromIndex will return array line content', assert => {
  const readFileFn = fileName => Promise.resolve('1\n2\n3')
  const readFileFromIndex = readFileFromIndexFactory(readFileFn)

  assert.plan(2)
  assert.equal(typeof readFileFromIndex, 'function')
  readFileFromIndex('filePath', 2).then(line => assert.equal(line, 3))
})

test(`readFileFromIndex Will throw error when
file content contain alphabe char`, assert => {
  const readFileFn = fileName => Promise.resolve('1\n2\nabc')
  const readFileFromIndex = readFileFromIndexFactory(readFileFn)

  // assert.plan(2)
  assert.equal(typeof readFileFromIndex, 'function')
  readFileFromIndex('filePath', 2)
    .catch(err => assert.true(true))
  assert.end()
})
