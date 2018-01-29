const fs = require('fs')

const readFile = fileName => new Promise((resolve, reject) => {
  fs.readFile(fileName, function (err, data) {
    if (err) return reject(err)
    return resolve(data.toString())
  })
})

const readFileFromIndex = (fileName, index) => readFile(fileName)
  .then(content => content.split('\n'))
  .then(lines => lines[index])

// readFileFromIndex('firstNumber.txt', 1).then(console.log)

// readFile('firstNumber.txt').then(console.log)

const sum = (a, b) => +a + (+b)

async function pSum (isFirstLineOfA, isFirstLineOfB) {
  const a = isFirstLineOfA ? await readFileFromIndex('firstNumber.txt', 0) : await readFileFromIndex('firstNumber.txt', 1)
  const b = isFirstLineOfB ? await readFileFromIndex('secondNumber.txt', 0) : await readFileFromIndex('secondNumber.txt', 1)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('Must be a number')
  }
  return sum(a, b)
}
pSum(true, true).then(console.log)
          .catch(console.log)
