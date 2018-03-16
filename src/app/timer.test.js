const test = require('tape')

test(`True is true`, t => {
  t.true(true)
  t.end()
})

function createTimer ({ hour = 0, minute = 0, second = 0 }) {
  const listObserver = []
  function notifyForAllSubcriber () {
    listObserver.forEach(observer => {
      observer.hasUpdateFrom(timer)
    })
  }
  const timer = {
    tick: function () {
      second = second === 59 ? 0 : second + 1
      minute = second === 0 ? minute + 1 : minute
      minute = minute > 59 ? 0 : minute
      hour = minute === 0 ? hour + 1 : hour
      hour = hour > 23 ? 0 : hour
      notifyForAllSubcriber()
    },
    getHour: function () {
      return hour
    },
    getMinute: function () {
      return minute
    },
    getSecond: function () {
      return second
    },
    attach: function (observer) {
      listObserver.push(observer)
    },
    notifyForAllSubcriber

  }
  return timer
}

function digitalRenderFactory () {
  return {
    render,
    hasUpdateFrom
  }

  function render (timer) {
    return `Hour: ${timer.getHour()} Minute: ${timer.getMinute()} Second: ${timer.getSecond()}`
  }

  function hasUpdateFrom (timer) {
    console.log(render(timer))
  }
}

test(`Timer tick will increment time`, t => {
  const timer = createTimer({hour: 23, minute: 59, second: 59})
  timer.tick()
  t.equal(timer.getHour(), 0)
  t.equal(timer.getMinute(), 0)
  t.equal(timer.getSecond(), 0)
  t.end()
})

test(`Digital render will render time`, t => {
  const timer = createTimer({ hour: 23, minute: 59, second: 59 })
  const digitalRender = digitalRenderFactory()
  t.equal(digitalRender.render(timer), 'Hour: 23 Minute: 59 Second: 59')
  t.end()
})

test(`timer.tick() will notify for subcripber`, t => {
  const timer = createTimer({ hour: 23, minute: 59, second: 58 })
  const subscriber = {
    hasUpdateFrom (subject) {
      t.equal(timer, subject, 'Subject will notify me when has update')
    }
  }
  timer.attach(subscriber) // subscribe
  timer.tick()
  t.end()
})
